import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const PortfolioMain = () => {
  const { item } = useParams();
  const show = item.split(',');
  const route = [
    "large-cap", "money-market", "real-estate", "liquid", "real-estate",
    "small-cap", "small-cap", "long-term-bonds", "municipal", 
    "corporate-bonds", "short-term-bonds", "long-term-bonds","corporate-bonds","gold-etf","etf","cyclical-stocks","dividend-stocks","long-term-bonds",
    "short-term-bonds","gold-etf","large-cap","growth-stocks","bluechip-stocks","etf","value-stocks","sector-stocks","sector-stocks",
    "tech-stocks","sector-stocks","growth-stocks"
  ];
  const [monte,setMonte]=useState([])
  const [names,setNames]=useState(["ShareName","fund","etf_name"])


  const add = (item) => {
    Object.keys(item).forEach((it, ind) => {
      if (names.includes(it)) {
        console.log(monte)
        setMonte([...monte,Object.values(item)[ind]]);
      }
    });
    
  };

  const data = [
    { "0": "Large-Cap Growth Stocks" },
    { "1": "Money Market Funds" },
    { "2": "Real Estate Investment Trusts (REITs)" },
    { "3": "Liquid Stocks" },
    { "4": "Real Estate Funds" },
    { "5": "Small-Cap Value Stocks" },
    { "6": "Small-Cap Stocks" },
    { "7": "Long-Term Government Bonds" },
    { "8": "Municipal Bonds" },
    { "9": "High-Quality Corporate Bonds" },
    { "10": "Short-Term Bonds" },
    { "11": "Long-Term Bonds" },
    { "12": "Corporate Bonds"},
    { "13": "Gold ETFs"},
    { "14": "Broad Market ETFs"},
    { "15": "Cyclical Stocks"},
    { "16": "Dividend-Paying Stocks"},
    { "17": "Long-Term Bonds (15-40%)"},
    { "18": "Short-Term Bonds (15-40%)"},
    { "19": "Gold (7.5-10%)"},
    { "20": "Stocks (30-40%)"},
    { "21": "Growth Stocks"},
    { "22": "Blue-Chip Stocks"},
    { "23": "Exchange-Traded Funds (ETFs)"},
    { "24": "Value Stocks"},
    { "25": "Sector-Specific Stocks"},
    { "26": "Sector Leaders"},
    { "27": "Technology Stocks"},
    { "28": "Sector-Specific Small-Caps"},
    { "29": "Growth-Oriented Small-Caps"}
  ];

  const [tables, setTables] = useState([]);
  const [folio,setFolio]=useState(false);
  useEffect(() => {
    const fetchSequentially = async () => {
      for (let index = 0; index < data.length; index++) {
        const dataValue = Object.values(data[index])[0];

        // Check if dataValue is in the `show` array
        if (show.includes(dataValue)) {
          await callRoute(route[index], dataValue); // Fetch the data
        }
      }
    };

    fetchSequentially(); // Call the async function
  }, []);

  const callRoute = async (routeItem, title) => {
    console.log(`Fetching: http://localhost:5000/${routeItem}`);
    
    try {
      const response = await fetch(`http://localhost:5000/${routeItem}`);
      const fetchedData = await response.json();
      
      setTables((prevTables) => [...prevTables, { title, items: fetchedData }]); // Append title and fetched data to tables
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {!folio?(
        <div>
          
          <button onClick={()=>setFolio(!folio)}>Done</button>
        </div>
        
      ):(
        (!tables || tables.length === 0) ? (
          <div className="h-[100vh] bg-gradient-to-r from-purple-800 to-blue-500 text-white flex flex-col items-center p-6">
            {/* <Loading/> */}
          </div>
        ):(
          <div>
          {tables.map((tableData, index) => (
            // <Block key={index} title={tableData.title} items={tableData.items} />
            <div className="min-h-screen bg-gradient-to-r from-purple-800 to-blue-500 text-white flex flex-col items-center p-6">
              <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
                {tableData.title}
              </h1>
              {/* Table */}
              <div className="w-full max-w-4xl">
                <table className="w-full table-auto bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
                  <thead className="bg-purple-800 text-white">
                    <tr>
                      {Object.keys(tableData.items[0]).map((key, index) => (
                        <th key={index} className="px-4 py-2 text-left">
                          {key}
                        </th>                       
                      ))}
                      <th>Checkbox</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.items.map((item, index) => (
                      <tr key={index} className="bg-purple-100 hover:bg-purple-200 transition duration-300 ease-in-out">
                        {Object.keys(item).map((key, ind) => (
                          <td key={ind} className="border px-4 py-2">
                            {item[key]}
                          </td>
                        ))}
                        <td className='flex justify-center items-center'>
                          <input
                          type='checkbox'
                          className='mt-[10px]'
                          // onClick={()=>setMonte([...monte,Object.values(item)[0]])}
                          onClick={()=>add(item)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          </div>
          
        )
      )}
      <div>
        {monte.map((item)=>{
          return(
            <div>
              <p>{item} </p>
            </div>
            
          )
          
        })}
      </div>
      <div>
        <p>Show More Data</p>
      </div>
      {/* {monte.length()!=0?(
        <Monte company_name="Reliance"/>
      ):()} */}
      
    </div>
  );
};

// const Block = ({ items, title }) => {

//   return (
    
//   );
// };
