import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import RadioButton from "../common/RadioButton/RadioButton";

const TrainingPlanComporisonResult = () => {
	const columns: GridColDef[] = [
		{ field: "discipline", headerName: "Дисциплина", width: 150 },
		{ field: "plan1", headerName: "План 1", width: 150 },
		{ field: "plan2", headerName: "План 2", width: 150 },
	];

	const [data, setData] = useState([

	]);

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
