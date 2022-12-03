import React from "react";
import { useTranslation } from "react-i18next";
function TextFieldAtom(props) {
    const { label, type, className, placeholder, value, onChange, error = '', required = false } = props;
    const { t } = useTranslation();
    return (
        <>
            {label ? <label>{label}</label> : ''}
            <input
                type={type || 'text'}
                className={className || "form-control"}
                placeholder={(required ? `${placeholder}*` : placeholder) || ''}
                value={value}
                onChange={onChange}
            />
            {error ? <p className="text-danger">{t(error)}</p> : ''}
        </>
    );
}

export default TextFieldAtom;
