import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../../components/atoms/atom";

function AddTypeModal(props) {
    const { show, onClose, onSubmit, mode, typeInfo = {} } = props;
    const { t } = useTranslation();
    const [nameObj, setNameObj] = useState({
        value: typeInfo?.name ? typeInfo.name: '',
        error: '',
    })
    const onAddType = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-type-required'});
            return;
        }   
        onSubmit({
            ...typeInfo,
            name: nameObj.value,
        });      
    }


    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-type' : 'edit-type')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddType}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('name')}
                            required
                            value={nameObj.value}
                            onChange={(e) => {
                                setNameObj({...nameObj, 
                                    value: e.target.value, 
                                    error: e.target.value ? '' : 'error-type-required'
                                })
                            }}
                            error={nameObj.error}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddTypeModal;
