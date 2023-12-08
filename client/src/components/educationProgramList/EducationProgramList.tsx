import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Search from "../search/Search";
import ElementLink from "../ElementLink/ElementLink";
import { DocumentsAPIs } from "../../api/documents.api";
import { IEducationalProgramItem } from "../../interfaces/educationalProgramItem.interface";

const MemoElementLink = React.memo(ElementLink);

const EducationProgramList = () => {
	const [educationalProgramList, setEducationalProgramList] =
		useState<IEducationalProgramItem[]>([]);

	const [programsThatMatchSearchQuery, setProgramsThatMatchSearchQuery] = useState<IEducationalProgramItem[]>([]);

	const updateEducationalProgramList = async () => {
		const { data } = await DocumentsAPIs.getAllEducationalPrograms();
		setEducationalProgramList(data);
		setProgramsThatMatchSearchQuery(data);
		console.log(data);	
	};

	const searchPrograms = (valueToSearch: string) => {
		const result = educationalProgramList.filter((program) => {
			return (
				program.Name.toLowerCase().indexOf(
					valueToSearch.toLowerCase()
				) !== -1
			);
		});

		setProgramsThatMatchSearchQuery(result);
	}


	useEffect(() => {
		updateEducationalProgramList();
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
						<Search onSearchPerform={(query) => searchPrograms(query)} />
						<div className="list">
							{programsThatMatchSearchQuery.map((program) => (
								<MemoElementLink
									key={program.LatinName}
									to={`education-program-list/${program.LatinName}`}
								>
									{program.Name}
								</MemoElementLink>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EducationProgramList;
