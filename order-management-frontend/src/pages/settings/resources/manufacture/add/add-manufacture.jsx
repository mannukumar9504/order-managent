import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../../components/atoms/atom";

function AddManufactureModal(props) {
    const { show, onClose, onSubmit, mode, manufactureInfo = {} } = props;
    const { t } = useTranslation();
    const [nameObj, setNameObj] = useState({
        value: manufactureInfo?.name ? manufactureInfo.name: '',
        error: '',
    })
    const onAddManufacture = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-manufacture-name-required'});
            return;
        }   
        onSubmit({
            ...manufactureInfo,
            name: nameObj.value,
        });      
    }


    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-manufacture' : 'edit-manufacture')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddManufacture}
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
                                    error: e.target.value ? '' : 'error-manufacture-name-required'
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

export default AddManufactureModal;
