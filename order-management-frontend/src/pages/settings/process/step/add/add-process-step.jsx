import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom, MultiSelectAtom } from "../../../../../components/atoms/atom";
import { setting } from '../../../../../store/services/index';

function AddProcessStepModal(props) {
    const { show, onClose, onSubmit, mode, processStepInfo = {}  } = props;
    const { t } = useTranslation();
    const [position, setPosition] = useState(processStepInfo?.position || '');
    const [description, setDescription] = useState(processStepInfo?.description || '');
    const [label, setLabel] = useState(processStepInfo?.label || '');
    const [attribute, setAttribute] = useState(processStepInfo?.attribute || '');
    const [resource, setResource] = useState(processStepInfo?.resource || []);
    const [resourceOptions, setResourceOptions] = useState([]);
    const [errorObj, setErrorObj] = useState({
        position: '',
        description: '',
        label: '',
        attribute: '',
        resource: ''
    })

    const fetchDropDownOptions = async () => {
        try {
            const resourceResult = await setting.getResource();
            setResourceOptions((resourceResult.data || []).map((resource) => { 
                return {
                    label: resource.name,
                    value: resource.id,
                }
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDropDownOptions();
    }, []);

    const onAddProcessStep = () => {
        let localErrorObj = {};
        if (!position) {
            localErrorObj.position = 'error-process-step-position-required';
        }
        if (!description) { 
            localErrorObj.description = 'error-process-step-description-required';
        }
        if (!label) {
            localErrorObj.label = 'error-process-step-label-required';
        }
        if (!attribute) {
            localErrorObj.attribute = 'error-process-step-attribute-required';
        }
        if (!resource.length) {
            localErrorObj.resource =  'error-resource-required';
        }
        setErrorObj({...localErrorObj});
        const hasError = Object.keys(localErrorObj).length ;
        if (!hasError){
            const getIds = (inputArray) => {
                const resultantId = [];
                inputArray.forEach((option) => resultantId.push(option.value));
                return resultantId;
            }
            onSubmit({
                ...processStepInfo,
                position,
                description,
                label,
                attribute,
                resource: getIds(resource)
            })
        }       
    };

    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-process-step' : 'edit-process-step')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddProcessStep}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="number"
                            placeholder={t('position')}
                            value={position}
                            required
                            error={errorObj.position}
                            onChange={(e) => {
                                setPosition(e.target.value);
                                setErrorObj({...errorObj, 
                                    position: e.target.value ? '' : 'error-process-step-position-required'
                                })
                            }}
                        />
                    </Col>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('description')}
                            value={description}
                            required
                            error={errorObj.description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrorObj({...errorObj, 
                                    description: e.target.value ? '' : 'error-process-step-description-required'
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
                            required
                            error={errorObj.label}
                            onChange={(e) => {
                                setLabel(e.target.value);
                                setErrorObj({...errorObj, 
                                    label: e.target.value ? '' : 'error-process-step-label-required'
                                })
                            }}
                        />
                    </Col>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('attribute')}
                            value={attribute}
                            required
                            error={errorObj.attribute}
                            onChange={(e) => {
                                setAttribute(e.target.value);
                                setErrorObj({...errorObj, 
                                    attribute: e.target.value ? '' : 'error-process-step-attribute-required'
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <MultiSelectAtom
                            selectedOption={resource}
                            placeholder={t('select-resource')}
                            options={resourceOptions}
                            error={errorObj.resource}
                            required
                            onChange={(e) => {
                                setResource(e);
                                setErrorObj({ ...errorObj, resource: e && e.length ? '' : 'error-resource-required' })
                            }}/>
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddProcessStepModal;
