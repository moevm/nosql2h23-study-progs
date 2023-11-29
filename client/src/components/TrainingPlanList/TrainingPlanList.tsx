import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";
import Select from "../common/Select/Select";
import { DocumentsAPIs } from "../../api/documents.api";

interface IFilterParam {
	filterParamName: string;
	filterParamValue: string;
}

const TrainingPlanList = () => {

	const [data, setData] = useState([
		{
			id: 1,
			name: "учебный план 1",
		},
		{
			id: 2,
			name: "учебный план 2",
		},
		{
			id: 3,
			name: "учебный план 3",
		},
		{
			id: 4,
			name: "учебный план 4",
		},
	]);

	const filterParams = useRef<IFilterParam[]>([]);

	const handleFiltering = () => {

	}

	const onSelectFilterParam = (paramName: string, paramValue: string) => {
		const filterParam = filterParams.current.find((param) => param.filterParamName === paramName)

		if(!!filterParam) {
			filterParam.filterParamValue = paramValue
		} else {

			const newFilterParam: IFilterParam = {
				filterParamName: paramName,
				filterParamValue: paramValue
			}

			filterParams.current.push(newFilterParam)
		}

		console.log(filterParams.current);
	}

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
							<Select label="направление подготовки" onChange={onSelectFilterParam} options={["1", "2", "3"]} />
						</div>
						<div className="list">
							{data.map((plan) => (
								<EducationElementLink
									key={plan.id}
									to={`training-plan-list/${plan.id}`}
								>
									{plan.name}
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
