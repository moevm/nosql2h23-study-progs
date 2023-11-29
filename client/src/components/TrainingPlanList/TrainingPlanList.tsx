import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";

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
						<div className="list">
							{data.map((program) => (
								<EducationElementLink
									to={`training-plan-list/${program.id}`}
								>
									{program.name}
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
