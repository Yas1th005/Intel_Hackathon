import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Icon = ({ d, ...props }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d={d} />
  </svg>
);

const FinPlanLandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const icons = {
    chart: "M3 3v18h18",
    piggyBank: "M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",
    receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zm3 5h10M7 11h10M7 15h10",
    menu: "M3 12h18M3 6h18M3 18h18"
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <header className="shadow-lg sticky top-0 z-50" style={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(99,9,121,1) 35%, rgba(0,212,255,1) 100%)"
  }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Icon d={icons.chart} className="text-purple-400 mr-2" />
            <span className="text-xl font-bold text-purple-400">FinPlan</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {['Home', 'Portfolio', 'Savings', 'Tax', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/portfolio" className="text-gray-300 hover:text-purple-400 transition duration-150 ease-in-out">{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex space-x-2">
            <button className="px-4 py-2 text-purple-400 hover:bg-purple-400 hover:text-gray-900 rounded transition duration-150 ease-in-out">Login</button>
            <button className="px-4 py-2 bg-purple-500 text-gray-100 rounded hover:bg-purple-600 transition duration-150 ease-in-out">Sign Up</button>
          </div>
          <button className="md:hidden text-gray-300 hover:text-purple-400" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon d={icons.menu} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            <nav className="container mx-auto px-4">
              <ul className="space-y-2">
                {['Home', 'Investment', 'Savings', 'Tax', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="block py-2 text-gray-300 hover:text-purple-400 transition duration-150 ease-in-out">{item}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2">
                <button className="w-full px-4 py-2 text-purple-400 hover:bg-purple-400 hover:text-gray-900 rounded transition duration-150 ease-in-out">Login</button>
                <button className="w-full px-4 py-2 bg-purple-500 text-gray-100 rounded hover:bg-purple-600 transition duration-150 ease-in-out">Sign Up</button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-purple-300 leading-tight">Plan Your Financial Future with AI</h1>
          <button className="px-8 py-4 bg-purple-500 text-gray-100 rounded-full hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            <Link to='/usercreds'>Get Started</Link>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: icons.chart, title: 'Investment Planner', description: 'Optimize your portfolio with AI-driven insights' },
            { icon: icons.piggyBank, title: 'Savings Planner', description: 'Achieve your financial goals with smart saving strategies' },
            { icon: icons.receipt, title: 'Tax Optimizer', description: 'Maximize returns with intelligent tax planning' },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="bg-purple-500 text-gray-100 p-4 rounded-full mb-6">
                <Icon d={item.icon} size={48} />
              </div>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">{item.title}</h2>
              <p className="text-gray-400 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-150 ease-in-out">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-150 ease-in-out">Terms of Service</a>
          </div>
          <div className="flex space-x-6">
            {['facebook', 'twitter', 'linkedin'].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-purple-400 transition duration-150 ease-in-out">
                <span className="sr-only">{social}</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={
                    social === 'facebook'
                      ? "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      : social === 'twitter'
                      ? "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      : "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  } />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinPlanLandingPage;