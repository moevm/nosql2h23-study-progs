import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import RadioButton from "../common/RadioButton/RadioButton";
import { useSearchParams } from "react-router-dom";

const TrainingPlanComporisonResult = () => {
	const columns: GridColDef[] = [
		{ field: "discipline", headerName: "Дисциплина", width: 150 },
		{ field: "plan1", headerName: "План 1", width: 150 },
		{ field: "plan2", headerName: "План 2", width: 150 },
	];

	let [searchParams, setSearchParams] = useSearchParams();

	const [data, setData] = useState([

	]);

	useEffect(() => {
		const plan1 = searchParams.get("plan1");
		const plan2 = searchParams.get("plan2");
		
		
	}, [])

	

	const rows: GridRowsProp = [
		{
			id: 1,
			discipline: "Философия",
			plan1: "34 часов",
			plan2: "17 часов",
		},
		{
			id: 3,
			discipline: "Компьютерная графика",
			plan1: "34 часов",
			plan2: "17 часов",
		},
		{
			id: 2,
			discipline: "Математика",
			plan1: "34 часов",
			plan2: "17 часов",
		},
	];

	const comparisonParamsNames = ["лекции", "практики", "кр"];

	// const [selectedParam, setSelectedParam] = useState(comparisonParamsNames[0]);

	const handleComparisonParamChange = () => {

	}

	return (
		<div className="TrainingPlanComporisonResult">
			<div className="comparisonParams">
				{comparisonParamsNames.map((name) => (
					<RadioButton
						buttonName="comparisonParams"
						label={name}
						key={name}
						onChange={handleComparisonParamChange}
					/>
				))}
			</div>
			<div className="result">
				<DataGrid rows={rows} columns={columns} />
			</div>
		</div>
	);
};

export default TrainingPlanComporisonResult;
