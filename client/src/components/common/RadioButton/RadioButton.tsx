import React from 'react'

const RadioButton = (params: { label: string, buttonName: string, onChange: () => void }) => {
    
    const { label, buttonName, onChange } = params;
  
    return (
    <div>
        <input type="radio" name={buttonName} onChange={onChange} />
        <div className="label">{label}</div>
    </div>
  )
}

export default RadioButton