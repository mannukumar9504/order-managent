import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setting } from '../../../../store/services/index';


import { TextFieldAtom, ModalAtom, MultiSelectAtom } from "../../../../components/atoms/atom";

function AddOrganisationModal(props) {
    const { show, onClose, onSubmit, mode, orgInfo = {} } = props;
    const { t } = useTranslation();

    const [name, setName] = useState(orgInfo?.name ? orgInfo.name: '');
    const [groups, setGroups] = useState(orgInfo?.groups ? orgInfo.groups: []);
    const [process, setProcess] = useState(orgInfo?.processes ? orgInfo.processes: []);

    const [groupsOptions, setGroupsOptions] = useState([]);
    const [processOptions, setProcessOptions] = useState([]);

    const [errorObj, setErrorObj] = useState({
        name: '',
        groups: '',
        process: ''
    });
    const fetchDropDownOptions = async () => {
        try {
            const groupResult = await setting.getGroup();
            setGroupsOptions((groupResult.data || []).map((group) => { 
                return {
                    label: group.name,
                    value: group.id,
                }
            }));
            
            const processResult = await setting.getProcess();
            setProcessOptions((processResult.data || []).map((process) => { 
                return {
                    label: process.name,
                    value: process.id,
                }
            }));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDropDownOptions();
    }, []);

    const onAddOrganisation = () => {
        let localErrorObj = {};
        if (!name) {
            localErrorObj.name = 'error-organisation-name-required';
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
                ...orgInfo,
                name,
                groups: getIds(groups),
                process: getIds(process)
            })
        }       
    };

    return (
        <ModalAtom 
            title={t(mode === 'add' ?'add-organisation': 'edit-organisation')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddOrganisation}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('name')}
                            required
                            value={name}
                            error={errorObj.name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrorObj({ ...errorObj, name: e.target.value ? '' : 'error-organisation-name-required' })
                            }}
                        />
                    </Col>
                    <Col>
                        <MultiSelectAtom
                            selectedOption={groups}
                            placeholder={t('select-group')}
                            options = {groupsOptions}
                            error={errorObj.groups}
                            onChange={(e) => {
                                setGroups(e);
                            }}/>
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <MultiSelectAtom
                            selectedOption={process}
                            placeholder={t('select-process')}
                            options={processOptions}
                            error={errorObj.process}
                            onChange={(e) => {
                                console.log(e);
                                setProcess(e);
                            }}/>
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddOrganisationModal;
