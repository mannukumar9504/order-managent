import React from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";


function DatePickerAtom(props) {
    const { className="", placeholder, value, onChange, error ='' } = props;
    const { t } = useTranslation();

    
    return (
        <>
            <DatePicker 
                className={className || "form-control"} 
                placeholderText={placeholder} 
                selected={value}
                onChange={onChange} />
            {error ? <p className="text-danger">{ t(error)}</p> : '' }
        </>
    );
}

export default DatePickerAtom;
