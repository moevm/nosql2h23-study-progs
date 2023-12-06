import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import EducationElementLink from "../educationElementLink/EducationElementLink";
import { DocumentsAPIs } from "../../api/documents.api";
import { IEducationalProgramItem } from "../../interfaces/educationalProgramItem.interface";

const EducationProgramList = () => {
	const [educationalProgramList, setEducationalProgramList] =
		useState<IEducationalProgramItem[]>();

	const updateEducationalProgramList = async () => {
		const { data, status } = await DocumentsAPIs.getAllEducationalPrograms();
		setEducationalProgramList(data);
		console.log(data);	
	};

	/*const getEducationalProgramStats = async () => {
		return await DocumentsAPIs.getEducationalProgramStats("math_support_for_software_and_information_systems");
	}*/

	useEffect(() => {
		updateEducationalProgramList();
		//getEducationalProgramStats().then((res) => console.log(res.data));
	}, []);

	return (
		<div className="educationProgramList">
			<div className="container">
				<div className="content">
					<div className="educationProgramList__header">
						<h2>Список образовательных программ</h2>
						<NavLink to="/edit">редактировать</NavLink>
					</div>
					<div className="educationProgramList__body">
						{/* <Search buttons={<button>filter</button>} /> */}
						<div className="list">
							{educationalProgramList?.map((program) => (
								<EducationElementLink
									key={program.LatinName}
									to={`education-program-list/${program.LatinName}`}
								>
									{program.Name}
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
