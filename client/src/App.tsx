import React, { useEffect, useState } from 'react';
import './App.css';
import { DocumentsAPIs } from './api/documents.api';

function App() {
    
    const getData = async () => {

        const data = await DocumentsAPIs.getAllTrainingPlans();
        
        console.log(data.data)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            Hello world
        </div>
    )
}

export default App;
