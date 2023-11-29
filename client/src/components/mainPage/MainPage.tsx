import React, { useEffect } from "react";
import {
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import Menu from "../menu/Menu";
import { useAuth } from "../../contexts/AuthContext";
import './MainPage.scss';
import Nav from "../nav/nav";
import EducationProgramList from "../educationProgramList/EducationProgramList";
import TrainingPlanComparison from "../trainingPlanComparison/TrainingPlanComparison";
import DisciplineProgramList from "../disciplineProgramList/DisciplineProgramList";
import TrainingPlanList from "../TrainingPlanList/TrainingPlanList";
import TrainingPlanComporisonResult from "../trainingPlanComporisonResult/TrainingPlanComporisonResult";


const MainPage = () => {
	const { setAuthed } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		setAuthed(false);
		navigate("/");
	};

	return (
		<div>
			<Menu>
				<div className="menuButtons">
					<button onClick={() => console.log("экспорт")}>Экспорт бд</button>
					<button onClick={handleLogout}>Выйти</button>
				</div>
			</Menu>
			<Nav/>
			<div className="page_container">
				<Routes>
					<Route path="/education-program-list" element={<EducationProgramList />} />
					<Route path="/training-plan-comparison" element={<TrainingPlanComparison />} />
					<Route path="/discipline-programs-list" element={<DisciplineProgramList />} />
					<Route path="/training-plan-list" element={<TrainingPlanList />} />
					<Route path="/training-plan-comparison-result" element={<TrainingPlanComporisonResult />} />
				
				</Routes>
			</div>
		</div>
	);
};

export default MainPage;
