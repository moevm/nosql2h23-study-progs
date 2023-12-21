import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import { DocumentsAPIs } from "../../api/documents.api";
import { ITrainingPlanStatItem } from "../../interfaces/ITrainingPlanStatItem.interface";
import FilterModal from "../filterModal/FilterModal";
import { IFilterParam } from "../../interfaces/IFilterParam.interface";
import ElementLink from "../ElementLink/ElementLink";

const MemoElementLink = React.memo(ElementLink);

const TrainingPlanList = () => {
	const [trainingPlanList, setTrainingPlanList] = useState<
		ITrainingPlanStatItem[]
	>([]);

	const [filterParams, setFilteredParams] = useState<IFilterParam[]>([]);

	const [searchQuery, setSearchedQuery] = useState("");
	
	const updateTrainingPlanList = async () => {
		const { data, status } = await DocumentsAPIs.getTrainingPlanStats();
		setTrainingPlanList(data);
		console.log(data);
	};

	useEffect(() => {
		updateTrainingPlanList();
	}, []);

	const getFilteredData = () => {
		const plansThatMatchSearchQuery = searchTrainingPlans(trainingPlanList, searchQuery);
		const plansThatMatchFilterParams = filterData(plansThatMatchSearchQuery, filterParams);

		return plansThatMatchFilterParams;
	}

	const searchTrainingPlans = (trainingPlans: ITrainingPlanStatItem[], valueToSearch: string) => {
		const result = trainingPlans.filter((trainingPlan) => {
			return (
				trainingPlan.TrainingPlanName.toLowerCase().indexOf(
					valueToSearch.toLowerCase()
				) !== -1
			);
		});

		return result;
	};

	const filterData = (trainingPlans: ITrainingPlanStatItem[], filterParams: IFilterParam[]) => {
		
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

		const result = trainingPlans?.filter(
			(trainingPlan: ITrainingPlanStatItem) =>
				isTrainingPlanMatchFilterParams(trainingPlan, filterParams)
		);

		return result;
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
						<Search onSearchPerform={(value) => setSearchedQuery(value)} />
						<FilterModal
							onFilterSubmit={(params) => setFilteredParams(params)}
							onFilterReset={() => setFilteredParams([])}
						/>
						<div className="list">
							{getFilteredData().map((plan) => (
								<MemoElementLink
									key={plan.TrainingPlanName}
									to={`training-plan-list/${plan.TrainingPlanName}`}
								>
									{`${plan.TrainingPlanName} ${plan.FormOfStudy} ${plan.DirectionName} ${plan.Year}`}
								</MemoElementLink>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainingPlanList;
