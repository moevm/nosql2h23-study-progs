import express from 'express';
import neo4j from "neo4j-driver"
import cors from 'cors';


const app = express()
const db = neo4j.driver("neo4j+s://c6436e2d.databases.neo4j.io", neo4j.auth.basic('neo4j', 'rFEUHES8XeDv6A-fDZtXIFO4hbMdwauqbGkpfLq8UJg'))


app.use(cors())

app.listen(4200)


app.get('/EducationalPrograms', async (req, res) => {
    const session = db.session();
    try {
        const result = await getResultByQuery('MATCH (n:EducationalProgram) RETURN n.name, n.latin_name;')
        const records = result.records.map(record => ({ 
            Name: record.get('n.name'),
            LatinName: record.get('n.latin_name')
        }));
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await session.close();
    }
})

app.get('/trainingPlans', async (req, res) => {
    const session = db.session();
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
    } finally {
        await session.close();
    }
})

app.get('/TrainingPlansStats', async (req, res) => {
    const session = db.session();
    try {
        const result = await getResultByQuery('MATCH (plan:TrainingPlan)<-[:IS_IMPLEMENTED_IN]-(ed:EducationalProgram)<-[:PROFILE]-(dir:Direction) RETURN plan.Id ed.name, plan.name, plan.year, ed.form_of_study, dir.code, dir.name;')
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
    } finally {
        await session.close();
    }
})

app.get('/EducationalProgramStats/:EdName', async (req, res) => {
    const session = db.session();
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
    } finally {
        await session.close();
    }
})

app.get('/TrainingPlanComparison/:plan1/:plan2', async (req, res) => {
    const session = db.session();
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
    } finally {
        await session.close();
    }
})

app.get('/CommonDisciplines/:plan1/:plan2', async (req, res) => {
    const session = db.session();
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
    } finally {
        await session.close();
    }
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