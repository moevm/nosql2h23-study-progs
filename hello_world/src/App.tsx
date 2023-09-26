import React from 'react';
import './App.css';
import { useReadCypher } from 'use-neo4j/dist/cypher';

function App() {
  
  const query = `MATCH (n:Person) RETURN n`

  const obj = useReadCypher(query)

  console.log(obj)


  return (
      <div>
          Hello world
      </div>
  )
}

export default App;
