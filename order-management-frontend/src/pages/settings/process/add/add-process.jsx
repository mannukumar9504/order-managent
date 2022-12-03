import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../components/atoms/atom";

function AddProcessModal(props) {
    const { show, onClose, onSubmit, mode, processInfo = {}  } = props;
    const { t } = useTranslation();

    const [nameObj, setNameObj] = useState({
        value: processInfo?.name ? processInfo.name: '',
        error: '',
    })

    const onAddProcess = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-process-name-required'});
            return;
        }   
        onSubmit({
            ...processInfo,
            name: nameObj.value,
        });      
    }

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-process' : 'edit-process')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddProcess}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('name')}
                            required
                            value={nameObj.value}
                            error={nameObj.error}
                            onChange={(e) => {
                                setNameObj({...nameObj, 
                                    value: e.target.value, 
                                    error: e.target.value ? '' : 'error-process-name-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddProcessModal;
