import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../../components/atoms/atom";

function AddAttributeModal(props) {
    const { show, onClose, onSubmit, mode, attributeInfo = {}  } = props;
    const { t } = useTranslation();

    const [nameObj, setNameObj] = useState({
        value: attributeInfo?.name ? attributeInfo.name: '',
        error: '',
    })

    const onAddAttribute = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-attribute-name-required'});
            return;
        }   
        onSubmit({
            ...attributeInfo,
            name: nameObj.value,
        });      
    }

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-attribute' : 'edit-attribute')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddAttribute}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('name')}
                            value={nameObj.value}
                            required
                            error={nameObj.error}
                            onChange={(e) => {
                                setNameObj({...nameObj, 
                                    value: e.target.value, 
                                    error: e.target.value ? '' : 'error-attribute-name-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddAttributeModal;
