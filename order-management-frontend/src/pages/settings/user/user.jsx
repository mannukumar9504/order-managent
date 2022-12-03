/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../components/molecule/molecule";
import { TableAtom, ModalAtom } from '../../../components/atoms/atom';
import { getUserTableColumns } from './constant';
import { getSearchAddFilter } from '../../../utils/get-filter-items';
import { searchData } from '../../../utils/search';
import AddUserModal from './add/add-user';
import { setting } from '../../../store/services/index';
import { showToast, getFormattedDate } from '../../../utils/method';

    
function UserSettingPage() {
    const { t } = useTranslation();
    const [userModalView, setUserModalView] = useState('');
    const [selectedUser, setSelectedUser] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-user' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [userList, setUserList] = useState([]);
    const [filteredUserList, setFilteredUserList] = useState([]);
   
    const fetchUsers = async () => {
        try{
            let result = await setting.getUser();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setUserList(result);
            setFilteredUserList(result);
            console.log(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchUsers();
    }, []);
      

    const onUserEdit = (row, rowIndex) => {
        const operatingMaterial = (row?.resources || []).map((resource) => {
            return {
                label: resource?.name,
                value: resource?.id
            }
        });
        setSelectedUser({...row, operatingMaterial});
        setUserModalView('edit');
    };

    const onUserDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedUser(row);
        setShowdeleteModal(true);
    }

    const onDeleteUser = async () => {
        try {
            const res = await setting.deleteUser(selectedUser?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchUsers();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onAddUser = async (userInfo) => {

        try{
            if (userModalView === 'add') {
                const res = await setting.addUser({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    password: userInfo.password,
                    contactNumber: userInfo.contactNumber,
                    resources: userInfo.operatingMaterial,
                    roleId: userInfo.role,
                    groupId: userInfo.group

                });
                showToast(t(res?.message), { type: 'success' });
            } else if (userModalView === 'edit') {
                const res = await setting.updateUser({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    contactNumber: userInfo.contactNumber,
                    resources: userInfo.operatingMaterial,
                    roleId: userInfo.role,
                    groupId: userInfo.group
                }, userInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchUsers();
            setUserModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
            console.log('error', error);
        }
    }
    const userColumns = getUserTableColumns(t, onUserEdit, onUserDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, userList, userColumns.slice(0, -1));
            setFilteredUserList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedUser({});
            setUserModalView('add');
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
                data={ filteredUserList } 
                columns={userColumns} />

            {userModalView && <AddUserModal
                mode={userModalView}
                userInfo={selectedUser}
                show
                onClose={() => {setUserModalView('');  setSelectedUser('')} }
                onSubmit={onAddUser}
            />}
            <ModalAtom 
                title={t('delete-user')} 
                body={<p>{t('delete-user-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteUser }
            />
        </>
    );
}

export default UserSettingPage;
