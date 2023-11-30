import React, { useState } from "react";
import "./TrainingPlanElement.scss";
import { ITrainingPlanListItem } from "../../interfaces/trainingPlanListItem.interface";

const TrainingPlanElement = ({
	plan,
	onChange,
}: {
	plan: ITrainingPlanListItem;
	onChange: (planId: string) => void;
}) => {
	const [checked, setChecked] = useState(false);

	const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		onChange(plan.TrainingPlanId);
	};

	return (
		<div className="TrainingPlanElement">
			<input
				type="checkbox"
				checked={checked}
				onChange={handleChangeEvent}
			/>
			<div className="content">{plan.TrainingPlanName}</div>
		</div>
	);
};

export default TrainingPlanElement;
