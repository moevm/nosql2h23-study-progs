import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CatalogPage from '../catalogPage/CatalogPage';
import TrainingPlanPage from '../trainingPlanPage/TrainingPlanPage';
import { NavLink } from 'react-router-dom';


const MainPage = () => {


  return (
    <div>
        <nav>Здесь будет меню

            <NavLink to="/catalog">catalog</NavLink>
            <NavLink to="/training-plan">plan</NavLink>
            <NavLink to="/login">login</NavLink>
        </nav>
        <div className="page_container">
            <Routes>
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/training-plan" element={<TrainingPlanPage />} />
            </Routes>
        </div>
    </div>
  )
}

export default MainPage;