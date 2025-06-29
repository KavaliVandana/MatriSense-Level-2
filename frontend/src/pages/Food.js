import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUtensils, FaRunning, FaHome } from "react-icons/fa";

const Food = () => {
  const navigate = useNavigate();
  
  // Risk level suggestions data
  const suggestions = {
    low: {
      title: "Low Risk Nutrition Guide",
      description: "Optimal nutrition for healthy pregnancy maintenance",
      tips: [
        "Continue your usual balanced diet with enhanced nutrients",
        "Include fresh fruits (3-4 servings), green vegetables (2-3 cups), and whole grains daily",
        "Stay hydrated (8-10 glasses) and take prenatal vitamins as prescribed",
        "Eat small frequent meals (5-6/day) to avoid heartburn and nausea",
        "Include lean proteins (eggs, chicken, tofu, legumes - 75-100g per meal)",
        "Avoid undercooked meats, unpasteurized dairy and raw sprouts",
        "Ensure calcium intake (1000mg/day) via dairy or fortified products",
        "Include omega-3 rich foods (walnuts, chia seeds, salmon)"
      ],
      icon: "🥗"
    },
    mid: {
      title: "Moderate Risk Nutrition Plan",
      description: "Targeted diet for managing pregnancy concerns",
      tips: [
        "Increase protein intake (80-110g/day) and calcium (1200mg/day)",
        "Eliminate caffeine and limit sugary drinks (<25g added sugar/day)",
        "Include iron-rich foods (spinach, lentils, dates) with vitamin C for absorption",
        "Avoid processed snacks and refined carbohydrates",
        "Hydrate well (2–3 liters daily) with electrolytes if needed",
        "Include healthy fats (nuts, seeds, avocados, olive oil)",
        "Monitor sodium intake (<2300mg/day) to manage blood pressure",
        "Consider smaller, more frequent meals to stabilize blood sugar"
      ],
      icon: "🥑"
    },
    high: {
      title: "High Risk Dietary Protocol",
      description: "Medically supervised nutrition plan",
      tips: [
        "Follow physician-approved diet plan strictly",
        "Avoid raw foods, spicy items, and processed/junk food completely",
        "Nutrient-dense but easily digestible meals (6-8 small portions)",
        "Take doctor-prescribed supplements on schedule",
        "Use pregnancy diet tracker app for monitoring",
        "Eliminate high-mercury fish and unpasteurized products",
        "Discuss food allergies and intolerances with your doctor",
        "Maintain detailed food and symptom journal"
      ],
      icon: "🏥"
    }
  };

  // Component state
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  // Handlers
  const handleRiskSelection = (level) => {
    setSelectedRisk(level);
    setExpandedTip(null);
  };

  const toggleTipExpansion = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Same as in Home.js */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <span className="text-purple-700 font-bold text-xl">MatriSense+</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate("/home")}
                className="flex items-center text-gray-700 hover:text-pink-600"
              >
                <FaHome className="mr-2" /> Home
              </button>
              <button 
                onClick={() => navigate("/healthrisk")}
                className="flex items-center text-gray-700 hover:text-pink-600"
              >
                <FaHeartbeat className="mr-2" /> Health Risk
              </button>
              <button 
                className="flex items-center text-purple-700 font-semibold"
              >
                <FaUtensils className="mr-2" /> Food Guide
              </button>
              <button 
                onClick={() => navigate("/exercise")}
                className="flex items-center text-gray-700 hover:text-pink-600"
              >
                <FaRunning className="mr-2" /> Exercise
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Food Content */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <h1 className="text-3xl font-bold mb-2">Pregnancy Nutrition Guide</h1>
            <p className="text-purple-100">
              Personalized dietary recommendations based on your health risk assessment
            </p>
          </div>

          {/* Risk Selection Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select your pregnancy risk level:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(suggestions).map(([level, data]) => (
                <button
                  key={level}
                  onClick={() => handleRiskSelection(level)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center
                    ${selectedRisk === level
                      ? "border-purple-600 bg-purple-50 shadow-md"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"}`}
                >
                  <span className="text-2xl mb-2">{data.icon}</span>
                  <span className="font-medium capitalize">{level} Risk</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          {selectedRisk && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                  {suggestions[selectedRisk].icon}
                  {suggestions[selectedRisk].title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {suggestions[selectedRisk].description}
                </p>
              </div>

              <div className="space-y-4">
                {suggestions[selectedRisk].tips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg cursor-pointer transition-all hover:bg-purple-50"
                    onClick={() => toggleTipExpansion(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <p className={`${expandedTip === index ? "font-medium" : ""}`}>
                        {tip}
                      </p>
                    </div>
                    {expandedTip === index && (
                      <div className="mt-2 ml-9 text-sm text-gray-600">
                        <p>Additional details would appear here when we integrate with your health data...</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Resources */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Additional Resources</h4>
                <ul className="space-y-2 text-sm text-blue-600">
                  <li>
                    <a href="#" className="hover:underline flex items-center">
                      <span className="mr-1">📚</span> Pregnancy Nutrition Handbook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline flex items-center">
                      <span className="mr-1">🍎</span> Sample Meal Plans
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline flex items-center">
                      <span className="mr-1">👩‍⚕️</span> Consult Nutritionist
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 bg-gray-50 text-center text-sm text-gray-500">
            <p>Always consult with your healthcare provider before making dietary changes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;