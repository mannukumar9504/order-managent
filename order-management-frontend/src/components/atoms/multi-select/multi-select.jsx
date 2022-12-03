import React from 'react';
import Select from 'react-select';
import { useTranslation } from "react-i18next";

export default function MultiSelectAtom(props) {

    const { selectedOption, placeholder, options = [], onChange, error ='', required = false } = props;
    const { t } = useTranslation();

    return (
        <div className="App">
            <Select
                defaultValue={selectedOption}
                onChange={onChange}
                options={options}
                isMulti
                placeholder={(required ? `${placeholder}*` : placeholder) || ''}
            />
            {error ? <p className="text-danger">{ t(error)}</p> : '' }
        </div>
    );
}