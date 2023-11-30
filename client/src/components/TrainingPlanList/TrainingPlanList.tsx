import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";
import Select from "../common/Select/Select";
import { DocumentsAPIs } from "../../api/documents.api";
import { ITrainingPlanListItem } from "../../interfaces/trainingPlanListItem.interface";
import { ITrainingPlanStatItem } from "../../interfaces/ITrainingPlanStatItem.interface";
import Button from "../common/Button/Button";

interface IFilterParam {
	filterParamName: string;
	filterParamValue: string;
}

const TrainingPlanList = () => {
	const [trainingPlanList, setTrainingPlanList] =
		useState<ITrainingPlanStatItem[]>();

	const [filteredData, setFilteredData] = useState<ITrainingPlanStatItem[]>();

	const updateTrainingPlanList = async () => {
		const { data, status } = await DocumentsAPIs.getTrainingPlanStats();
		setTrainingPlanList(data);
		setFilteredData(data);
		console.log(data)
	};



	useEffect(() => {
		updateTrainingPlanList();
	}, []);

	const filterParams = useRef<IFilterParam[]>([]);

	const handleFiltering = () => {
		console.log(filterParams.current);

		const result = trainingPlanList?.filter((trainingPlan: any) => {

			return trainingPlan["Year"]?.toString() === filterParams.current[0].filterParamValue
			
			
			// const isCorrect = filterParams.current.reduce((acc, param) => {

			// 	console.log(trainingPlan, param.filterParamName, param.filterParamValue)
			// 	if(trainingPlan[param.filterParamName]?.toString() !== param.filterParamValue) {
			// 		return acc && false;
			// 	} 
			// 	return acc && true;
			// }, true);
			// console.log(isCorrect);

			// return isCorrect;
		})

		setFilteredData(result);
	};

	const onSelectFilterParam = (paramName: string, paramValue: string) => {
		const filterParam = filterParams.current.find(
			(param) => param.filterParamName === paramName
		);

		if (!!filterParam) {
			filterParam.filterParamValue = paramValue;
		} else {
			const newFilterParam: IFilterParam = {
				filterParamName: paramName,
				filterParamValue: paramValue,
			};

			filterParams.current.push(newFilterParam);
		}

		console.log(filterParams.current);
	};

	return (
		<div className="TrainingPlanList">
			<div className="container">
				<div className="content">
					<div className="TrainingPlanList__header">
						<h2>Список образовательных программ</h2>
						<NavLink to="/training-plan-list/edit">
							редактировать
						</NavLink>
					</div>
					<div className="TrainingPlanList__body">
						<Search buttons={<button>filter</button>} />
						<div className="filteringParams">
							{/* <Select
								label="направление подготовки"
								name="DirectionName"
								onChange={onSelectFilterParam}
								options={["Прикладная математика и информатика", "Приборостроение", "Биотехнические системы и технологии"]}
							/> */}
							<Select
								label="год"
								name="Year"
								onChange={onSelectFilterParam}
								options={["2020", "2021", "2022", "2023"]}
							/>
							{/* <Select
								label="Форма обучения"
								name="FormOfStudy"
								onChange={onSelectFilterParam}
								options={["Очная", "Очно-заочная"]}
							/> */}
							<Button onClick={handleFiltering} text="применить" />
						</div>
						<div className="list"> 
						{
							filteredData?.map((plan) => (
								<EducationElementLink
									key={plan.TrainingPlanName}
									to={`training-plan-list/${plan.TrainingPlanName}`}
								>
									{plan.TrainingPlanName}
								</EducationElementLink>
							))
						}
							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainingPlanList;
