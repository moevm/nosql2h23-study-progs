import React, { useState } from "react";
import search from "../../assets/images/search.svg";
import './Search.scss';

const Search = ({ buttons }: any) => {
	const [value, setValue] = useState("");

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className="search">
			<input type="text" placeholder="начните печатать..." value={value} onChange={handleOnChange} />
			<button className="searchButton">
				<img src={search} alt="search" />
			</button>
			{buttons}
		</div>
	);
};

export default Search;
