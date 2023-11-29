import express from 'express';
import neo4j from "neo4j-driver"
import cors from 'cors';


const app = express()
const db = neo4j.driver("neo4j+s://c6436e2d.databases.neo4j.io", neo4j.auth.basic('neo4j', 'rFEUHES8XeDv6A-fDZtXIFO4hbMdwauqbGkpfLq8UJg'))


app.use(cors())

app.listen(4200)


app.get('/EducationalProgram', async (req, res) => {
    const session = db.session();
    try {
        const result = await getResultByQuery('MATCH (n:EducationalProgram) RETURN n.name;')
        const records = result.records.map(record => record.get('n.name'));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
    //res.json(await getResultByQuery('MATCH (n:EducationalProgram) RETURN n.name;')) 
})

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

async function getResultByQuery(query) {
    const session = db.session({
        database: "neo4j",
        defaultAccessMode: neo4j.session.READ
    })
    
    const result = await session.run(query)

    session.close()

    return result;
}