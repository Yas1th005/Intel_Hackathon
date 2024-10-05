// Million.js
import React, { useState, useEffect } from "react";
import CandlestickChart from '../Extra/MillionGraph'
const Icon = ({ d, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d={d} />
  </svg>
);

function Million() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    
      fetch("http://localhost:5001/get-data")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        localStorage.setItem('apiCalled','true');
      })
      .catch((error) => console.error("Error fetching data:", error));
    
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const icons = {
    chart: "M3 3v18h18",
    piggyBank:
      "M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z",
    receipt:
      "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zm3 5h10M7 11h10M7 15h10",
    menu: "M3 12h18M3 6h18M3 18h18",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <header
        className="shadow-lg sticky top-0 z-50"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(99,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Icon d={icons.chart} className="text-purple-400 mr-2" />
            <span className="text-xl font-bold text-purple-400">Millionaire</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {["Home", "Investment", "Savings", "Tax", "About", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-purple-400 transition duration-150 ease-in-out"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
          <button
            className="md:hidden text-gray-300 hover:text-purple-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon d={icons.menu} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            <nav className="container mx-auto px-4">
              <ul className="space-y-2">
                {["Home", "Investment", "Savings", "Tax", "About", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="block py-2 text-gray-300 hover:text-purple-400 transition duration-150 ease-in-out"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content - Table */}
      <div className="container mx-auto p-6">
        <table className="min-w-full bg-gray-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Date</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Company</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Client</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Trans</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Quantity</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Traded</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left text-gray-300">Closed</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <tr
                  className="cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => handleClick(index)}
                >
                  <td className="py-2 px-4 border-b border-gray-700">{item.Date}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{item.Company}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{item.Client}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{item.Trans}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{item.Quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{item.Traded}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{item.Closed}</td>
                </tr>
                {activeIndex === index && (
                  <tr>
                  
                  <td colSpan="4" className="py-2 px-4 bg-purple-700">
                    <p>Client Name: {item.Client}</p>
                    <p>Price: {item.Traded}</p>
                    <p>Quantity: {item.Quantity}</p>
                    <p>Share Name: {item.Company}</p>
                    <p>Symbol: {item.Closed}</p>
                    <p>Work: {item.Trans}</p>
                  </td>
                
                  
                  <td colSpan="3" className="py-2 px-4 bg-gray-100">
                    <CandlestickChart company_name={item.Company}/>
                  </td>
                </tr>
                
                  
                  
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition duration-150 ease-in-out"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-400 transition duration-150 ease-in-out"
            >
              Terms of Service
            </a>
          </div>
          <div className="flex space-x-6">
            {["facebook", "twitter", "linkedin"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition duration-150 ease-in-out"
              >
                <span className="sr-only">{social}</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d={
                      social === "facebook"
                        ? "M18 2h-3c-1.657 0-3 1.343-3 3v3H9v4h3v8h4v-8h3.278L20 10h-4V8c0-.551.449-1 1-1h3V3h-3z"
                        : social === "twitter"
                        ? "M8 19h4v2H8zm0-4h4v2H8zm0-4h4v2H8zm8 4h4v2h-4zm0-4h4v2h-4zm0-4h4v2h-4zm0-4h4v2h-4z"
                        : "M4 3v18l8-6 8 6V3H4z"
                    }
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default Million;
