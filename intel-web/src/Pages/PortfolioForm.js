import React, { useState } from 'react'

export const PortfolioForm = () => {
    const [portfolioCheck,setPortfoilioCheck]=useState(false)

  return (
    <div>
        {portfolioCheck?(
            <p>HI</p>
        ):(
            <p>Hello</p>
        )}
    </div>
  )
}
