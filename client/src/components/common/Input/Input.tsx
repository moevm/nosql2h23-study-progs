import React, { useState } from 'react';
import './Input.scss';

interface InputProps {
    type: string;
    placeholder: string;
    label_text: string;
    name: string;
    inputRef: React.RefObject<HTMLInputElement>;
}

const Input = (props: InputProps) => {

    const [text, setText] = useState('');

    const { type, placeholder, label_text, name, inputRef } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    return (
        <div className="field">
            <label htmlFor={name}>{label_text}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={text} 
                ref={inputRef}
                onChange={handleChange} 
                name={label_text}
                autoComplete='off'
            />
        </div>
    )
}

export default Input