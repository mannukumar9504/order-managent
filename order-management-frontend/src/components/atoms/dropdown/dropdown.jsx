import React from "react";
import { useTranslation } from "react-i18next";


function DropdownAtom(props) {
    const { label, className, placeholder, value, options = [], hideNoOptionSelect = false, onChange, error ='', required = false } = props;
    const { t } = useTranslation();

    
    return (
        <>
            {label ? <label>{label}</label> : ''}
            
            <select 
                className={className || "form-control"} 
                value={value}
                onChange={onChange}>
                {hideNoOptionSelect ? '' : <option value=''>{(required ? `${placeholder}*` : placeholder) || 'Select'}</option>}
                {options.map((option) => {
                    return  <option value={option.value}>{option.label}</option>
                })}
            </select>
            {error ? <p className="text-danger">{ t(error)}</p> : '' }
        </>
    );
}

export default DropdownAtom;
