import React, { useEffect, useRef, useState } from "react";
import "./Button.scss";

interface ButtonProps {
  	text: string;
	onClick: () => void;
	apiRef?: React.MutableRefObject<any>;
	isDisabled?: boolean;
}

const Button = (buttonProps: ButtonProps) => {

	const { text, onClick, apiRef, isDisabled } = buttonProps;

	const [isButtonDisabled, setIsButtonDisabled] = useState(isDisabled);

	useEffect(() => { 
		if(apiRef) {
			apiRef.current = {
				disable: () => {
					setIsButtonDisabled(true);
				},
				enable: () => {
					setIsButtonDisabled(false);
				}
			}
		}
	}, [apiRef]);

	return (
		<button className="button" disabled={isButtonDisabled} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
