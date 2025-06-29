import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUtensils, FaRunning, FaHome } from "react-icons/fa";

const Exercise = () => {
  const navigate = useNavigate();
  
  // Exercise recommendations data
  const recommendations = {
    low: {
      title: "Low Risk Exercise Plan",
      description: "Safe and beneficial activities for healthy pregnancy",
      icon: "🚶‍♀️",
      duration: "30-45 minutes daily",
      intensity: "Moderate",
      tips: [
        {
          text: "30 minutes walking daily (morning/evening when cooler)",
          detail: "Use supportive footwear, avoid uneven terrain"
        },
        {
          text: "Prenatal yoga sessions (2-3 times weekly)",
          detail: "Focus on poses that improve flexibility and reduce back pain"
        },
        {
          text: "Light stretching and breathing exercises daily",
          detail: "Especially beneficial before bedtime"
        },
        {
          text: "Swimming or water aerobics (if doctor-approved)",
          detail: "Excellent low-impact full-body workout"
        },
        {
          text: "Kegel exercises (3 sets of 10 daily)",
          detail: "Strengthens pelvic floor for labor and recovery"
        },
        {
          text: "Take movement breaks every hour when sitting",
          detail: "Prevents blood clots and reduces swelling"
        },
        {
          text: "Practice light squats and hip circles",
          detail: "Prepares body for labor, improves mobility"
        }
      ],
      precautions: [
        "Stay hydrated (drink before, during, and after)",
        "Avoid exercises lying flat on back after 1st trimester",
        "Stop immediately if experiencing dizziness or pain"
      ]
    },
    mid: {
      title: "Moderate Risk Activity Guide",
      description: "Gentle movements with precautions",
      icon: "🧘‍♀️",
      duration: "20-30 minutes",
      intensity: "Light",
      tips: [
        {
          text: "Limit workouts to 20 mins/day with breaks",
          detail: "Multiple short sessions may be better than one long one"
        },
        {
          text: "Avoid high-impact activities completely",
          detail: "No jumping, running, or sudden movements"
        },
        {
          text: "Gentle pilates and sitting stretches",
          detail: "Use props for support as needed"
        },
        {
          text: "Use maternity support belts if needed",
          detail: "Especially for back or pelvic pain"
        },
        {
          text: "Focus on posture and lower back strength",
          detail: "Wall angels and seated exercises recommended"
        },
        {
          text: "Modify positions - avoid lying flat on back",
          detail: "Use side-lying or inclined positions instead"
        },
        {
          text: "Exercise in climate-controlled spaces",
          detail: "Avoid overheating and maintain hydration"
        }
      ],
      precautions: [
        "Monitor blood pressure before/after activity",
        "Have someone nearby when exercising",
        "Discontinue if experiencing contractions"
      ]
    },
    high: {
      title: "High Risk Activity Protocol",
      description: "Medically supervised movement plan",
      icon: "🛌",
      duration: "As prescribed",
      intensity: "Very Light",
      tips: [
        {
          text: "Only doctor-approved activities",
          detail: "Strictly follow medical recommendations"
        },
        {
          text: "Focus on breathing techniques",
          detail: "Diaphragmatic breathing for relaxation"
        },
        {
          text: "Bed rest modifications if prescribed",
          detail: "Ankle circles and gentle stretches in bed"
        },
        {
          text: "Seated or supported leg movements",
          detail: "Only if permitted by healthcare provider"
        },
        {
          text: "Guided meditation for mental wellness",
          detail: "Reduces stress without physical strain"
        },
        {
          text: "Monitor baby movements carefully",
          detail: "Report any changes immediately"
        },
        {
          text: "Prioritize complete rest periods",
          detail: "Balance minimal activity with adequate recovery"
        }
      ],
      precautions: [
        "No exercise without explicit doctor approval",
        "Watch for warning signs like bleeding or swelling",
        "Keep emergency contacts readily available"
      ]
    }
  };

  // Component state
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);
  const [showPrecautions, setShowPrecautions] = useState(false);

  // Handlers
  const handleRiskSelection = (level) => {
    setSelectedRisk(level);
    setExpandedTip(null);
    setShowPrecautions(false);
  };

  const toggleTipExpansion = (index) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Consistent with other pages */}
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
                onClick={() => navigate("/food")}
                className="flex items-center text-gray-700 hover:text-pink-600"
              >
                <FaUtensils className="mr-2" /> Food Guide
              </button>
              <button 
                className="flex items-center text-purple-700 font-semibold"
              >
                <FaRunning className="mr-2" /> Exercise
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Exercise Content */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h1 className="text-3xl font-bold mb-2">Pregnancy Activity Guide</h1>
            <p className="text-blue-100">
              Safe movement recommendations based on your health assessment
            </p>
          </div>

          {/* Risk Selection Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select your pregnancy risk level:
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(recommendations).map(([level, data]) => (
                <button
                  key={level}
                  onClick={() => handleRiskSelection(level)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center
                    ${selectedRisk === level
                      ? "border-blue-600 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"}`}
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
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{recommendations[selectedRisk].icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700">
                      {recommendations[selectedRisk].title}
                    </h3>
                    <p className="text-gray-600">
                      {recommendations[selectedRisk].description}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        Duration: {recommendations[selectedRisk].duration}
                      </span>
                      <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                        Intensity: {recommendations[selectedRisk].intensity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="mr-2">💡</span>
                  Recommended Activities
                </h4>
                
                {recommendations[selectedRisk].tips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer transition-all hover:bg-blue-50 border border-gray-200"
                    onClick={() => toggleTipExpansion(index)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <p className={`${expandedTip === index ? "font-medium text-blue-800" : "text-gray-800"}`}>
                        {tip.text}
                      </p>
                    </div>
                    {expandedTip === index && (
                      <div className="mt-2 ml-9 text-sm text-gray-600 bg-white p-2 rounded border border-gray-100">
                        <p>{tip.detail}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Precautions Section */}
              <div className="mb-6">
                <button
                  onClick={() => setShowPrecautions(!showPrecautions)}
                  className="flex items-center text-red-600 font-medium mb-2"
                >
                  <span className="mr-2">{showPrecautions ? "▼" : "▶"}</span>
                  Important Precautions
                </button>
                
                {showPrecautions && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <ul className="list-disc pl-5 space-y-2 text-red-800">
                      {recommendations[selectedRisk].precautions.map((precaution, index) => (
                        <li key={index}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Additional Resources */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                  <span className="mr-2">📚</span>
                  Exercise Resources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-1">🎥</span> Video Demonstrations
                  </a>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-1">📅</span> Weekly Planner
                  </a>
                  <a href="#" className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-1">🏥</span> Consult Physiotherapist
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 bg-gray-50 text-center text-sm text-gray-500 border-t">
            <p>Always consult your healthcare provider before starting any exercise program</p>
            <p className="mt-1">Discontinue activity and seek medical advice if you experience any discomfort</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;