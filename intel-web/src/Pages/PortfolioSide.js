import React, { useState } from 'react';
import PortfolioLink from '../Extra/PortfolioLink';
// import './App.css'; // This contains the custom CSS for background animations

const PortfolioSide = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showList, setShowList] = useState(false);

  const handleProceed = () => {
    setShowList(true);
  };

  return (
    <>
      {!showList ? (
        <div className="min-h-screen relative flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">FinPlan</h1>
              <nav className="space-x-6">
                <a href="#home" className="hover:text-gray-300">Home</a>
                <a href="#investment" className="hover:text-gray-300">Investment</a>
                <a href="#savings" className="hover:text-gray-300">Savings</a>
                <a href="#tax" className="hover:text-gray-300">Tax</a>
                <a href="#about" className="hover:text-gray-300">About</a>
                <a href="#contact" className="hover:text-gray-300">Contact</a>
              </nav>
              <div className="space-x-4">
                <button className="bg-transparent border border-white py-2 px-4 rounded hover:bg-white hover:text-purple-700">Login</button>
                <button className="bg-purple-600 py-2 px-4 rounded hover:bg-purple-800">Sign Up</button>
              </div>
            </div>
          </header>

          {/* Animated Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-700 to-blue-500 animate-gradientMove z-0"></div>

          {/* Main Content */}
          <main className="flex-grow relative z-10 text-white max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-extrabold mt-12 mb-6">Plan Your Financial Future with AI</h2>
            <p className="text-lg mb-10">Optimize your portfolio, achieve financial goals, and maximize tax returns with intelligent planning tools.</p>
            <p className="text-lg mb-10">Select an option to proceed</p>
            {/* Options in a Row */}
            <div className="flex justify-center space-x-6 mb-8">
              {['Low Risk', 'Moderate Risk', 'High Risk'].map((option) => (
                <button
                  key={option}
                  className={`py-4 px-8 rounded-lg transition-transform transform hover:scale-105
                    ${selectedOption === option ? 'bg-purple-600' : 'bg-gray-800 hover:bg-purple-600'}
                    text-white shadow-md`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
              {console.log(selectedOption)}
            <button
              className={`mt-4 py-3 px-6 rounded-lg text-white transition-all duration-500 transform hover:scale-105
                ${selectedOption ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'bg-gray-500 cursor-not-allowed'}`}
              onClick={handleProceed}
              disabled={!selectedOption}
            >
              Proceed
            </button>
          </main>
        </div>
      ) : (
        <PortfolioLink level={selectedOption}/>
      )}
    </>

  );
};

export default PortfolioSide;
