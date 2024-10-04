import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading';

export const GroqData = (props) => {
    const [data,setData]=useState([])
    console.log(props.show[props.show.length-1])
    const fetchChartData = async () => {
        try {
          const response = await fetch("http://localhost:5002/api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ required: props.show.slice(0,-1), current:["RELIANCE", "TCS", "HDFCBANK"] }), // Send the company name in the body
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setData(data);
          } else {
            console.error("Error fetching chart data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      };
      
      useEffect(() => {
        fetchChartData();
      }, []);

  return (
    <div className="min-h-[300px] h-auto bg-gradient-to-r from-purple-800 to-blue-500 text-white flex flex-col items-center p-6">
      {data.length===0 ?(
        <Loading/>
      ):(
        <div>
          <h1>{props.show[props.show.length-1]}</h1>
          {data.map((item)=>{
            return(
              <div>
                  <p>{item}</p>
                  <br/>
              </div>
            )
          })}
          
          {/* <br/>
          <div>
            {data.split("!")[1].split(". ").map((item)=>{
              return(
                <div>
                  <p>{item}</p>
                </div>
                <div>
                  {item.split("*").map((i)=>{
                    return(
                      <div>
                        <p>{i}</p>
                        <br/>
                      </div>
                      
                    )
                  })}
                  <br/>
                </div>

              )
            })}
          </div> */}
        </div>
        
      )}
        
    </div> 
  )
}
