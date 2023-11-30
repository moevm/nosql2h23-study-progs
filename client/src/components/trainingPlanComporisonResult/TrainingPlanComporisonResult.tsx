import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import RadioButton from "../common/RadioButton/RadioButton";
import { useSearchParams } from "react-router-dom";
import { ITrainingPlanComparison } from "../../interfaces/ITrainingPlanComparison.interface";
import { DocumentsAPIs } from "../../api/documents.api";

const TrainingPlanComporisonResult = () => {
	let [searchParams, setSearchParams] = useSearchParams();

	const [comparisonResult, setComparisonResult] = useState<
		ITrainingPlanComparison[]
	>([]);

	const plan1_id = searchParams.get("plan1") as string;
	const plan2_id = searchParams.get("plan2") as string;

	const updateComparisonResult = async () => {
		const { data } = await DocumentsAPIs.getPlanComparison(
			plan1_id,
			plan2_id
		);

		setComparisonResult(data);
	};

	const createRowDataByParam = (param: string = "") => {
		return comparisonResult.map((disciplineInfoOfTwoPlans) => {
			return {
				id: disciplineInfoOfTwoPlans.Discipline,
				discipline: disciplineInfoOfTwoPlans.Discipline,
				plan1: disciplineInfoOfTwoPlans.Plan1["TotalLaborHours"],
				plan2: disciplineInfoOfTwoPlans.Plan2["TotalLaborHours"],
			};
		});
	};

	useEffect(() => {
		updateComparisonResult();
	}, []);

	const columns: GridColDef[] = [
		{ field: "discipline", headerName: "Дисциплина", width: 150 },
		{ field: "plan1", headerName: plan1_id, width: 150 },
		{ field: "plan2", headerName: plan2_id, width: 150 },
	];


	// const comparisonParamsNames = ["лекции", "практики", "кр"];

	const handleComparisonParamChange = () => {};

	return (
		<div className="TrainingPlanComporisonResult">
			{/* <div className="comparisonParams">
				{comparisonParamsNames.map((name) => (
					<RadioButton
						buttonName="comparisonParams"
						label={name}
						key={name}
						onChange={handleComparisonParamChange}
					/>
				))}
			</div> */}
			<div className="result">
				<DataGrid rows={createRowDataByParam()} columns={columns} />
			</div>
		</div>
	);
};

export default TrainingPlanComporisonResult;
