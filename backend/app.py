from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import joblib
import os
import traceback

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure SQLite DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///matrisense.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Load XGBoost model
try:
    model = joblib.load("xgboost_model.pkl")
    print("✅ Model loaded.")
except Exception as e:
    print("❌ Model load failed:", e)
    model = None

# Load label encoder
try:
    label_encoder = joblib.load("label_encoder.pkl")
    print("✅ Label encoder loaded.")
except Exception as e:
    print("❌ Label encoder load failed:", e)
    label_encoder = None

# Database model
class HealthRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    age = db.Column(db.Float)
    systolic_bp = db.Column(db.Float)
    diastolic_bp = db.Column(db.Float)
    bs = db.Column(db.Float)
    body_temp = db.Column(db.Float)
    heart_rate = db.Column(db.Float)
    risk = db.Column(db.String(20))

    def to_dict(self):
        return {
            "name": self.name,
            "age": self.age,
            "systolic_bp": self.systolic_bp,
            "diastolic_bp": self.diastolic_bp,
            "bs": self.bs,
            "body_temp": self.body_temp,
            "heart_rate": self.heart_rate,
            "risk": self.risk
        }

# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if not model or not label_encoder:
        return jsonify({"error": "Model or encoder not available"}), 500

    try:
        data = request.get_json()
        print("📥 Received:", data)

        # Validate input
        fields = ["age", "systolic_bp", "diastolic_bp", "bs", "body_temp", "heart_rate"]
        if any(f not in data for f in fields):
            return jsonify({"error": "Missing input fields"}), 400

        features = [float(data[f]) for f in fields]

        # Make prediction
        pred_encoded = model.predict([features])[0]
        risk = label_encoder.inverse_transform([pred_encoded])[0]
        print("✅ Risk predicted:", risk)

        # Store in database
        record = HealthRecord(
            name=data.get("name", "Anonymous"),
            age=features[0],
            systolic_bp=features[1],
            diastolic_bp=features[2],
            bs=features[3],
            body_temp=features[4],
            heart_rate=features[5],
            risk=risk
        )
        db.session.add(record)
        db.session.commit()

        return jsonify({"prediction": risk})

    except Exception as e:
        print("❌ Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

# Fetch latest prediction
@app.route("/latest", methods=["GET"])
def latest():
    try:
        record = HealthRecord.query.order_by(HealthRecord.id.desc()).first()
        if record:
            return jsonify(record.to_dict())
        return jsonify({"error": "No records found"}), 404
    except Exception as e:
        print("❌ Error fetching latest:", e)
        traceback.print_exc()
        return jsonify({"error": "Database fetch failed", "details": str(e)}), 500

# Run the app
if __name__ == "__main__":
    if not os.path.exists("matrisense.db"):
        with app.app_context():
            db.create_all()
            print("📁 Database created.")
    app.run(debug=True)
