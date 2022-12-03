import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../components/molecule/molecule";
import { TableAtom, ModalAtom } from '../../../components/atoms/atom';
import { getGroupTableColumns } from './constant';
import AddGroupModal from './add/add-group';
import { getSearchAddFilter } from '../../../utils/get-filter-items';
import { searchData } from '../../../utils/search';
import { setting } from '../../../store/services/index';
import { showToast, getFormattedDate } from '../../../utils/method';

function GroupSettingPage() {
    const { t } = useTranslation();
    const [groupModalView, setGroupModalView] = useState('');
    const [selectedGroup, setSelectedGroup] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-group' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [groupList, setGroupList] = useState([]);
    const [filterdGroupList, setFilterdGroupList] = useState([]);


    const fetchGroups = async () => {
        try{
            let result = await setting.getGroup();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setGroupList(result);
            setFilterdGroupList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchGroups();
    }, []);

    const onGroupEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedGroup(row);
        setGroupModalView('edit');
    };

    const onGroupDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedGroup(row);
        setShowdeleteModal(true);
    }
    const onDeleteGroup = async () => {
        try {
            const res = await setting.deleteGroup(selectedGroup?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchGroups();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    
    const onAddGroup = async (groupInfo) => {
        try{
            if (groupModalView === 'add') {
                const res = await setting.addGroup({
                    name: groupInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (groupModalView === 'edit') {
                const res = await setting.updateGroup({
                    name: groupInfo.name
                }, groupInfo.id);
                showToast(t(res.message), { type: 'success' });
            }  
            fetchGroups();
            setGroupModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }
    const groupColumns = getGroupTableColumns(t, onGroupEdit, onGroupDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, groupList, groupColumns.slice(0, -1));
            setFilterdGroupList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedGroup({});
            setGroupModalView('add');
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
                data={ filterdGroupList } 
                columns={groupColumns}
            />
            
            { groupModalView && <AddGroupModal 
                mode={groupModalView}
                groupInfo={selectedGroup}
                show
                onClose={() => {setGroupModalView('');  setSelectedGroup('')} }
                onSubmit={onAddGroup}
            />}
            <ModalAtom 
                title = {t('delete-group')}
                body = {<p>{t('delete-group-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteGroup}
            />
        </>
    );
}

export default GroupSettingPage;
