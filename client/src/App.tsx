import React, { useEffect, useState } from 'react';
import { DocumentsAPIs } from './api/documents.api';
import './App.scss';
import { Routes, Link, Route } from 'react-router-dom';
import Nav from './components/nav/nav';
import Login from './components/login/LoginPage';
import RequireAuth from './components/requireAuth';
import Signup from './components/signup/SignupPage';
import MainPage from './components/mainPage/MainPage';


function App() {
    
    const getData = async () => {

        // const data = await DocumentsAPIs.getAllTrainingPlans();
        
        // console.log(data.data)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={
                    <RequireAuth>
                        <MainPage />
                    </RequireAuth>
                } />
            </Routes>
        </div>
    )
}

export default App;
