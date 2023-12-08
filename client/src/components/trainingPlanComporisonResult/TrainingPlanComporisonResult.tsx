import { GridColDef, DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ITrainingPlanComparison } from "../../interfaces/ITrainingPlanComparison.interface";
import { DocumentsAPIs } from "../../api/documents.api";
import "./TrainingPlanComporisonResult.scss";
import ComparisonParamsModal from "../comparisonParamsModal/ComparisonParamsModal";
import { INITIAL_COMPARISON_PARAM } from "../../constants/UI";

const TrainingPlanComporisonResult = () => {
	let [searchParams, setSearchParams] = useSearchParams();

	const [comparisonResult, setComparisonResult] = useState<
		ITrainingPlanComparison[]
	>([]);

	const [comparisonParam, setComparisonParam] = useState(
		INITIAL_COMPARISON_PARAM
	);

	const plan1_id = searchParams.get("plan1") as string;
	const plan2_id = searchParams.get("plan2") as string;

	const updateComparisonResult = async () => {
		const { data } = await DocumentsAPIs.getPlanComparison(
			plan1_id,
			plan2_id
		);

		setComparisonResult(data);
	};

	const getfilteredDataByComparisonParam = (param: string) => {
		return comparisonResult.map((disciplineInfoOfTwoPlans) => {
			type objectKey = keyof typeof disciplineInfoOfTwoPlans.Plan1;
			const comparisonParam = param as objectKey;

			return {
				id: disciplineInfoOfTwoPlans.Discipline,
				discipline: disciplineInfoOfTwoPlans.Discipline,
				plan1: disciplineInfoOfTwoPlans.Plan1[comparisonParam],
				plan2: disciplineInfoOfTwoPlans.Plan2[comparisonParam],
			};
		});
	};

	useEffect(() => {
		updateComparisonResult();
	}, []);

	useEffect(() => console.log(comparisonResult))

	const columns: GridColDef[] = [
		{ field: "discipline", headerName: "Дисциплина", width: 150 },
		{ field: "plan1", headerName: plan1_id, width: 150 },
		{ field: "plan2", headerName: plan2_id, width: 150 },
	];

	const handleComparisonParamChange = (newParamValue: string) => {
		setComparisonParam(newParamValue);
	};

	return (
		<div className="TrainingPlanComporisonResult">
			<ComparisonParamsModal onChange={handleComparisonParamChange} />
			<div className="result">
				<DataGrid
					rows={getfilteredDataByComparisonParam(comparisonParam)}
					columns={columns}
				/>
			</div>
		</div>
	);
};

export default TrainingPlanComporisonResult;
