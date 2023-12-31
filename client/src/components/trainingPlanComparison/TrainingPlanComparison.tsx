import React, { useState, useRef, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import TrainingPlanElement from "../trainingPlanElement/TrainingPlanElement";
import Button from "../common/Button/Button";
import { DocumentsAPIs } from "../../api/documents.api";
import { ITrainingPlanListItem } from "../../interfaces/trainingPlanListItem.interface";


const COUNT_PLANS_TO_COMPARE = 2;

const TrainingPlanComparison = () => {
	const [trainingPlanList, setTrainingPlanList] = useState<
		ITrainingPlanListItem[]
	>([]);

	const updateTrainingPlanList = async () => {
		const { data, status } = await DocumentsAPIs.getAllTrainingPlans();
		setTrainingPlanList(data);
	};

	useEffect(() => {
		updateTrainingPlanList();
	}, []);

	const navigate = useNavigate();

	const checkedTrainingPlans = useRef<string[]>([]);

	const updateCheckedTrainingPlans = (value: string) => {
		const index = checkedTrainingPlans.current.findIndex(
			(element) => element === value
		);

		if (index === -1) {
			checkedTrainingPlans.current.push(value);
		} else {
			checkedTrainingPlans.current.splice(index, 1);
		}

		console.log(checkedTrainingPlans.current);
	};

	const isTrainingPlansChecksCountEnough = () =>
		checkedTrainingPlans.current.length === COUNT_PLANS_TO_COMPARE;

	const onTrainingPlanChecked = (trainingPlanId: string) => {

		updateCheckedTrainingPlans(trainingPlanId);

		if (isTrainingPlansChecksCountEnough()) {
			analyseButtonApiRef.current.enable();
		} else {
			analyseButtonApiRef.current.disable();
		}
	};

	const onAnalyseClicked = () => {
		console.log(checkedTrainingPlans.current);

		navigate({
			pathname: "/training-plan-comparison-result",
			search: createSearchParams({
				plan1: checkedTrainingPlans.current[0],
				plan2: checkedTrainingPlans.current[1],
			}).toString(),
		});
	};

	const analyseButtonApiRef = useRef<any>(null);

	return (
		<div className="TrainingPlanComparison">
			<div className="container">
				<div className="content">
					<div className="TrainingPlanComparison__header">
						<h2>Сравнение учебных планов</h2>
					</div>
					<div className="TrainingPlanComparison__body">
						<div className="list">
							{trainingPlanList.map((plan) => (
								<TrainingPlanElement
									key={plan.TrainingPlanId}
									plan={plan}
									onChange={onTrainingPlanChecked}
								/>
							))}
						</div>
						<Button
							text="Анализ"
							onClick={onAnalyseClicked}
							apiRef={analyseButtonApiRef}
							isDisabled={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainingPlanComparison;
