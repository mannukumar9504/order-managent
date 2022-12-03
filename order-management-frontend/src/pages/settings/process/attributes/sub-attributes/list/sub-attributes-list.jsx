import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { TableAtom, ModalAtom } from '../../../../../../components/atoms/atom';
import { getProcessAttributesTableColumns } from './constant';
import AddSubAttributeModal from "../add/add-sub-attribute";
import { FilterBar } from "../../../../../../components/molecule/molecule";
import { getSearchAddFilter } from '../../../../../../utils/get-filter-items';
import { searchData } from '../../../../../../utils/search';
import { showToast } from '../../../../../../utils/method';
import { setting } from '../../../../../../store/services/index';

function ProcessSubAttributesList(props) {
    const { processAttribute, fetchProcessAttributes } = props;
    console.log('processAttribute', processAttribute);
    const { t } = useTranslation();
    const [subAttributeModalView, setSubAttributeModalView] = useState('');
    const [selectedSubAttribute, setSelectedSubAttribute] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const [subAttributesList, setSubAttributeList] = useState(processAttribute?.attributes || []);
    const [filteredSubAttributesList, setFilteredSubAttributesList] = useState(processAttribute?.attributes || []);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-attribute' });

    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);

    useEffect(() => {
        setSubAttributeList(processAttribute?.attributes);
        setFilteredSubAttributesList(processAttribute?.attributes);
    }, [processAttribute?.attributes]);
    const onSubAttributeEdit = (row, rowIndex) => {
        setSelectedSubAttribute(row);
        setSubAttributeModalView('edit');
    };

    const onSubAttributeDelete = (row, rowIndex) => {
        setSelectedSubAttribute(row);
        setShowdeleteModal(true);
    }
    
    const onDeleteSubAttribute = async () => {
        try {
            const res = await setting.deleteAttributes(selectedSubAttribute?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchProcessAttributes();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onAddSubAttribute = async (subAttributeInfo) => {
        try{
            if (subAttributeModalView === 'add') {
                const res = await setting.addAttributes({
                    attributeGroupId: processAttribute?.id || '',
                    position: subAttributeInfo?.position,
                    description: subAttributeInfo?.description,
                    label: subAttributeInfo?.label,
                    attributeTypeId: subAttributeInfo?.attributeType,
                    isRequired: subAttributeInfo?.isRequired,
                    isChangable : subAttributeInfo?.isChangeable,
                    sapIdentifier: subAttributeInfo?.sapIdentifier,
                });
                showToast(t(res?.message), { type: 'success' });
               
            } else if (subAttributeModalView === 'edit') {
                const res = await setting.updateAttributes({
                    attributeGroupId: processAttribute?.id || '',
                    position: subAttributeInfo?.position,
                    description: subAttributeInfo?.description,
                    label: subAttributeInfo?.label,
                    attributeTypeId: subAttributeInfo?.attributeType,
                    isRequired: subAttributeInfo?.isRequired,
                    isChangable : subAttributeInfo?.isChangeable,
                    sapIdentifier: subAttributeInfo?.sapIdentifier,
                }, subAttributeInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }
            fetchProcessAttributes();
            setSubAttributeModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const subAttributeColumns = getProcessAttributesTableColumns(t, onSubAttributeEdit, onSubAttributeDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filterProcessList = searchData(info?.value, subAttributesList, subAttributeColumns.slice(0, -1));
            setFilteredSubAttributesList(filterProcessList);
        }
        if (key === 'add') {
            setSelectedSubAttribute({});
            setSubAttributeModalView('add');
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
                data={ filteredSubAttributesList } 
                columns={subAttributeColumns}
                hidePagination
            />
            
            {subAttributeModalView && <AddSubAttributeModal 
                mode={subAttributeModalView}
                subAttributeInfo={selectedSubAttribute}
                show
                onClose={() => {setSubAttributeModalView('');  setSelectedSubAttribute('')} }
                onSubmit={onAddSubAttribute}
            />}
            <ModalAtom 
                title={t('delete-sub-attribute')}
                body = {<p>{t('delete-sub-attribute-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteSubAttribute}
            />
        </>
    );
}

export default ProcessSubAttributesList;
