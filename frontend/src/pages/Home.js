import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaUtensils, FaRunning, FaHome, FaSignInAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <span 
                className="text-purple-700 font-bold text-xl cursor-pointer"
                onClick={() => navigate("/home")}
              >
                MatriSense+
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate("/home")}
                className="flex items-center text-purple-700 hover:text-pink-600"
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
                onClick={() => navigate("/exercise")}
                className="flex items-center text-gray-700 hover:text-pink-600"
              >
                <FaRunning className="mr-2" /> Exercise
              </button>
              <button 
                onClick={() => navigate("/login")}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                <FaSignInAlt className="mr-2" /> Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6">
            Welcome to MatriSense+
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Your complete pregnancy health companion. Get personalized care recommendations based on your health status.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Health Risk Card */}
            <div 
              onClick={() => navigate("/healthrisk")}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-purple-100 hover:border-purple-200"
            >
              <div className="text-purple-600 mb-4 flex justify-center">
                <FaHeartbeat className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Health Risk Assessment</h3>
              <p className="text-gray-600">
                Check your pregnancy health status and get personalized risk analysis
              </p>
            </div>

            {/* Food Guide Card */}
            <div 
              onClick={() => navigate("/food")}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-purple-100 hover:border-purple-200"
            >
              <div className="text-purple-600 mb-4 flex justify-center">
                <FaUtensils className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Food & Nutrition</h3>
              <p className="text-gray-600">
                Get customized diet plans based on your pregnancy risk level
              </p>
            </div>

            {/* Exercise Card */}
            <div 
              onClick={() => navigate("/exercise")}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-purple-100 hover:border-purple-200"
            >
              <div className="text-purple-600 mb-4 flex justify-center">
                <FaRunning className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Exercise Guide</h3>
              <p className="text-gray-600">
                Safe workout recommendations tailored to your condition
              </p>
            </div>
          </div>

          {/* Informational Section */}
          <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto border border-purple-100">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Pregnancy Health Tips
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Maintain a balanced diet rich in vitamins and minerals.</li>
              <li>Stay hydrated and drink plenty of water throughout the day.</li>
              <li>Engage in safe and moderate exercise regularly, as recommended.</li>
              <li>Attend regular prenatal checkups with your healthcare provider.</li>
              <li>Get enough rest and manage stress with relaxation techniques.</li>
              <li>Avoid harmful substances such as alcohol, tobacco, and unprescribed drugs.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} MatriSense+ - Your Pregnancy Health Companion</p>
          <p className="mt-2 text-sm">Always consult with your healthcare provider for medical advice</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
