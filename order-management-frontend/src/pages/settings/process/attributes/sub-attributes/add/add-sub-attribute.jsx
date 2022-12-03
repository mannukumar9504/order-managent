import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom, SwitchAtom, DropdownAtom } from "../../../../../../components/atoms/atom";
import { setting } from '../../../../../../store/services/index';


function AddSubAttributeModal(props) {
    const { show, onClose, onSubmit, mode, subAttributeInfo = {}  } = props;
    const { t } = useTranslation();
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [label, setLabel] = useState('');
    const [sapIdentifier, setSapIdentifier] = useState('');
    const [isChangeable, setIsChangeable] = useState(false);
    const [isRequired, setIsRequired] = useState(false);
    const [attributeType, setAttributeType] = useState('');
    const [attributeTypesOptions, setAttributeTypesOptions] = useState([]);

    const [errorObj, setErrorObj] = useState({
        position: '',
        description: '',
        label: '',
        attributeType: '',
        sapIdentifier: '',
    });


    const fetchDropDownOptions = async () => {
        try {
            const roleResult = await setting.getAttributeTypes();
            setAttributeTypesOptions((roleResult.data || []).map((attType) => { 
                return {
                    label: attType.name,
                    value: attType.id,
                }
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDropDownOptions();
    }, []);

    const onAddSubAttribute = () => {
        let localErrorObj = {};
        if (!position) {
            localErrorObj.position = 'error-sub-attribute-position-required';
        }
        if (!description) { 
            localErrorObj.description = 'error-sub-attribute-description-required';
        }
        if (!label) {
            localErrorObj.label = 'error-sub-attribute-label-required';
        }
        if (!attributeType) {
            localErrorObj.attributeType = 'error-attribute-type-required';
        }
        if (!sapIdentifier) {
            localErrorObj.sapIdentifier = 'error-sap-identifier-required';
        }
        setErrorObj({...localErrorObj});
        const hasError = Object.keys(localErrorObj).length ;
        if (!hasError){
            onSubmit({
                ...subAttributeInfo,
                position,
                description,
                label,
                attributeType,
                isRequired,
                isChangeable,
                sapIdentifier,
            })
        }     
    }

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-sub-attribute' : 'edit-sub-attribute')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddSubAttribute}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="number"
                            placeholder={t('position')}
                            value={position}
                            error={errorObj.position}
                            onChange={(e) => {
                                setPosition(e.target.value);
                                setErrorObj({...errorObj, 
                                    position: e.target.value ? '' : 'error-sub-attribute-position-required'
                                })
                            }}
                        />
                    </Col>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('description')}
                            value={description}
                            error={errorObj.description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrorObj({...errorObj, 
                                    description: e.target.value ? '' : 'error-sub-attribute-description-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('label')}
                            value={label}
                            error={errorObj.label}
                            onChange={(e) => {
                                setLabel(e.target.value);
                                setErrorObj({...errorObj, 
                                    label: e.target.value ? '' : 'error-sub-attribute-label-required'
                                })
                            }}
                        />
                    </Col>
                    <Col>
                        <SwitchAtom 
                            label={t('changeable')}
                            type="switch"
                            checked={isChangeable} 
                            onChange={(e) => {
                                console.log(e);
                                setIsChangeable(e.target.checked);
                            }} />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <DropdownAtom 
                            placeholder={t('select-attribute-type')}
                            value={attributeType}
                            options={attributeTypesOptions}
                            error={errorObj.attributeType}
                            onChange={(e) => {
                                setAttributeType(e.target.value);
                                setErrorObj({ ...errorObj, attributeType: e.target.value ? '' : 'error-attribute-type-required' })
                            }}                       
                        />
                    </Col>
                    <Col>
                        <SwitchAtom 
                            label={t('required')}
                            type="switch"
                            checked={isRequired} 
                            onChange={(e) => {
                                console.log(e);
                                setIsRequired(e.target.checked);
                            }} />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('sap-identifier')}
                            value={sapIdentifier}
                            error={errorObj.label}
                            onChange={(e) => {
                                setSapIdentifier(e.target.value);
                                setErrorObj({...errorObj, 
                                    sapIdentifier: e.target.value ? '' : 'error-sap-identifier-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddSubAttributeModal;
