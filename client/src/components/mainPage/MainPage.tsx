import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Menu from "../menu/Menu";
import { useAuth } from "../../contexts/AuthContext";
import "./MainPage.scss";
import Nav from "../nav/nav";
import EducationProgramList from "../educationProgramList/EducationProgramList";
import TrainingPlanComparison from "../trainingPlanComparison/TrainingPlanComparison";
import DisciplineProgramList from "../disciplineProgramList/DisciplineProgramList";
import TrainingPlanList from "../TrainingPlanList/TrainingPlanList";
import TrainingPlanComporisonResult from "../trainingPlanComporisonResult/TrainingPlanComporisonResult";
import ExportButton from "../exportButton/ExportButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import TrainingPlanView from "../TrainingPlanView/TrainingPlanView";
import TrainingPlanEdit from "../trainingPlanEdit/TrainingPlanEdit";
import EducationalProgramView from "../educationalProgramView/EducationalProgramView";
import EducationalProgramEdit from "../educationalProgramEdit/EducationalProgramEdit";

const MainPage = () => {
	return (
		<div>
			<Menu>
				<div className="menuButtons">
					<ExportButton />
					<LogoutButton />
				</div>
			</Menu>
			<Nav />
			<div className="page_container">
				<Routes>
				<	Route
						path="/education-program-list"
						element={<EducationProgramList />}
					/>
					<Route
						path="/education-program-list/:educationProgram"
						element={<EducationalProgramView />}
					/>
					<Route
						path="/education-program-list/:educationProgram/edit"
						element={<EducationalProgramEdit />}
					/>
					<Route
						path="/training-plan-comparison"
						element={<TrainingPlanComparison />}
					/>
					<Route
						path="/training-plan-comparison-result"
						element={<TrainingPlanComporisonResult />}
					/>
					<Route
						path="/discipline-programs-list"
						element={<DisciplineProgramList />}
					/>
					<Route
						path="/training-plan-list"
						element={<TrainingPlanList />}
					/>
					<Route
						path="/training-plan-list/:trainingPlan"
						element={<TrainingPlanView />}
					/>
					<Route
						path="/training-plan-list/:trainingPlan/edit"
						element={<TrainingPlanEdit />}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default MainPage;
