import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import FilterBar from "../../../../components/molecule/filter-bar/filter-bar";
import { TableAtom, ModalAtom } from '../../../../components/atoms/atom';
import {  getManufactureTableColumns } from './constant';
import { getSearchAddFilter } from '../../../../utils/get-filter-items';
import { searchData } from '../../../../utils/search';
import { setting } from '../../../../store/services/index';
import { showToast, getFormattedDate } from '../../../../utils/method';


import AddManufactureModal from './add/add-manufacture';
    
function ResourceManufacturePage() {
    const { t } = useTranslation();
    const [manufactureModalView, setManufactureModalView] = useState('');
    const [selectedManufacture, setSelectedManufacture] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-manufacture' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [manufactureList, setManufactureList] = useState([]);
    const [filterdManufactureList, setFilterdManufactureList] = useState([]);

    const fetchManufactures = async () => {
        try{
            let result = await setting.getResourceManufacture();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setManufactureList(result);
            setFilterdManufactureList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchManufactures();
    }, []);



    const onManufactureEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedManufacture(row);
        setManufactureModalView('edit');
    };

    const onManufactureDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedManufacture(row);
        setShowdeleteModal(true);
    }

    const onDeleteManufacture = async () => {
        try {
            const res = await setting.deleteResourceManufacture(selectedManufacture?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchManufactures();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onAddManufacture = async (manufactureInfo) => {

        try{
            if (manufactureModalView === 'add') {
                const res = await setting.addResourceManufacture({
                    name: manufactureInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (manufactureModalView === 'edit') {
                const res = await setting.updateResourceManufacture({
                    name: manufactureInfo.name
                }, manufactureInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchManufactures();
            setManufactureModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }

    }
    const manufactureColumns = getManufactureTableColumns(t, onManufactureEdit, onManufactureDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, manufactureList, manufactureColumns.slice(0, -1));
            setManufactureList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedManufacture({});
            setManufactureModalView('add');
        }
    };

    return (
        <>
            <FilterBar 
                leftItems={leftFilterItems}
                rightItems={rightFilterItems}
                onFilterAction={onFilterAction} />

            <TableAtom 
                keyField='id' 
                data={ filterdManufactureList } 
                columns={manufactureColumns} 
            />

            {manufactureModalView && <AddManufactureModal
                mode={manufactureModalView}
                manufactureInfo={selectedManufacture}
                show
                onClose={() => {setManufactureModalView('');  setSelectedManufacture('')} }
                onSubmit={onAddManufacture}
            />}
            <ModalAtom 
                title={t('delete-manufacture')} 
                body={<p>{t('delete-manufacture-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteManufacture}
            />
        </>
    );
}

export default ResourceManufacturePage;
