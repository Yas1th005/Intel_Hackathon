import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioData } from './PortfolioData';
import Buttons from '../components/Buttons';
import ButtonConclusion from '../components/ButtonConclusion';

const ContentBox = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [animateTrigger, setAnimateTrigger] = useState(true);
  const [stock,setStock]=useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heading,setHeading]=useState(0);
  const [num,setNum]=useState(1)
  const togglePopup = (item) => {
    if (isPopupOpen) {
      // trigger the exit animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsPopupOpen(false);
        setIsAnimating(false);
      }, 500); // duration should match CSS animation
    } else {
      setIsPopupOpen(true);
      setHeading(item)
    }
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + ' .....';
  };

  const handleNext = () => {
    setAnimateTrigger(false); // Reset animation state
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % boxContent.length);
      setAnimateTrigger(true); // Trigger animation after content change
    }, 100); // Small delay to allow state to reset
  };

  const handlePrev = () => {
    setAnimateTrigger(false); // Reset animation state
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + boxContent.length) % boxContent.length);
      setAnimateTrigger(true); // Trigger animation after content change
    }, 100); // Small delay to allow state to reset
  };
  const addStock = (newItem) => {
    setStock((prevStock) => [...prevStock, newItem]);
  };
  const openMain = (item) => {
    const stocksToAdd = boxContent[activeIndex].StockReq.replaceAll("**", "").split("- ").map((item) => item.split(":")[0].trim());
    stocksToAdd.forEach((stockItem) => addStock(stockItem));
    addStock(boxContent[activeIndex].StrategyName)
  };
  useEffect(() => {
    console.log("Updated stock:", stock.slice(1)); // Logs the updated stock after every change
    num===2?(
      navigate(`/details/${stock.slice(1)}`)
    ):(
      setNum(num+1)
    )

  }, [stock]);

  const boxContent = PortfolioData.filter(item=>item.Option===props.level)

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + boxContent.length) % boxContent.length;
      items.push({ ...boxContent[index], offset: i });
    }
    return items;
  };

  const renderPopupContent = () => {
    switch (heading) {
      case 1:
        return (
          <>
            <h3 className="text-2xl font-bold mb-4">Brief about {boxContent[activeIndex].StrategyName}</h3>
            <p className="text-gray-100 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {boxContent[activeIndex].Brief.replaceAll("**", "").split("- ").map((item, index) => (
                <ul key={index}>
                  <li className="py-[5px]">
                    {item.split(":").map((i, ind) => (
                      <div key={ind}>
                        {ind === 0 ? (
                          <span className="font-bold text-white-500">{i} :</span>
                        ) : (
                          <span>{i}</span>
                        )}
                      </div>
                    ))}
                  </li>
                </ul>
              ))}
            </p>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-bold text-white">Profit Stories</h3>
            <p className="mt-4 text-gray-100 text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif', color: '#FAF9F6' }}>{boxContent[activeIndex].ProfitStories.replaceAll("**","").split("2.").map((item, index) => <ul><li className='py-[5px]' key={index}>{item.split(":").map((i, ind) => (<div key={ind}>{ind === 0 && index!==0 ? (<span className="font-bold text-white-500">2. {i} :</span>) : ind===0?(<span className="font-bold text-white-500">{i} :</span>):(<span>{i}</span>)}</div>))}</li> </ul>)}</p>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-bold text-white">Loss Stories</h3>
            <p className="mt-4 text-gray-100 text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif', color: '#FAF9F6' }}>{boxContent[activeIndex].LossStories.replaceAll("**","").split("2.").map((item, index) => <ul><li className='py-[5px]' key={index}>{item.split(":").map((i, ind) => (<div key={ind}>{ind === 0 && index!==0 ? (<span className="font-bold text-white-500">2. {i} :</span>) : ind===0?(<span className="font-bold text-white-500">{i} :</span>):(<span>{i}</span>)}</div>))}</li> </ul>)}</p>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-2xl font-bold mb-4">Stock Required</h3>
            <p className="text-gray-100 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {boxContent[activeIndex].StockReq.replaceAll("**", "").split("- ").map((item, index) => (
                <ul key={index}>
                  <li className="py-[5px]">
                    {item.split(":").map((i, ind) => (
                      <div key={ind}>
                        {ind === 0 ? (
                          <span className="font-bold text-white-500">{i} :</span>
                        ) : (
                          <span>{i}</span>
                        )}
                      </div>
                    ))}
                  </li>
                </ul>
              ))}
            </p>
          </>
        );
      default:
        return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e293b] py-12">
      <h2 className="text-4xl font-extrabold mb-8 text-white">Plan Your Financial Future</h2>

      <div className="relative w-[800px] h-[220px] overflow-hidden">
        {getVisibleItems().map((item, index) => (
          <div
            key={index}
            className={`absolute top-1/2 left-1/2 p-4 text-center rounded-lg
              bg-[#1e293b] text-gray-300 hover:bg-purple-700 hover:text-white cursor-pointer
              flex items-center justify-center border-2 border-purple-500`}
            style={{
              width: item.offset === 0 ? '400px' : '240px',
              height: item.offset === 0 ? '200px' : '160px',
              transform: `translate(${item.offset * 250}px, -50%) translateX(${item.offset === 0 ? '-50%' : item.offset < 0 ? '-100%' : '0%'})`,
              zIndex: 3 - Math.abs(item.offset),
              opacity: item.offset === 0 ? 1 : 0.6,
            }}
            
          >
            <div>
              <p className={`mt-2 font-bold ${item.offset === 0 ? 'text-lg' : 'text-sm'}`}>{item.StrategyName}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button 
          onClick={handlePrev}
        >
          <Buttons side="left"/>
        </button>
        <button 
          onClick={handleNext}
        >
          <Buttons side="right"/>
        </button>
      </div>
      


<div className="mt-12 grid grid-cols-3 gap-4 w-full max-w-[80vw] mx-auto px-2">

        <div className={`bg-purple-700 p-6 rounded-lg shadow-lg col-span-3 transform transition duration-500 ease-in-out 
          ${animateTrigger ? 'animate-slide-up' : 'opacity-0'} hover:scale-105 h-[300px]`}>
            <div className='transform transition-all duration-500 ease-in-out hover:scale-95'>
            <h3 className="text-2xl font-bold text-pink-200 text-center w-full py-4 rounded-lg">{boxContent[activeIndex].StrategyName}</h3>
            <p className="mt-4 text-gray-100 text-center text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>{boxContent[activeIndex].Conclusion}</p>
            </div>
            <br></br>
            <div className="flex justify-center">
            <button onClick={() => openMain(boxContent[activeIndex].StrategyName)}>
              <ButtonConclusion />
            </button>
          </div>

          
        </div>

        <div className={`col-span-2 bg-purple-600 p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out cursor-pointer
          ${animateTrigger ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className='transform transition-all duration-500 ease-in-out hover:scale-95'>
            <h3 className="text-2xl font-bold text-blue">Brief about {boxContent[activeIndex].StrategyName}</h3>
            <p className="mt-4 text-gray-100 text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif'}}>
              {truncateText(boxContent[activeIndex].Brief.replaceAll("**", ""), 300)}
            </p>
            <button
              className="mt-2 text-black-500 underline"
              onClick={()=>togglePopup(1)}
            >
              Read More
            </button>
          </div>
        </div>

        <div className={`bg-purple-800 p-6 rounded-lg shadow-lg transform transition duration-500 ease-in-out 
          ${animateTrigger ? 'animate-slide-up' : 'opacity-0'} hover:scale-105`}>
            <div className='transform transition-all duration-500 ease-in-out hover:scale-95'>
            <h3 className="text-xl font-bold text-grey">Profit Stories</h3>
            <p className="mt-4 text-gray-100 text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif', color: '#FAF9F6' }}>{boxContent[activeIndex].ProfitStories.replaceAll("**","").split("2.").map((item, index) => <ul><li className='py-[5px]' key={index}>{item.split(":").map((i, ind) => (<div key={ind}>{ind === 0 && index!==0 ? (<span className="font-bold text-white-500">2. {i} :</span>) : ind===0?(<span className="font-bold text-white-500">{i} :</span>):(<span></span>)}</div>))}</li> </ul>)}</p>
            <button
              className="mt-2 text-blue-500 underline"
              onClick={()=>togglePopup(2)}
            >
              Read More
            </button>
            </div>
          
        </div>
        <div className={`bg-purple-800 p-6 rounded-lg shadow-lg transform transition duration-500 ease-in-out 
          ${animateTrigger ? 'animate-slide-up' : 'opacity-0'} hover:scale-105`}>
            <div className='transform transition-all duration-500 ease-in-out hover:scale-95'>
            <h3 className="text-xl font-bold text-white">Loss Stories</h3>
            <p className="mt-4 text-gray-100 text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif', color: '#FAF9F6' }}>{boxContent[activeIndex].LossStories.replaceAll("**","").split("2.").map((item, index) => <ul><li className='py-[5px]' key={index}>{item.split(":").map((i, ind) => (<div key={ind}>{ind === 0 && index!==0 ? (<span className="font-bold text-white-500">2. {i} :</span>) : ind===0?(<span className="font-bold text-white-500">{i} :</span>):(<span></span>)}</div>))}</li> </ul>)}</p>
            <button
              className="mt-2 text-blue-500 underline"
              onClick={()=>togglePopup(3)}
            >
              Read More
            </button>
            </div>
          
        </div>
        <div className={`col-span-2 bg-purple-600 p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out cursor-pointer
          ${animateTrigger ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className='transform transition-all duration-500 ease-in-out hover:scale-95'>
            <h3 className="text-2xl font-bold text-blue">Stocks Required</h3>
            <p className="mt-4 text-gray-100 text-sm font-sans" style={{ fontFamily: 'Inter, sans-serif'}}>
              {truncateText(boxContent[activeIndex].StockReq.replaceAll("**", ""), 300)}
            </p>
            <button
              className="mt-2 text-black-500 underline"
              onClick={()=>togglePopup(4)}
            >
              Read More
            </button>
          </div>
        </div>
        
        {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`w-[800px] bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out relative 
              ${isAnimating ? 'animate-slide-out' : 'animate-slide-in'}`}
          >
            <button
              className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-700 transition duration-300"
              onClick={()=>togglePopup({heading})}
            >
              X
            </button>
            {renderPopupContent()}
            
          </div>
        </div>
      )}
      </div>
      {/* Custom animations */}
      <style jsx="true">{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-slide-in {
          opacity: 0;
          transform: translateY(20%);
          animation: slide-in 0.5s forwards;
        }

        .animate-slide-out {
          opacity: 1;
          transform: translateY(0%);
          animation: slide-out 0.5s forwards;
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(20%);
          }
          100% {
            opacity: 1;
            transform: translateY(0%);
          }
        }

        @keyframes slide-out {
          0% {
            opacity: 1;
            transform: translateY(0%);
          }
          100% {
            opacity: 0;
            transform: translateY(20%);
          }
        }
      `}</style>
    </div>
  );
};



export default ContentBox;



