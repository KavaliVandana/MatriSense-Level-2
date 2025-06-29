// src/components/Result.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const risk = location.state?.prediction;

  useEffect(() => {
    if (!risk) {
      // Redirect home if no prediction data
      navigate("/");
    }
  }, [risk, navigate]);

  const getColor = (risk) => {
    if (risk === "Low") return "text-green-600";
    if (risk === "Medium") return "text-yellow-600";
    if (risk === "High") return "text-red-600";
    return "";
  };

  const getReportMessage = (risk) => {
    switch (risk) {
      case "Low":
        return "Your health looks good. Keep maintaining a balanced diet and regular exercise.";
      case "Medium":
        return "You have some health risks. Consider following a healthier lifestyle and consult your doctor.";
      case "High":
        return "You have a high health risk. Please seek medical advice immediately and follow prescribed guidelines.";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">
        🎯 Risk Prediction Result
      </h2>
      {risk ? (
        <>
          <p className="text-lg">
            Your predicted risk level is:{" "}
            <span className={`font-bold ${getColor(risk)}`}>{risk}</span>
          </p>
          <p className="mt-4 italic text-gray-700">{getReportMessage(risk)}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Back to Home
          </button>
        </>
      ) : (
        <p className="text-red-500">
          No prediction data found. Please submit your health info first.
        </p>
      )}
    </div>
  );
};

export default Result;
