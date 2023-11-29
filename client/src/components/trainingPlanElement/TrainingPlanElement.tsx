import React, { useState } from "react";
import './TrainingPlanElement.scss';


const TrainingPlanElement = ({ plan, onChange }: any) => {

    const [checked, setChecked] = useState(false);

    const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        onChange(plan.name)
    }

	return (
		<div className="TrainingPlanElement">  
			<input type="checkbox" checked={checked} onChange={handleChangeEvent}/>
			<div className="content">{plan.name}</div>
		</div>
	);
};

export default TrainingPlanElement;
