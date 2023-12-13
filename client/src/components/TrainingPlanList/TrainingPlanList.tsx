import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";
import Select from "../common/Select/Select";
import { DocumentsAPIs } from "../../api/documents.api";
import { ITrainingPlanListItem } from "../../interfaces/trainingPlanListItem.interface";
import { ITrainingPlanStatItem } from "../../interfaces/ITrainingPlanStatItem.interface";
import { IEducationalProgramStat } from "../../interfaces/EducationalProgramStat.interface";
import { IEducationalProgramItem } from "../../interfaces/educationalProgramItem.interface";
import Button from "../common/Button/Button";
import FilterModal from "../filterModal/FilterModal";
import { IFilterParam } from "../../interfaces/IFilterParam.interface";

const TrainingPlanList = () => {
	const [trainingPlanList, setTrainingPlanList] = useState<
		ITrainingPlanStatItem[]
	>([]);

	const [filteredData, setFilteredData] = useState<ITrainingPlanStatItem[]>();

	/*const addPlan = async () => {
		const planitem = {
			Id: "123",
			PlanName: "AAA",
			Year: 2010,
			EducationalProgramName: "acoustic_devices_and_systems",
			Disciplines: [
				{
					Discipline: "Алгоритмы Вычислительных Операций",
					TotalLaborHours: 1,
        			PracticeHours: 1,
        			LectureHours: 1,
        			LaboratoryHours: 1
				},
				{
					Discipline: "Биофизика",
					TotalLaborHours: 2,
        			PracticeHours: 2,
        			LectureHours: 2,
        			LaboratoryHours: 2
				},
				]
		}
		await DocumentsAPIs.createTrainingPlan(planitem);
	}*/

	const updateTrainingPlanList = async () => {
		const { data, status } = await DocumentsAPIs.getTrainingPlanStats();
		setTrainingPlanList(data);
		setFilteredData(data);
		console.log(data);
	};

	useEffect(() => {
		updateTrainingPlanList();
	}, []);

	const filterData = (filterParams: IFilterParam[]) => {

		const isTrainingPlanMatchFilterParams = (
			trainingPlan: ITrainingPlanStatItem,
			filterParams: IFilterParam[]
		): boolean => {
			for (let i = 0; i < filterParams.length; i++) {
				type objectKey = keyof typeof trainingPlan;

				const paramName = filterParams[i].filterParamName as objectKey;
				const paramValue = filterParams[i].filterParamValue;

				if (trainingPlan[paramName]?.toString() !== paramValue) {
					return false;
				}
			}

			return true;
		};

		const result = trainingPlanList?.filter(
			(trainingPlan: ITrainingPlanStatItem) =>
				isTrainingPlanMatchFilterParams(trainingPlan, filterParams)
		);

		setFilteredData(result);
	};

	const resetData = () => {
		setFilteredData([...trainingPlanList]);
	};

	return (
		<div className="TrainingPlanList">
			<div className="container">
				<div className="content">
					<div className="TrainingPlanList__header">
						<h2>Список образовательных программ</h2>
						<NavLink to="/training-plan-list/edit">
							редактировать
						</NavLink><br></br>
						<NavLink to="/addTrainingPlan">добавить</NavLink>
					</div>
					<div className="TrainingPlanList__body">
						<Search buttons={<button>filter</button>} />
						<FilterModal
							onFilterSubmit={filterData}
							onFilterReset={resetData}
						/>
						<div className="list">
							{filteredData?.map((plan) => (
								<EducationElementLink
									key={plan.TrainingPlanName}
									to={`training-plan-list/${plan.TrainingPlanName}`}
								>
									{`${plan.TrainingPlanName} ${plan.FormOfStudy} ${plan.DirectionName} ${plan.Year}`}
								</EducationElementLink>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainingPlanList;
