import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TrainingPlanElement from "../trainingPlanElement/TrainingPlanElement";
import Button from "../common/Button/Button";

const TrainingPlanComparison = () => {
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

	const navigate = useNavigate();

	const checkedTrainingPlans = useRef<string[]>([]);

	const saveCheckedTrainingPlans = (value: string) => {
		const index = checkedTrainingPlans.current.findIndex(
			(element) => element === value
		);

		if (index === -1) {
			checkedTrainingPlans.current.push(value);
		} else {
			checkedTrainingPlans.current.splice(index, 1);
		}
	};

	const onAnalyseClicked = () => {
		console.log(checkedTrainingPlans.current)
		navigate('/training-plan-comparison-result');	
	}

	return (
		<div className="TrainingPlanComparison">
			<div className="container">
				<div className="content">
					<div className="TrainingPlanComparison__header">
						<h2>Сравнение учебных планов</h2>
					</div>
					<div className="TrainingPlanComparison__body">
						<div className="list">
							{data.map((plan) => (
								<TrainingPlanElement key={plan.id} plan={plan} onChange={saveCheckedTrainingPlans} />
									
							))}
						</div>
						<Button text="Анализ" onClick={onAnalyseClicked} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainingPlanComparison;
