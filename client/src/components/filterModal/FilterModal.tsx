import React, { useEffect, useRef } from "react";
import { IFilterParam } from "../../interfaces/IFilterParam.interface";
import Select from "../common/Select/Select";
import Button from "../common/Button/Button";

const FilterModal = ({
	onFilterSubmit,
	onFilterReset,
}: {
	onFilterSubmit: (params: IFilterParam[]) => void;
	onFilterReset: () => void;
}) => {

	useEffect(() => { console.log('rerender')})

	const filterParams = useRef<IFilterParam[]>([]);

	const onFilterParamsChange = (paramName: string, paramValue: string) => {
		const filterParam = filterParams.current.find(
			(param) => param.filterParamName === paramName
		);

		if (!!filterParam) {
			filterParam.filterParamValue = paramValue;
		} else {
			const newFilterParam: IFilterParam = {
				filterParamName: paramName,
				filterParamValue: paramValue,
			};

			filterParams.current.push(newFilterParam);
		}

		console.log(filterParams.current);
	};

	return (
		<div className="FilterModal">
			<Select
				label="направление подготовки"
				name="DirectionName"
				onFiltering={onFilterParamsChange}
				options={[
					"Прикладная математика и информатика",
					"Приборостроение",
					"Биотехнические системы и технологии",
				]}
			/>
			<Select
				label="год"
				name="Year"
				onFiltering={onFilterParamsChange}
				options={["2020", "2021", "2022", "2023"]}
			/>
			<Select
				label="Форма обучения"
				name="FormOfStudy"
				onFiltering={onFilterParamsChange}
				options={["Очная", "Очно-заочная"]}
			/>
			<Button onClick={() => onFilterSubmit(filterParams.current)} text="применить" />
			<Button onClick={onFilterReset} text="применить" />
		</div>
	);
};

export default FilterModal;
