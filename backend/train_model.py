import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import joblib

# Load dataset
df = pd.read_csv("Maternal_Health_Risk_Data_Set.csv")
X = df.drop("RiskLevel", axis=1)
y = df["RiskLevel"]

# Encode target labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Train
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss')
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, "xgboost_model.pkl")
joblib.dump(le, "label_encoder.pkl")
