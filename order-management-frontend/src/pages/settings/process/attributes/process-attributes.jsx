import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Accordion from 'react-bootstrap/Accordion';

import { ButtonAtom, ModalAtom } from '../../../../components/atoms/atom';
import { FilterBar } from "../../../../components/molecule/molecule";
import { getSearchAddFilter } from '../../../../utils/get-filter-items';
import AddAttributeModal from "./add/add-attribute";
import ProcessSubAttributesList from "./sub-attributes/list/sub-attributes-list";
import { showToast, getFormattedDate } from '../../../../utils/method';
import { setting } from '../../../../store/services/index';

function ProcessAttributes(props) {
    const { selectedProcess, onBack } = props;
    const { t } = useTranslation();
    const [attributeModalView, setAttributeModalView] = useState('');
    const [selectedProcessAttribute, setSelectedProcessAttribute] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const [processAttributeList, setProcessAttributeList] = useState([]);
    const [filteredProcessAttributeList, setFilteredProcessAttributeList] = useState([]);

    const filters =  getSearchAddFilter(t, { addTextKey: 'add-group-attribute' });
    const leftFilterItems = [{ 
        type: 'button', 
        key: 'add',
        disabled: true,
        label: <div className="d-flex">
            <p className="text-uppercase m-0">{selectedProcess?.name}</p>
        </div>
    }];

    const onFilterAction = (index, key, info) => {
        if (key === 'add') {
            setSelectedProcessAttribute({});
            setAttributeModalView('add');
        }
    };
    const fetchProcessAttributes = async () => {
        try{
            let result = await setting.getProcessAttributesByProcessId(selectedProcess?.id);
            result = (result?.result || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setProcessAttributeList(result);
            setFilteredProcessAttributeList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchProcessAttributes();
    }, []);

        
    const onAddAttribute = async (groupAttributeInfo) => {
        try{
            if (attributeModalView === 'add') {
                const res = await setting.addAttributeGroup({
                    name: groupAttributeInfo.name,
                    processId: selectedProcess?.id,
                });
                showToast(t(res?.message), { type: 'success' });
               
            } else if (attributeModalView === 'edit') {
                const res = await setting.updateAttributeGroup({
                    name: groupAttributeInfo.name,
                    processId: selectedProcess?.id,
                }, groupAttributeInfo.id);
                showToast(t(res?.message), { type: 'success' });
               
            }
            fetchProcessAttributes();
            setAttributeModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onDeleteProcessAttribute = async () => {
        try {
            const res = await setting.deleteAttributeGroups(selectedProcessAttribute?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchProcessAttributes();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }
    
    const getAccordian = (processAttribute) => {
        return <Accordion className="mt-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <div>{processAttribute?.name}</div>
                    <div style={{ marginLeft: '80%' }}>
                        <ButtonAtom 
                            className="btn btn-warning text-white mx-2"
                            onClick={() => {
                                setSelectedProcessAttribute(processAttribute);
                                setAttributeModalView('edit');
                            }}>
                            {t('edit')}
                        </ButtonAtom>
                        <ButtonAtom 
                            className="btn btn-warning text-white"
                            onClick={() => {
                                setSelectedProcessAttribute(processAttribute);
                                setShowdeleteModal(true);
                            }}>
                            {t('delete')}
                        </ButtonAtom>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <ProcessSubAttributesList fetchProcessAttributes={fetchProcessAttributes} processAttribute={processAttribute} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    }
    return (
        <>
            <div className="d-flex justify-content-between mt-3">
                <div>
                    <ButtonAtom 
                        className="btn btn-secondary text-white"
                        onClick={onBack}>
                        {t('BACK')}
                    </ButtonAtom>
                </div>
            </div>

            <FilterBar 
                leftItems={leftFilterItems}
                rightItems={filters.right}
                onFilterAction={onFilterAction} />

            {filteredProcessAttributeList.map((processAttribute) => {
                return getAccordian(processAttribute);
            })}

            { attributeModalView && <AddAttributeModal 
                mode={attributeModalView}
                attributeInfo={selectedProcessAttribute}
                show
                onClose={() => {setAttributeModalView('');} }
                onSubmit={onAddAttribute}
            />}

            <ModalAtom  
                title={t('delete-attribute')}
                body={<p>{t('delete-attribute-warning')}</p>}
                saveText="delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteProcessAttribute}
            />
        </>
    );
}

export default ProcessAttributes;
