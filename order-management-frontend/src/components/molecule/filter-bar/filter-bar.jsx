import React from "react";
import { TextFieldAtom, ButtonAtom, DropdownAtom, DatePickerAtom } from '../../atoms/atom';


function FilterBar(props) {

    const { leftItems, rightItems, onFilterAction } = props;

    const getSearchFilter = (index, itemInfo) => {
        return <TextFieldAtom 
            type="search"
            placeholder={itemInfo?.label}
            value={itemInfo?.value}
            onChange={(e) => onFilterAction(index, itemInfo?.key, { value: e.target.value })}
        />
    }

    const getButton = (index, itemInfo) => {
        return  <ButtonAtom 
            className="btn btn-warning text-white"
            disabled={itemInfo.disabled || false}
            onClick={() => onFilterAction(index, itemInfo?.key)}>
            {itemInfo.label}
        </ButtonAtom>
    }

    const getDropDown = (index, itemInfo) =>{
        return <DropdownAtom 
            placeholder={itemInfo.label}
            value={itemInfo.value}
            options={itemInfo?.options}
            onChange={(e) => onFilterAction(index, itemInfo?.key, { value:  e.target.value })}
        />
    }

    const getDatePicker = (index, itemInfo) => {
        return <DatePickerAtom 
            placeholder={itemInfo.label}
            value={itemInfo.value}
            onChange={(e) => onFilterAction(index, itemInfo?.key, { value: e })}
        />
    }

    return (
        <div className="d-flex justify-content-between mt-3">
            {[leftItems || [], rightItems || []].map((items, index) => {
                return <div className="d-flex">
                    {items.map((item) => {
                        return <div style={ index ? { marginLeft: '5px' } : { marginRight: '5px' }}>
                            {item.type === 'search' && getSearchFilter(index, item)}
                            {item.type === 'button' && getButton(index, item)}
                            {item.type === 'dropdown' && getDropDown(index, item)}
                            {item.type === 'datepicker' && getDatePicker(index, item)}
                        </div>
                    })}
                </div>
            })}
        </div>
    );
}

export default FilterBar;
