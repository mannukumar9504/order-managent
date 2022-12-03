import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../components/atoms/atom";

function AddGroupModal(props) {
    const { show, onClose, onSubmit, mode, groupInfo = {}  } = props;
    const { t } = useTranslation();

    const [nameObj, setNameObj] = useState({
        value: groupInfo?.name ? groupInfo.name: '',
        error: '',
    })

    const onAddGroup = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-group-name-required'});
            return;
        }   
        onSubmit({
            ...groupInfo,
            name: nameObj.value,
        });      
    }

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-group' : 'edit-group')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddGroup}
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
                                    error: e.target.value ? '' : 'error-group-name-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddGroupModal;
