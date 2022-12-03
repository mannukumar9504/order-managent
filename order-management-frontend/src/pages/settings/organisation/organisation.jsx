import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../components/molecule/molecule";
import { TableAtom, ModalAtom } from '../../../components/atoms/atom';
import { getOrganisationTableColumns } from './constant';
import AddOrganisationModal from './add/add-organisation';
import { getSearchAddFilter } from '../../../utils/get-filter-items';
import { searchData } from '../../../utils/search';
import { setting } from '../../../store/services/index';
import { showToast, getFormattedDate } from '../../../utils/method';

function OrganisationSettingPage() {
    const { t } = useTranslation();
    const [orgModalView, setOrgModalView] = useState('');
    const [selectedOrganisation, setSelectedOrganisation] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-organisation' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [organisationsList, setOrganisationsList] = useState([]);
    const [filterdOrganisationList, setFilterdOrganisationList] = useState([]);


    const fetchOrganisations = async () => {
        try{
            let result = await setting.getOrganisation();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            });
            setOrganisationsList(result);
            setFilterdOrganisationList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchOrganisations();
    }, []);

    const onOrganisationEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        const groups = (row?.groups || []).map((group) =>  {
            return {
                label: group?.name,
                value: group?.id
            }
        });
        const processes = (row?.processes || []).map((process) => {
            return {
                label: process?.name,
                value: process?.id
            }
        });
        setSelectedOrganisation({...row, groups, processes});
        setOrgModalView('edit');
    };

    const onOrganisationDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedOrganisation(row);
        setShowdeleteModal(true);
    };
    const onDeleteOrganisation = async () => {
        try {
            const res = await setting.deleteOrganisation(selectedOrganisation?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchOrganisations();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    
    const onAddOrganisation = async (organisationInfo) => {
        try {
            if (orgModalView === 'add') {
                const res = await setting.addOrganisation({
                    name: organisationInfo.name,
                    groups: organisationInfo.groups,
                    processes: organisationInfo.process,
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (orgModalView === 'edit') {
                const res = await setting.updateOrganisation({
                    name: organisationInfo.name,
                    groups: organisationInfo.groups,
                    processes: organisationInfo.process,
                }, organisationInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }
            fetchOrganisations();
            setOrgModalView('');
        } catch (error) {
            showToast(t(error?.message), { type: 'error' });
        }
    };
    const organisationsColumns = getOrganisationTableColumns(t, onOrganisationEdit, onOrganisationDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, organisationsList, organisationsColumns.slice(0, -1));
            setOrganisationsList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedOrganisation({});
            setOrgModalView('add');
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
                data={ filterdOrganisationList } 
                columns={organisationsColumns} 
            />
            
            {orgModalView && <AddOrganisationModal 
                mode={orgModalView}
                orgInfo={selectedOrganisation}
                show
                onClose={() => {setOrgModalView('');  setSelectedOrganisation('')} }
                onSubmit={onAddOrganisation}
            />}
            <ModalAtom 
                title={t('delete-organisation')}
                body = {<p>{t('delete-organisation-warning')}</p>}
                saveText="delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteOrganisation}
            />
        </>
    );
}

export default OrganisationSettingPage;
