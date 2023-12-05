import React, { useEffect, useRef } from "react";
import { IFilterParam } from "../../interfaces/IFilterParam.interface";
import Select from "../common/Select/Select";
import Button from "../common/Button/Button";
import { DEFAULT_FILTERATION_VALUE } from "../../constants/UI";

const FilterModal = ({
	onFilterSubmit,
	onFilterReset,
}: {
	onFilterSubmit: (params: IFilterParam[]) => void;
	onFilterReset: () => void;
}) => {
	useEffect(() => {
		console.log("rerender");
	});

	const filterParams = useRef<IFilterParam[]>([]);


	const getFilterParams = () => {

		filterParams.current = [];

		for(let i = 0; i < selectRefs.current.length; i++) {
			const currentSelectRef = selectRefs.current[i];

			console.log(currentSelectRef.current?.value, currentSelectRef.current?.name);
			if(currentSelectRef.current?.value !== "Выберите пункт") { 
				const newFilterParam: IFilterParam = {
					filterParamName: currentSelectRef.current?.name as string,
					filterParamValue: currentSelectRef.current?.value as string,
				};
	
				filterParams.current.push(newFilterParam);
			}
		}

		return filterParams.current;
	}

	const resetFilter = () => {
		filterParams.current = [];

		selectRefs.current.forEach(ref => {
			if(ref.current) {
				ref.current.value = DEFAULT_FILTERATION_VALUE;
			}
		});

		onFilterReset();
	}

	const directionNameSelectRef = useRef<HTMLSelectElement>(null);
	const yearSelectRef = useRef<HTMLSelectElement>(null);
	const formOfStudySelectRef = useRef<HTMLSelectElement>(null);

	const selectRefs = useRef([directionNameSelectRef, yearSelectRef, formOfStudySelectRef]);

	return (
		<div className="FilterModal">
			<Select
				label="направление подготовки"
				name="DirectionName"
				selectRef={directionNameSelectRef}
				options={[
					"Прикладная математика и информатика",
					"Приборостроение",
					"Биотехнические системы и технологии",
				]}
			/>
			<Select
				label="год"
				name="Year"
				selectRef={yearSelectRef}
				options={["2020", "2021", "2022", "2023"]}
			/>
			<Select
				label="Форма обучения"
				name="FormOfStudy"
				selectRef={formOfStudySelectRef}
				options={["Очная", "Очно-заочная"]}
			/>
			<Button
				onClick={() => onFilterSubmit(getFilterParams())}
				text="применить"
			/>
			<Button onClick={resetFilter} text="отменить" />
		</div>
	);
};

export default FilterModal;
