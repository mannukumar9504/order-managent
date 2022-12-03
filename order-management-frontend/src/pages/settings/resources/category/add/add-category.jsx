import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom } from "../../../../../components/atoms/atom";

function AddCategoryModal(props) {
    const { show, onClose, onSubmit, mode, categoryInfo = {} } = props;
    const { t } = useTranslation();
   
    const [nameObj, setNameObj] = useState({
        value: categoryInfo?.name ? categoryInfo.name: '',
        error: '',
    })
    const onAddCategory = () => {
        if (!nameObj.value) {
            setNameObj({...nameObj, error: 'error-category-name-required'});
            return;
        }   
        onSubmit({
            ...categoryInfo,
            name: nameObj.value,
        });      
    }
    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-category' : 'edit-category')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddCategory}
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
                                    error: e.target.value ? '' : 'error-category-name-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddCategoryModal;
