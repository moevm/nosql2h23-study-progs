import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";
import Select from "../common/Select/Select";
import { DocumentsAPIs } from "../../api/documents.api";
import { ITrainingPlanListItem } from "../../interfaces/trainingPlanListItem.interface";

interface IFilterParam {
	filterParamName: string;
	filterParamValue: string;
}

const TrainingPlanList = () => {
	const [trainingPlanList, setTrainingPlanList] =
		useState<ITrainingPlanListItem[]>();

	const updateTrainingPlanList = async () => {
		const { data, status } = await DocumentsAPIs.getAllTrainingPlans();
		setTrainingPlanList(data);
	};

	// const getCommonDis = async () => {
	// 	return await DocumentsAPIs.getCommonAndDifferentDisciplines('338-20', '308-23');
	// }

	useEffect(() => {
		updateTrainingPlanList();
	}, []);

	const filterParams = useRef<IFilterParam[]>([]);

	const handleFiltering = () => {};

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
							<Select
								label="направление подготовки"
								onChange={onSelectFilterParam}
								options={["1", "2", "3"]}
							/>
						</div>
						<div className="list"> 
						{
							trainingPlanList?.map((plan) => (
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
