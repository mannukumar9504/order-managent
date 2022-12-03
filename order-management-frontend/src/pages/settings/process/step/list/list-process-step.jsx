import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../../../components/molecule/molecule";
import { TableAtom, ModalAtom, ButtonAtom } from '../../../../../components/atoms/atom';
import { getProcessStepTableColumns } from './constant';
import AddProcessStepModal from '../add/add-process-step';
import { getSearchAddFilter } from '../../../../../utils/get-filter-items';
import { searchData } from '../../../../../utils/search';
import { setting } from '../../../../../store/services/index';
import { showToast } from '../../../../../utils/method';
import ProcessStepResourceModal from "../resource/process-step-resource";

function ProcessStepList(props) {
    const { selectedProcess, onBack } = props;
    const { t } = useTranslation();
    const [processStepModalView, setProcessStepModalView] = useState('');
    const [selectedProcessStep, setSelectedProcessStep] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const [showResourceModal, setShowResourceModal] = useState(false);

    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-process-step' });

    const leftItems = [{ 
        type: 'button', 
        key: 'add',
        disabled: true,
        label: <div className="d-flex">
            <p className="text-uppercase m-0">{selectedProcess?.name}</p>
        </div>
    }];

    const [leftFilterItems, setLeftFilterItems] = useState(leftItems.concat(filterItems.left) || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [processStepList, setProcessStepList] = useState([{ name: "Process Step 1" }]);
    const [filteredProcessStep, setFilteredProcessStep] = useState([{ name: "Process Step 1" }]);

    const fetchProcessStep = async () => {
        try{
            const result = await setting.getProcessStepsByProcessId(selectedProcess?.id);
            setProcessStepList(result?.data || []);
            setFilteredProcessStep(result?.data || []);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchProcessStep();
    }, []);

    const onProcessStepEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        const resource = (row?.resources || []).map((resource) => {
            return {
                label: resource?.name,
                value: resource?.id
            }
        });
        setSelectedProcessStep({...row, resource});
        setProcessStepModalView('edit');
    };

    const onProcessStepDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedProcessStep(row);
        setShowdeleteModal(true);
    }

    const onProcessStepResource = (row) => {
        setSelectedProcessStep(row);
        setShowResourceModal(true);
    }
    
    const onAddProcessStep = async (processStepInfo) => {
        try{
            if (processStepModalView === 'add') {
                const res = await setting.addProcessStep({
                    position: processStepInfo?.position,
                    description: processStepInfo?.description,
                    label: processStepInfo?.label,
                    icon: processStepInfo?.icon,
                    attribute: processStepInfo?.attribute,
                    processId: selectedProcess?.id,
                    resources: processStepInfo?.resource,
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (processStepModalView === 'edit') {
                const res = await setting.updateProcessStep({
                    position: processStepInfo?.position,
                    description: processStepInfo?.description,
                    label: processStepInfo?.label,
                    icon: processStepInfo?.icon,
                    attribute: processStepInfo?.attribute,
                    processId: selectedProcess?.id,
                    resources: processStepInfo?.resource,
                }, processStepInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchProcessStep();
            setProcessStepModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }
    const processStepColumns = getProcessStepTableColumns(t, onProcessStepEdit, onProcessStepDelete, onProcessStepResource);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[1].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filterProcessStepList = searchData(info?.value, processStepList, processStepColumns.slice(0, -1));
            setFilteredProcessStep(filterProcessStepList);
        }
        if (key === 'add') {
            setSelectedProcessStep({});
            setProcessStepModalView('add');
        }
    };

    const onDeleteProcessStep = async () => {
        try {
            const res = await setting.deleteProcessStep(selectedProcessStep?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchProcessStep();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onAddResourceToProcessStep = async (payload) => {
        try{
            const res = await setting.addResourceToProcessStep(selectedProcessStep?.id, payload);
            showToast(t(res?.message), { type: 'success' });
            fetchProcessStep();
            setShowResourceModal(false);  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between mt-3">
                <div>
                    <ButtonAtom 
                        className="btn btn-secondary text-white"
                        onClick={onBack}>
                        Back
                    </ButtonAtom>
                </div>
                <div></div>
            </div>
            <FilterBar 
                leftItems={leftFilterItems}
                rightItems={rightFilterItems}
                onFilterAction={onFilterAction} />

            <TableAtom 
                keyField='id' 
                data={ filteredProcessStep } 
                columns={processStepColumns}
            />
            
            { processStepModalView && <AddProcessStepModal 
                mode={processStepModalView}
                processStepInfo={selectedProcessStep}
                show
                onClose={() => {setProcessStepModalView('');  setSelectedProcessStep('')} }
                onSubmit={onAddProcessStep}
            />}
            <ModalAtom 
                title={t('delete-process-step')}
                body={<p>{t('delete-process-step-warning')}</p>}
                saveText="delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteProcessStep}
            />
            {showResourceModal && <ProcessStepResourceModal 
                show={showResourceModal}
                defaultSelectedRow={selectedProcessStep?.resources?.map(r => r.id)}
                onClose={() => setShowResourceModal(false)}
                onSubmit={(payload) => onAddResourceToProcessStep({
                    resources: payload,
                })}
            />}
        </>
    );
}

export default ProcessStepList;
