import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../components/atoms/atom";

function AddRoleModal(props) {
    const { show, onClose, onSubmit, mode, roleInfo = {} } = props;
    const { t } = useTranslation();

    const [nameObj, setNameObj] = useState({
        value: roleInfo?.name ? roleInfo.name: '',
        error: '',
    })
    const onAddRole = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-role-name-required'});
            return;
        }   
        onSubmit({
            ...roleInfo,
            name: nameObj.value,
        });      
    }

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-role' : 'edit-role')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddRole}
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
                                    error: e.target.value ? '' : 'error-role-name-required'
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

export default AddRoleModal;
