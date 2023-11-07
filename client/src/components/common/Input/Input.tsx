import React, { useState } from 'react';
import './Input.scss';

interface InputProps {
    type: string;
    placeholder: string;
    label_text: string;
    name: string;
}

const Input = (props: InputProps) => {

    const [text, setText] = useState('');

    const { type, placeholder, label_text, name } = props;

    return (
        <div className="field">
            <label htmlFor={name}>{label_text}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                name={label_text}
                autoComplete='off'
            />
        </div>
    )
}

export default Input