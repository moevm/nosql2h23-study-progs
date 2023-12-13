import React, { useState, useRef, useEffect } from "react";
import Input from '../common/Input/Input';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Combobox from "react-widgets/Combobox"
import "./addTrainingPlan.scss";
import { DocumentsAPIs } from "../../api/documents.api";
import { IEducationalProgramItem } from "../../interfaces/educationalProgramItem.interface"
import { Multiselect } from "react-widgets/cjs";


const AddTrainingPlan = () => {

	const navigate = useNavigate();
	
	const [educationalProgramList, setEducationalProgramList] = useState<IEducationalProgramItem[]>();
	const [disciplinesList, setDisciplinesList] = useState<{Name: string}[]>();

	const PlanName = useRef<HTMLInputElement>(null);
	const Year = useRef<HTMLInputElement>(null);
	const [EducationProgram, setEducationProgram] = useState("")
	const [Disciplines, setDisciplines] = useState([""])

	const updateEducationalProgramList = async () => {
		const { data, status } = await DocumentsAPIs.getAllEducationalPrograms();
		setEducationalProgramList(data);
	};

	const updateDisciplinesList = async () => {
		const { data, status } = await DocumentsAPIs.getAllDisciplines();
		setDisciplinesList(data);
	};
	
	
	useEffect(() => {
		updateEducationalProgramList();
		updateDisciplinesList();
	})

	function getRandomInt(min: number, max:number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

	const HandleAddTrainingPlan = (e: any) => {
		e.preventDefault();
		const name = PlanName.current?.value as string;
        const year = Year.current?.value as string;

		const planitem = {
			Id: getRandomInt,
			PlanName: name,
			Year: Number(year),
			EducationalProgramName: EducationProgram,
			Disciplines: Disciplines
		}
		
		DocumentsAPIs.createTrainingPlan(planitem)
		.then((res) => {
			navigate('/training-plan-list')
		})
	}
	

	return (
		
		<div className="NewTrainingPlan">
			<div className="container">
                        <form className="login-form">
                            <Input type="text" label_text="Название учебного плана" name="name" placeholder="Название" inputRef={PlanName} />
							<Input type="text" label_text="Год" name="year" placeholder="2000" inputRef={Year} />
							
							<label>Образовательная программа</label>
							<Combobox className="combo" onChange={value => setEducationProgram(value)} hideCaret name="education_level" data = {educationalProgramList?.map(a=>a.Name)} placeholder="Образоватльная программа"/>
                            
							<label>Дисциплины</label>
							<Multiselect className="multiselect" onChange={value => setDisciplines(value)} data={disciplinesList?.map(a=>a.Name)}/>
							
							<button onClick={(e) => HandleAddTrainingPlan(e)}>Добавить</button>
                            <button>Отмена</button>
                        </form>
        	</div>
		</div>
	);
};

export default AddTrainingPlan;
