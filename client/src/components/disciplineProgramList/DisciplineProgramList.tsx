import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../ElementLink/ElementLink";

const DisciplineProgramList = () => {
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
		<div className="DisciplineProgramList">
			<div className="container">
				<div className="content">
					<div className="DisciplineProgramList__header">
						<h2>Список образовательных программ</h2>
						<NavLink to="/discipline-program-list/edit">
							редактировать
						</NavLink>
						<NavLink to="/discipline-program-list/add">
							добавить
						</NavLink>
					</div>
					<div className="DisciplineProgramList__body">
						{/* <Search /> */}
						<div className="list">
							{data.map((program) => (
								<EducationElementLink
									to={`/discipline-program-list/${program.id}`}
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

export default DisciplineProgramList;
