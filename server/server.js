import express from 'express';
import neo4j from "neo4j-driver"
import cors from 'cors';

const app = express()
const db = neo4j.driver("neo4j+s://e9b78945.databases.neo4j.io", neo4j.auth.basic('neo4j', 'vlRz2v2ZH2EMs6wFvnkONVPqJohorsec0qHmfVbFDy8'))

app.use(cors())

app.listen(4200)

async function getResultByQuery(query) {
    const session = db.session({
        database: "neo4j",
        defaultAccessMode: neo4j.session.READ
    })
    
    const result = await session.run(query)

    session.close()

    return result;
}

app.get('/trainingPlans', async (req, res) => {
    
    res.json(await getResultByQuery('MATCH (n:Plan) RETURN n LIMIT 25;'));

})

app.get('/api2', async (req, res) => {
    const session = db.session({
        database: "neo4j",
        defaultAccessMode: neo4j.session.READ
    })
    
    const result = await session
    .run("MATCH p=()-[:HAS]->() RETURN p LIMIT 25")

    res.json(result)

    session.close()
})

