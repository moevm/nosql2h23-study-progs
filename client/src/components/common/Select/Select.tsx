import React from "react";
import { DEFAULT_FILTERATION_VALUE } from "../../../constants/UI";

const Select = ({
	options,
	name,
	selectRef,
	label
}: {
	options: string[];
	name: string;
	selectRef: React.RefObject<HTMLSelectElement>;
	label: string
}) => {

	return (
		<div>
			<div className="label">{label}</div>
			<select className="select" name={name} ref={selectRef}>
				<option defaultValue="default">{DEFAULT_FILTERATION_VALUE}</option>
				{options.map((option) => (
					<option value={option} key={option}>{option}</option>
				))}
			</select>
		</div>
	);
};

export default Select;
