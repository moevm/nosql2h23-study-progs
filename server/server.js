import express from 'express';
import neo4j from "neo4j-driver"
import cors from 'cors';

import { parseFromString } from 'dom-parser';

const app = express()
const db = neo4j.driver("neo4j+s://c6436e2d.databases.neo4j.io", neo4j.auth.basic('neo4j', 'rFEUHES8XeDv6A-fDZtXIFO4hbMdwauqbGkpfLq8UJg'))

app.use(cors())

app.listen(4200)

/// проверка
const session = db.session();

session
    .run('MATCH (n) RETURN n LIMIT 5')
    .then((result) => {
      result.records.forEach((record) => {
        console.log(record.get('n').properties);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      session.close();
      db.close();
});

///

app.get('/', (req, res) => {
    (async () => {
        let response = await fetch('https://etu.ru/sveden/education/eduop/')
        switch (response.status) {
            case 200:
                let dom = parseFromString(await response.text())
                res.send(dom)
                break
            case 404:
                res.json({'message': 'not ok'});
                break
        }
    })();
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

