import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-white flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">Welcome to MatriSense+</h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
        Your health and your baby’s well-being come first 💜.
        MatriSense+ empowers you with personalized pregnancy care — from health risk prediction to food and exercise guidance.
      </p>
      <p className="text-xl font-semibold text-red-600 mb-6">
        👉 Check your pregnancy health risk and get the right care suggestions!
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
      >
        Login to Check Health Risk
      </button>
    </div>
  );
};

export default Landing;
