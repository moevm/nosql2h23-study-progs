import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createDriver, Neo4jProvider } from 'use-neo4j';


const driver = createDriver("neo4j+s", "e9b78945.databases.neo4j.io", "7687", "neo4j", "vlRz2v2ZH2EMs6wFvnkONVPqJohorsec0qHmfVbFDy8")
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </React.StrictMode>
);

