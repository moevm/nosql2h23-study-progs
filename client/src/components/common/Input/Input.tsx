import React, { useState } from 'react';
import './Input.scss';

interface InputProps {
    type: string;
    placeholder: string;
    label_text: string;
    name: string;
    onChange: (text: string) => void;
}

const Input = (props: InputProps) => {

    const [text, setText] = useState('');

    const { type, placeholder, label_text, name, onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        onChange(e.target.value);
    }
    return (
        <div className="field">
            <label htmlFor={name}>{label_text}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={text} 
                onChange={handleChange} 
                name={label_text}
                autoComplete='off'
            />
        </div>
    )
}

export default Input