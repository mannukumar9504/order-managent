import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../../components/molecule/molecule";
import { TableAtom, ModalAtom } from '../../../../components/atoms/atom';
import { getProcessTableColumns } from './constant';
import AddProcessModal from '../add/add-process';
import { getSearchAddFilter } from '../../../../utils/get-filter-items';
import { searchData } from '../../../../utils/search';
import { setting } from '../../../../store/services/index';
import { showToast, getFormattedDate } from '../../../../utils/method';

function ProcessList(props) {
    const { toggleProcessListView } = props;
    const { t } = useTranslation();
    const [processModalView, setProcessModalView] = useState('');
    const [selectedProcess, setSelectedProcess] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-process' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [processList, setProcessList] = useState([{ name: "Process 1" }]);
    const [filteredProcessList, setFilteredProcessList] = useState([{ name: "Process 1" }]);


    const fetchProcess = async () => {
        try{
            let result = await setting.getProcess();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setProcessList(result);
            setFilteredProcessList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchProcess();
    }, []);

    const onProcessEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedProcess(row);
        setProcessModalView('edit');
    };

    const onProcessDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedProcess(row);
        setShowdeleteModal(true);
    }

    const onProcessStep = (row, rowIndex) => {
        toggleProcessListView('process-step', row, rowIndex);
    }

    const onProcessAttributes = (row, rowIndex) => {
        toggleProcessListView('process-attributes', row, rowIndex);
    }
    
    const onAddProcess = async (processInfo) => {
        try{
            if (processModalView === 'add') {
                const res = await setting.addProcess({
                    name: processInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (processModalView === 'edit') {
                const res = await setting.updateProcess({
                    name: processInfo.name
                }, processInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchProcess();
            setProcessModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }
    const processColumns = getProcessTableColumns(t, onProcessEdit, onProcessDelete, onProcessStep, onProcessAttributes);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filterProcessList = searchData(info?.value, processList, processColumns.slice(0, -1));
            setFilteredProcessList(filterProcessList);
        }
        if (key === 'add') {
            setSelectedProcess({});
            setProcessModalView('add');
        }
    };

    const onDeleteProcess = async () => {
        try {
            const res = await setting.deleteProcess(selectedProcess?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchProcess();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    return (
        <>
            <FilterBar 
                leftItems={leftFilterItems}
                rightItems={rightFilterItems}
                onFilterAction={onFilterAction} />

            <TableAtom 
                keyField='id' 
                data={ filteredProcessList } 
                columns={processColumns}
            />
            
            { processModalView && <AddProcessModal 
                mode={processModalView}
                processInfo={selectedProcess}
                show
                onClose={() => {setProcessModalView('');  setSelectedProcess('')} }
                onSubmit={onAddProcess}
            />}
            <ModalAtom 
                title={t('delete-process')}
                body={<p>{t('delete-process-warning')}</p>}
                saveText="delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteProcess}
            />
        </>
    );
}

export default ProcessList;
