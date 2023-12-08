import React, { useState, useCallback, useEffect } from "react";
import RadioButton from "../common/RadioButton/RadioButton";
import { INITIAL_COMPARISON_PARAM } from "../../constants/UI";

const MemoRadioButton = React.memo(RadioButton);

const ComparisonParamsModal = ({ onChange }: { onChange: (value: string) => void }) => {
	const comparisonParams = [
		{ label: "Общая нагрузка", value: "TotalLaborHours" },
		{ label: "Часы на практику", value: "PracticeHours" },
		{ label: "Часы на лекции", value: "LectureHours" },
		{ label: "Часы на лабораторные работы", value: "LaboratoryHours" },
	];

	const handleRadioButtonChange = useCallback((value: string) => {
		console.log(value);
		setCheckedValue(value);
        onChange(value);
	}, []);

	const [checkedValue, setCheckedValue] = useState<string>(
		INITIAL_COMPARISON_PARAM
	);

    useEffect(() => {
      console.log("rereder")
    })

    useEffect(() => console.log('initial param'), [])
    

	return (
		<div className="ComparisonParamsModal">
			{comparisonParams.map((comparisonParam) => (
				<MemoRadioButton
					isChecked={checkedValue === comparisonParam.value}
					label={comparisonParam.label}
					buttonName="comparisonParam"
					value={comparisonParam.value}
					onChange={handleRadioButtonChange}
					key={comparisonParam.value}
				/>
			))}
		</div>
	);
};

export default ComparisonParamsModal;
