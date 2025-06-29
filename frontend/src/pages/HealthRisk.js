import React, { useState } from "react";
import DownloadReport from "../components/DownloadReport";

const HealthRiskForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    systolic_bp: "",
    diastolic_bp: "",
    bs: "",
    body_temp: "",
    heart_rate: "",
  });

  const [healthData, setHealthData] = useState(null);
  const [riskMessage, setRiskMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showTips, setShowTips] = useState(false);

  const calculateRisk = (data) => {
    const sys = Number(data.systolic_bp);
    const dia = Number(data.diastolic_bp);
    const bs = Number(data.bs);
    const temp = Number(data.body_temp);
    const hr = Number(data.heart_rate);

    let riskScore = 0;

    if (sys < 90 || dia < 60) riskScore += 1;
    else if (sys >= 140 || dia >= 90) riskScore += 3;

    if (bs < 70) riskScore += 1;
    else if (bs > 140) riskScore += 2;

    if (temp > 100.4) riskScore += 2;

    if (hr < 60 || hr > 100) riskScore += 1;

    if (riskScore >= 5) return "high";
    if (riskScore >= 3) return "medium";
    return "low";
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage("");
    setRiskMessage("");
  };

  const handleAssessRisk = () => {
    const {
      name,
      age,
      systolic_bp,
      diastolic_bp,
      bs,
      body_temp,
      heart_rate,
    } = formData;

    if (
      !name.trim() ||
      !age ||
      !systolic_bp ||
      !diastolic_bp ||
      !bs ||
      !body_temp ||
      !heart_rate
    ) {
      setErrorMessage("⚠️ Please fill in all fields before assessing your risk.");
      return;
    }

    if (age <= 0 || systolic_bp <= 0 || diastolic_bp <= 0 || bs <= 0 || body_temp <= 0 || heart_rate <= 0) {
      setErrorMessage("⚠️ All numeric values must be positive numbers.");
      return;
    }

    const risk = calculateRisk(formData);
    const riskMessages = {
      low: "✅ Low Risk - Maintain your healthy routine!",
      medium: "⚠️ Medium Risk - Please consult your doctor soon.",
      high: "🚨 High Risk - Seek medical attention immediately!"
    };

    const newRecord = {
      ...formData,
      risk,
      timestamp: Date.now(),
    };

    setHealthData(newRecord);
    setRiskMessage(riskMessages[risk]);
    setErrorMessage("");
  };

  const healthTips = [
    "💧 Stay hydrated - Drink at least 8 glasses of water daily",
    "🍎 Eat balanced meals with fruits, vegetables, and whole grains",
    "🚶‍♀️ Engage in moderate exercise for 30 minutes daily",
    "😴 Get 7-9 hours of quality sleep each night",
    "🧘‍♀️ Practice stress-reduction techniques like deep breathing",
    "🚭 Avoid smoking and limit caffeine intake",
    "🩺 Attend all prenatal checkups as scheduled"
  ];

  const emergencyContacts = [
    { name: "National Maternal Helpline", number: "1-800-XXX-XXXX" },
    { name: "Local Emergency", number: "911" },
    { name: "Your OB/GYN", number: "(XXX) XXX-XXXX" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl shadow-pink-300/50">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 mb-3">
          Maternal Health Risk Assessment
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Monitor your pregnancy health with our comprehensive risk assessment tool.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAssessRisk();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-800">
                  Full Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="e.g., Vandana"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="age" className="block mb-2 font-semibold text-gray-800">
                  Age (years)
                </label>
                <input
                  name="age"
                  id="age"
                  type="number"
                  min="18"
                  max="50"
                  placeholder="30"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="systolic_bp" className="block mb-2 font-semibold text-gray-800">
                  Systolic BP (mmHg)
                </label>
                <input
                  name="systolic_bp"
                  id="systolic_bp"
                  type="number"
                  min="50"
                  max="200"
                  placeholder="e.g., 110"
                  value={formData.systolic_bp}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="diastolic_bp" className="block mb-2 font-semibold text-gray-800">
                  Diastolic BP (mmHg)
                </label>
                <input
                  name="diastolic_bp"
                  id="diastolic_bp"
                  type="number"
                  min="30"
                  max="150"
                  placeholder="e.g., 70"
                  value={formData.diastolic_bp}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="bs" className="block mb-2 font-semibold text-gray-800">
                  Blood Sugar (mg/dL)
                </label>
                <input
                  name="bs"
                  id="bs"
                  type="number"
                  min="50"
                  max="300"
                  placeholder="e.g., 90"
                  value={formData.bs}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label htmlFor="body_temp" className="block mb-2 font-semibold text-gray-800">
                  Body Temp (°F)
                </label>
                <input
                  name="body_temp"
                  id="body_temp"
                  type="number"
                  min="90"
                  max="110"
                  step="0.1"
                  placeholder="e.g., 98.6"
                  value={formData.body_temp}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
                />
              </div>
            </div>

            <div>
              <label htmlFor="heart_rate" className="block mb-2 font-semibold text-gray-800">
                Heart Rate (bpm)
              </label>
              <input
                name="heart_rate"
                id="heart_rate"
                type="number"
                min="40"
                max="150"
                placeholder="e.g., 80"
                value={formData.heart_rate}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-700 to-pink-600 text-white py-4 rounded-2xl text-xl font-bold hover:from-purple-800 hover:to-pink-700 shadow-lg shadow-pink-300/50 transition duration-300"
            >
              Assess My Risk
            </button>
          </form>

          {errorMessage && (
            <div className="mt-8 p-4 bg-red-100 border-l-4 border-red-600 text-red-800 rounded-md shadow-sm">
              <p>{errorMessage}</p>
            </div>
          )}

          {riskMessage && (
            <div
              className={`mt-8 p-5 rounded-lg font-semibold ${
                riskMessage.includes("High Risk")
                  ? "bg-red-100 border-l-4 border-red-600 text-red-900 shadow-md"
                  : riskMessage.includes("Medium Risk")
                  ? "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 shadow-md"
                  : "bg-green-100 border-l-4 border-green-600 text-green-900 shadow-md"
              }`}
            >
              <p>{riskMessage}</p>
            </div>
          )}

          {healthData && (
            <div className="mt-8 border-t pt-6">
              <DownloadReport record={healthData} />
            </div>
          )}
        </div>

        {/* Sidebar with Tips and Emergency Contacts */}
        <div className="space-y-8">
          {/* Health Tips */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-purple-700">Health Tips</h2>
              <button
                onClick={() => setShowTips(!showTips)}
                className="text-purple-600 hover:text-purple-900 font-semibold transition"
                aria-label="Toggle health tips"
              >
                {showTips ? "Hide" : "Show"}
              </button>
            </div>

            {showTips && (
              <ul className="space-y-3 text-gray-700 text-base list-disc list-inside">
                {healthTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 p-6 rounded-2xl shadow-md border border-red-200">
            <h2 className="text-2xl font-semibold text-red-700 mb-5">Emergency Contacts</h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-red-100 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
                >
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <a
                    href={`tel:${contact.number.replace(/\D/g, "")}`}
                    className="text-red-600 hover:text-red-900 font-semibold mt-2 sm:mt-0 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRiskForm;
