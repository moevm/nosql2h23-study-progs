import React, { useState } from "react";
import search from "../../assets/images/search.svg";
import close from "../../assets/images/close.svg";
import "./Search.scss";

const Search = ({ onSearchPerform }: { onSearchPerform: (value: string) => void }) => {
	const [value, setValue] = useState("");

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		onSearchPerform(e.target.value);
	};

	const resetSearchInput = () => {
		setValue("");
		onSearchPerform("");
	};

	return (
		<div className="search">
			<input
				type="text"
				placeholder="начните печатать..."
				value={value}
				onChange={handleOnChange}
			/>
			<button onClick={() => onSearchPerform(value.trim())} className="searchButton">
				<img src={search} alt="search" />
			</button>

			<img onClick={resetSearchInput} className={`removeTextButton ${value === "" ? "invisible" : ""}`} src={close} alt="close" />
		</div>
	);
};

export default Search;
