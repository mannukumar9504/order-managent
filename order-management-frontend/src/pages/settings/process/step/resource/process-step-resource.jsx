import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';

import { ModalAtom, TableAtom } from "../../../../../components/atoms/atom";
import { getProcessStepResourceTableColumns } from './constant';
import { setting } from '../../../../../store/services/index';

function ProcessStepResourceModal(props) {
    const { show, onClose, onSubmit, defaultSelectedRow = [] } = props;
    const { t } = useTranslation();
    const [processStepResource, setProcessStepResource] = useState([]);
    const [selectedRow, setSelectedRow] = useState(defaultSelectedRow || []);

    const fetchResources = async () => {
        try{
            let result = await setting.getResource();
            setProcessStepResource(result.data);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchResources();
    }, []);

    const onSaveProcessStepResource = () => {
        onSubmit(selectedRow);
    }

    const processStepResourceColumns = getProcessStepResourceTableColumns(t);

    const handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            setSelectedRow([...selectedRow, row.id]);
        } else {
            setSelectedRow(selectedRow.filter(x => x !== row.id));
        }
    }
    
    const handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            setSelectedRow(ids);
        } else {
            setSelectedRow([]);
        }
    }

    return (
        <ModalAtom 
            title={t('resource')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onSaveProcessStepResource}
            body={ <Container>
                <TableAtom 
                    keyField='id' 
                    data={processStepResource || []} 
                    columns={processStepResourceColumns}
                    hidePagination
                    selectRow = {{
                        selected: selectedRow,
                        mode: 'checkbox',
                        clickToSelect: true,
                        selectColumnPosition: "right",
                        onSelect: handleOnSelect,
                        onSelectAll: handleOnSelectAll
                    }}
                />
            </Container>}
        />
    );
}

export default ProcessStepResourceModal;
