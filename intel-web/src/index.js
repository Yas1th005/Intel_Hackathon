import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import FinPlanLandingPage from './Pages/FinPlanLandingPage';
import PortfolioSide from './Pages/PortfolioSide';
import { PortfolioMain } from './Pages/PortfolioMain';
import { LandingPage } from './Pages/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allRoutes=createBrowserRouter(
  [
    {
      path:"/",
      element:<FinPlanLandingPage/>
    },
    {
      path:"/portfolio",
      element:<PortfolioSide/>
    },
    {
      path:"/details/:item",
      element:<PortfolioMain/>
    },
    {
      path:"/land",
      element:<LandingPage/>
    }
  ]
)
root.render(
    <RouterProvider router={allRoutes}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
