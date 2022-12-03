import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";

import FilterBar from "../../../../components/molecule/filter-bar/filter-bar";
import { TableAtom, ModalAtom } from '../../../../components/atoms/atom';
import {getResourceTableColumns } from './constant';
import { getSearchAddFilter } from '../../../../utils/get-filter-items';
import { searchData } from '../../../../utils/search';
import { setting } from '../../../../store/services/index';
import { showToast, getFormattedDate } from '../../../../utils/method';


import AddResourceModal from './add/add-resource';
    
function ResourcePage() {
    const { t } = useTranslation();
    const [resouceModalView, setResouceModalView] = useState('');
    const [selectedResouce, setSelectedResouce] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-resource' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [resourceList, setResourceList] = useState([]);

    const [filteredResourceList, setFilteredResourceList] = useState([]);
   
    const fetchResources = async () => {
        try{
            let result = await setting.getResource();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setResourceList(result);
            setFilteredResourceList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchResources();
    }, []);
    const onResourceEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedResouce(row);
        setResouceModalView('edit');
    };

    const onResourceDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedResouce(row);
        setShowdeleteModal(true);
    }

    const onDeleteResource = async () => {
        try {
            const res = await setting.deleteResource(selectedResouce?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchResources();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onAddResource = async (resourceInfo) => {
        try{
            if (resouceModalView === 'add') {
                const res = await setting.addResource({
                    name: resourceInfo.name,
                    categoryId: resourceInfo.category,
                    manufacturerId: resourceInfo.manufacture,
                    typeId: resourceInfo.type,
                    locationId: resourceInfo.location

                });
                showToast(t(res?.message), { type: 'success' });
            } else if (resouceModalView === 'edit') {
                const res = await setting.updateResource({
                    name: resourceInfo.name,
                    categoryId: resourceInfo.category,
                    manufacturerId: resourceInfo.manufacture,
                    typeId: resourceInfo.type,
                    locationId: resourceInfo.location
                }, resourceInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchResources();
            setResouceModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }
    const resourceColumns = getResourceTableColumns(t, onResourceEdit, onResourceDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, resourceList, resourceColumns.slice(0, -1));
            setResourceList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedResouce({});
            setResouceModalView('add');
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
                data={ filteredResourceList } 
                columns={resourceColumns}  />

            {resouceModalView && <AddResourceModal
                mode={resouceModalView}
                resouceInfo={selectedResouce}
                show
                onClose={() => {setResouceModalView('');  setSelectedResouce('')} }
                onSubmit={onAddResource}
            />}
            <ModalAtom 
                title={t('delete-resource')} 
                body={<p>{t('delete-resource-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteResource }
            />
        </>
    );
}

export default ResourcePage;
