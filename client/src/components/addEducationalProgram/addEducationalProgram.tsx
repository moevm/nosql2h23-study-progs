import React, { useState, useRef, useEffect } from "react";
import Input from '../common/Input/Input';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Combobox from "react-widgets/Combobox"
import "./addEducationalProgram.scss";
import { DocumentsAPIs } from "../../api/documents.api";


const AddEducationalProgram = () => {

	const navigate = useNavigate();
	const [EducationLevel, setEducationLevel] = useState("")
	const [TrainingPeriod, setTrainingPeriod] = useState("")
	const [FormOfStudy, setFormOfStudy] = useState("")

	const EDName = useRef<HTMLInputElement>(null);
	const LatinName = useRef<HTMLInputElement>(null);

	const HandleAddProgram = (e: any) => {
		e.preventDefault();
		const name = EDName.current?.value as string;
        const latinName = LatinName.current?.value as string;

		const planED = {
			Name: name,
			LatinName: latinName,
			EducationLevel: EducationLevel,
			TrainingPeriod: TrainingPeriod,
			FormOfStudy: FormOfStudy
		}
		DocumentsAPIs.createEducationalProgram(planED)
		.then((res) => {
			navigate('/education-program-list')
		})
	}
	

	return (
		
		<div className="NewEducationalProgram">
			<div className="container">
                        <form className="login-form">
                            <Input type="text" label_text="Название образовательной программы" name="name" placeholder="Название" inputRef={EDName} />
							<Input type="text" label_text="Название образовательной программы на латинице (через нижнее подчеркивание)" name="latin_name" placeholder="latin_name" inputRef={LatinName} />
							<label>Уровень образования</label>
							<Combobox className="combo" onChange={value => setEducationLevel(value)} hideCaret name="education_level" data={["Высшее образование - бакалавриат", 
																	"Высшее образование - специалитет", 
																	"Высшее образование - магистратура", 
																	"Высшее образование - подготовка кадров высшей квалификации", 
																	"Дополнительное профессиональное образование - повышение квалификации", 
																	"Дополнительное профессиональное образование - профессиональная переподготовка"]} placeholder="Уровень образования"/>
                            <label>Срок обучения</label>
							<Combobox className="combo" hideCaret onChange={value => setTrainingPeriod(value)} name="training_period" data={["1", "2", "3", "4", "5", "6"]} placeholder="Срок обучения"/>
							<label>Форма обучения</label>
							<Combobox className="combo" hideCaret onChange={value => setFormOfStudy(value)} name="form_of_study" data={["Очная", "Заочная", "Очно-заочная"]} placeholder="Форма обучения"/>
							<button onClick={(e) => HandleAddProgram(e)}>Добавить</button>
                            <button>Отмена</button>
                        </form>
        	</div>
		</div>
	);
};

export default AddEducationalProgram;
