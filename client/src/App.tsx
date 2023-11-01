import React, { useEffect, useState } from 'react';
import { DocumentsAPIs } from './api/documents.api';
import './App.scss';
import { Routes, Link, Route } from 'react-router-dom';
import Nav from './components/nav/nav';
import Login from './components/login/login';
import RequireAuth from './components/requireAuth';

const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;



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
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/dashboard" element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                } />
                <Route path="/settings" element={
                    <RequireAuth>
                        <Settings />
                    </RequireAuth>
                } />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default App;
