import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../components/atoms/atom";

function AddLocationModal(props) {
    const { show, onClose, onSubmit, mode, locationInfo = {}  } = props;
    const { t } = useTranslation();

    const [nameObj, setNameObj] = useState({
        value : locationInfo?.name ? locationInfo.name: '', 
        error: ''});

    const onAddLocation = () => {
        if(!nameObj.value) {
            setNameObj({
                ...nameObj, error: 'error-location-name-required'
            })
            return;
        }
        onSubmit({
            ...locationInfo,
            name: nameObj.value
        })
    };    

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-location' : 'edit-location')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddLocation}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('name')}
                            required
                            value={nameObj.value}
                            error={nameObj.error}
                            onChange={(e) => setNameObj({...nameObj, value: e.target.value, error: e.target.value? '': 'error-location-name-required'} )}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddLocationModal;
