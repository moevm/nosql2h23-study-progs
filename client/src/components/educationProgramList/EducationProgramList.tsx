import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";

const EducationProgramList = () => {
	const [data, setData] = useState([
		{
			id: 1,
			name: "01.03.02 Математическое обеспечение программно-информационных систем",
		},
		{
			id: 2,
			name: "01.03.02 Математическое обеспечение программно-информационных систем",
		},
		{
			id: 3,
			name: "01.03.02 Математическое обеспечение программно-информационных систем",
		},
		{
			id: 4,
			name: "01.03.02 Математическое обеспечение программно-информационных систем",
		},
	]);

	return (
		<div className="educationProgramList">
			<div className="container">
				<div className="content">
					<div className="educationProgramList__header">
						<h2>Список образовательных программ</h2>
						<NavLink to="/edit">редактировать</NavLink>
					</div>
					<div className="educationProgramList__body">
						<Search buttons={<button>filter</button>} />
						<div className="list">
							{data.map((program) => (
								<EducationElementLink
									to={`education-program-list/${program.id}`}
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

export default EducationProgramList;
