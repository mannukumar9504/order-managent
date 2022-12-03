import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import FilterBar from "../../../../components/molecule/filter-bar/filter-bar";
import { TableAtom, ModalAtom } from '../../../../components/atoms/atom';
import { getTypeTableColumns } from './constant';
import { getSearchAddFilter } from '../../../../utils/get-filter-items';
import { searchData } from '../../../../utils/search';
import { setting } from '../../../../store/services/index';
import { showToast, getFormattedDate } from '../../../../utils/method';
import AddTypeModal from './add/add-type';
    
function ResourceTypePage() {
    const { t } = useTranslation();
    const [typeModalView, setTypeModalView] = useState('');
    const [selectedType, setSelectedType] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-type' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [typeList, setTypeList] = useState([]);
    const [filteredTypeList, setFilteredTypeList] = useState([]);


    const fetchResourceType = async () => {
        try{
            let result = await setting.getResourceType();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setTypeList(result);
            setFilteredTypeList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchResourceType();
    }, []);

    const onTypeEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedType(row);
        setTypeModalView('edit');
    };

    const onTypeDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedType(row);
        setShowdeleteModal(true);
    }
    const onDeleteType = async () => {
        try {
            const res = await setting.deleteResourceType(selectedType?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchResourceType();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }


    const onAddType = async (typeInfo) => {
        try{
            if (typeModalView === 'add') {
                const res = await setting.addResourceType({
                    name: typeInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (typeModalView === 'edit') {
                const res = await setting.updateResourceType({
                    name: typeInfo.name
                }, typeInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchResourceType();
            setTypeModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const typeColumns = getTypeTableColumns(t, onTypeEdit, onTypeDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, typeList, typeColumns.slice(0, -1));
            setTypeList(filteredRoleList);

        }
        if (key === 'add') {
            setSelectedType({});
            setTypeModalView('add');
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
                data={ filteredTypeList } 
                columns={typeColumns} />

            {typeModalView && <AddTypeModal
                mode={typeModalView}
                typeInfo={selectedType}
                show
                onClose={() => {setTypeModalView('');  setSelectedType('')} }
                onSubmit={onAddType}
            />}
            <ModalAtom 
                title={t('delete-type')} 
                body={<p>{t('delete-type-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteType}
            />
        </>
    );
}

export default ResourceTypePage;
