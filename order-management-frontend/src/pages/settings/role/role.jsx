/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../components/molecule/molecule";
import { TableAtom , ModalAtom} from '../../../components/atoms/atom';
import { getRoleTableColumns } from './constant';
import AddRoleModal from './add/add-role';
import { getSearchAddFilter } from '../../../utils/get-filter-items';
import { searchData } from '../../../utils/search';
import { setting } from '../../../store/services/index';
import { showToast, getFormattedDate } from '../../../utils/method';


function RoleSettingPage() {
    const { t } = useTranslation();
    const [roleModalView, setRoleModalView] = useState('');
    const [selectedRole, setSelectedRole] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-role' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [roleList, setRoleList] = useState([]);
    const [filterdRoleList, setFilterdRoleList] = useState([]);

    const fetchRoles = async () => {
        try{
            let result = await setting.getRole();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setRoleList(result);
            setFilterdRoleList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchRoles();
    }, []);

    const onAddRole = async (roleInfo) => {
        try{
            if (roleModalView === 'add') {
                const res = await setting.addRole({
                    name: roleInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (roleModalView === 'edit') {
                const res = await setting.updateRole({
                    name: roleInfo.name
                }, roleInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchRoles();
            setRoleModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
            console.log('error', error);
        }
    }
    
    const onRoleEdit = (row, rowIndex) => {
        setSelectedRole(row);
        setRoleModalView('edit');
    };

    const onRoleDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedRole(row);
        setShowdeleteModal(true);
    }
    
    const onDeleteRole = async () => {
        try {
            const res = await setting.deleteRole(selectedRole?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchRoles();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const roleColumns = getRoleTableColumns(t, onRoleEdit, onRoleDelete);
    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, roleList, roleColumns.slice(0, -1));
            setFilterdRoleList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedRole({});
            setRoleModalView('add');
        }
    };

    return (
        <>
            <FilterBar 
                leftItems={leftFilterItems}
                rightItems={[]}
                onFilterAction={onFilterAction} />

            <TableAtom 
                keyField='id' 
                data={filterdRoleList} 
                columns={roleColumns} />
            
            {roleModalView &&<AddRoleModal 
                mode={roleModalView}
                roleInfo={selectedRole}
                show
                onClose={() => {
                    setRoleModalView('');  
                }}
                onSubmit={onAddRole}
            />
            }
            <ModalAtom 
                title={t('delete-role')} 
                body={<p>{t('delete-role-warning')}</p>}
                saveText="delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteRole }
            />
        </>
    );
}

export default RoleSettingPage;
