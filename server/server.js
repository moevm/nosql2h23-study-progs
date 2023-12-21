import express from 'express';
import neo4j from "neo4j-driver"
import cors from 'cors';


const app = express()
const db = neo4j.driver("neo4j+s://c6436e2d.databases.neo4j.io", neo4j.auth.basic('neo4j', 'rFEUHES8XeDv6A-fDZtXIFO4hbMdwauqbGkpfLq8UJg'))

import login_list_json from "./data/loginInfoList.json" assert { type: "json" };
const login_list = login_list_json.loginList;

/*const urlencodedParser = express.urlencoded({
    extended: false,
});*/
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(4200)


app.get('/EducationalPrograms', async (req, res) => {
    try {
        const result = await getResultByQuery('MATCH (n:EducationalProgram) RETURN n.name, n.latin_name;')
        const records = result.records.map(record => ({ 
            Name: record.get('n.name'),
            LatinName: record.get('n.latin_name')
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//Disciplines
app.get('/Disciplines', async (req, res) => {
    try {
        const result = await getResultByQuery('MATCH (n:Discipline) RETURN n.name;')
        const records = result.records.map(record => ({ 
            Name: record.get('n.name'),
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/trainingPlans', async (req, res) => {
    try {
        const result = await getResultByQuery('MATCH (n:TrainingPlan)<-[:IS_IMPLEMENTED_IN]-(m:EducationalProgram) RETURN n.Id, m.name, n.name;')
        const records = result.records.map(record => ({
            EducationalProgramName: record.get('m.name'),
            TrainingPlanId: record.get('n.Id'),
            TrainingPlanName: record.get('n.name')
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/TrainingPlansStats', async (req, res) => {
    try {
        const result = await getResultByQuery('MATCH (plan:TrainingPlan)<-[:IS_IMPLEMENTED_IN]-(ed:EducationalProgram)<-[:PROFILE]-(dir:Direction) RETURN plan.Id, ed.name, plan.name, plan.year, ed.form_of_study, dir.code, dir.name;')
        const records = result.records.map(record => ({ 
            TrainingPlanName: record.get('plan.name'),
            EducationalProgramName: record.get('ed.name'),
            DirectionCode: record.get('dir.code'),
            DirectionName: record.get('dir.name'),
            Year: record.get('plan.year').low,
            FormOfStudy: record.get('ed.form_of_study'),
            TrainingPlanId: record.get('plan.Id'),
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/EducationalProgramStats/:EdName', async (req, res) => {
    try {
        const result = await getResultByQuery(`MATCH (n:EducationalProgram {latin_name: "${req.params.EdName}"}) RETURN n.education_level, n.form_of_study, n.training_period;`)
        const records = result.records.map(record => ({ 
            EducationLevel: record.get('n.education_level'),
            FormOfStudy: record.get('n.form_of_study'),
            TrainingPeriod: record.get('n.training_period')
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/TrainingPlanComparison/:plan1/:plan2', async (req, res) => {
    try {
        const result = await getResultByQuery(`MATCH (n:TrainingPlan {Id: "${req.params.plan1}"})-[has1:HAS]->(dis:Discipline)<-[has2:HAS]-(m:TrainingPlan {Id: "${req.params.plan2}"}) RETURN dis.name, has1.total_labor_hours, has1.practice_hours, has1.lecture_hours, has1.laboratory_hours, has2.total_labor_hours, has2.practice_hours, has2.lecture_hours, has2.laboratory_hours;`)
        const records = result.records.map(record => ({ 
            Discipline: record.get('dis.name'),
            Plan1: {
                TotalLaborHours: record.get('has1.total_labor_hours').low,
                PracticeHours: record.get('has1.practice_hours').low,
                LectureHours: record.get('has1.lecture_hours').low,
                LaboratoryHours: record.get('has1.laboratory_hours').low,
            },
            Plan2: {
                TotalLaborHours: record.get('has2.total_labor_hours').low,
                PracticeHours: record.get('has2.practice_hours').low,
                LectureHours: record.get('has2.lecture_hours').low,
                LaboratoryHours: record.get('has2.laboratory_hours').low,
            },
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get('/CommonDisciplines/:plan1/:plan2', async (req, res) => {
    try {
        const result = await getResultByQuery(`MATCH (plan:TrainingPlan)-[:HAS]->(dis:Discipline)
        WHERE plan.Id = "${req.params.plan1}" OR plan.Id = "${req.params.plan2}"
        RETURN DISTINCT dis.name, EXISTS {
          (:TrainingPlan {Id: "${req.params.plan1}"})-[:HAS]->(:Discipline {name: dis.name})
        } AS Plan1, EXISTS {
          (:TrainingPlan {Id: "${req.params.plan2}"})-[:HAS]->(:Discipline {name: dis.name})
        } AS Plan2`)
        const records = result.records.map(record => ({ 
            DisciplineName: record.get('dis.name'),
            IsDisciplineInPlan1: record.get('Plan1'),
            IsDisciplineInPlan2: record.get('Plan2')
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put('/ChangeEducationalProgram/:ed_name', async (req, res) => {
    let body = req.body;
    const session = db.session({ 
        database: "neo4j",
        defaultAccessMode: neo4j.session.WRITE 
    });
    try {
        let queryString = ""
        if(body.EducationLevel){
            queryString += `n.education_level = "${body.EducationLevel}", `
        }
        if(body.FormOfStudy){
            queryString += `n.form_of_study = "${body.FormOfStudy}", `
        }
        if(body.TrainingPeriod){
            queryString += `n.training_period = "${body.TrainingPeriod}"`
        }
        if (queryString.slice(-2) === ", ") {
            queryString = queryString.slice(0, -2);
          }

        if(queryString !== "")
            await session.run(`MATCH (n:EducationalProgram {latin_name: "${req.params.ed_name}"}) SET ${queryString}`)
        
        res.status(200).json({ message: "OK" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
})

app.post('/CreateEducationalProgram', async (req, res) => {
    let body = req.body;
    const session = db.session({ 
        database: "neo4j",
        defaultAccessMode: neo4j.session.WRITE 
    });
    try {
        if(body.Name !== "" && body.LatinName !== "" && body.EducationLevel !== "" && body.FormOfStudy !== "" && body.TrainingPeriod){
            await session.run(`MERGE (n:EducationalProgram {name: "${body.Name}", latin_name: "${body.LatinName}", education_level: "${body.EducationLevel}", training_period: "${body.TrainingPeriod}", form_of_study: "${body.FormOfStudy}"})`)
        }
        res.status(200).json({ message: "OK" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
})

app.post('/CreateTrainingPlan', async (req, res) => {
    let body = req.body;
    
    const session = db.session({ 
        database: "neo4j",
        defaultAccessMode: neo4j.session.WRITE 
    });
    try {
        if(body.Id !== "" && body.PlanName !== "" && body.EducationalProgramName !== "" && body.Year !== ""){
            await session.run(`MATCH (m:EducationalProgram {name: "${body.EducationalProgramName}"}) MERGE (n:TrainingPlan {Id: "${body.Id}", name: "${body.PlanName}", year: ${body.Year}})<-[:IS_IMPLEMENTED_IN]-(m)`)
            if (body.Disciplines[0].Discipline){
                for (let i = 0; i < body.Disciplines.length; i++){
                    await session.run(`MATCH (plan:TrainingPlan {Id: "${body.Id}"}), (dis:Discipline {name: "${body.Disciplines[i].Discipline}"}) MERGE (plan)-[:HAS {total_labor_hours: ${body.Disciplines[i].TotalLaborHours}, practice_hours: ${body.Disciplines[i].PracticeHours}, laboratory_hours: ${body.Disciplines[i].LaboratoryHours}, lecture_hours: ${body.Disciplines[i].LectureHours}}]->(dis)`)
                }
            }
            else {
                for (let i = 0; i < body.Disciplines.length; i++){
                    await session.run(`MATCH (plan:TrainingPlan {Id: "${body.Id}"}), (dis:Discipline {name: "${body.Disciplines[i].Discipline}"}) MERGE (plan)-[:HAS]->(dis)`)
                }
            }
        }
        res.status(200).json({ message: "OK" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
})

app.get('/GraphData', async (req, res) => {
    const session = db.session({
        database: "neo4j",
        defaultAccessMode: neo4j.session.READ
    })
    session
        .run('MATCH (n)-->(m) RETURN { id: id(n), label:head(labels(n)), caption:n.name } as source, { id: id(m), label:head(labels(m)), caption:m.name } as target')
        .then(function (result) {
            const nodes = {}
            const links = result.records.map(r => {
                let source = r.get('source');source.id = source.id.toNumber();
                nodes[source.id] = source;
                let target = r.get('target');target.id = target.id.toNumber();
                nodes[target.id] = target;
                return {source:source.id,target:target.id}
            })
            const gData = { nodes: Object.values(nodes), links: links}
            res.json(gData)
        })
        .catch(function (error) {
            console.log(error);
        });
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

app.get('/getUserId', (req, res) => {
    const cur_user = login_list.find(user => user.email === req.query.email && user.password === req.query.password);
    if(cur_user) {
        res.send(cur_user)
    } else {
        
    }
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