import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";
import { DocumentsAPIs } from "../../api/documents.api";

const EducationProgramList = () => {

	const [data, setData] = useState([]);

	const getEducationalProgramList = async () => {
		return await DocumentsAPIs.getAllEducationalPrograms();
	}

	useEffect(() => {
		getEducationalProgramList().then((res) => console.log(res.data));
	}, [])

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
							{/* {data.map((program) => (
								<EducationElementLink
									to={`education-program-list/${program.id}`}
								>
									{program.name}
								</EducationElementLink>
							))} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EducationProgramList;
