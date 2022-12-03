import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";

function ModalAtom(props) {
    
    const { show, handleClose, handleSubmit, title, body, centered = true , saveText} = props;
    const { t } = useTranslation();

    return (
        <Modal show={show} onHide={handleClose} centered={centered}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <div>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('close')}
                    </Button>
                    <Button className="mx-2 text-white" variant="warning" onClick={handleSubmit}>
                        {t(saveText || 'save')}
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    );
}
export default ModalAtom;
