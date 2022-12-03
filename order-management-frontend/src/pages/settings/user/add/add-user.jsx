import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TextFieldAtom, ModalAtom, DropdownAtom, MultiSelectAtom } from "../../../../components/atoms/atom";
import { setting } from '../../../../store/services/index';

function AddUserModal(props) {
    const { show, onClose, onSubmit, mode, userInfo = {} } = props;
    const { t } = useTranslation();
    // storing form fields
    const [firstName, setFirstName] = useState(userInfo?.firstName ? userInfo.firstName: '');
    const [lastName, setLastName] = useState(userInfo?.lastName ? userInfo.lastName: '');
    const [email, setEmail] = useState(userInfo?.email ? userInfo.email: '');
    const [password, setPassword] = useState('');
    const [contactNumber, setMobileNumber] = useState(userInfo?.contactNumber ? userInfo.contactNumber: '');
    const [operatingMaterial, setOpertaingMaterial] = useState(userInfo?.operatingMaterial ? userInfo.operatingMaterial: []);
    const [role, setRole] = useState(userInfo?.role?.id ? userInfo?.role?.id: '');
    const [group, setGroup] = useState(userInfo?.group?.id ? userInfo.group?.id: '');
    // storing error obj
    const [errorObj, setErrorObj] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contactNumber: '',
        operatingMaterial: '',
        role: '',
        group: ''
    });
    // storing dropdown options
    const [roleOptions, setRoleOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [operatingMaterialOptions, setOpertaingMaterialOptions] = useState([]);

    const fetchDropDownOptions = async () => {
        try {
            const roleResult = await setting.getRole();
            setRoleOptions((roleResult.data || []).map((role) => { 
                return {
                    label: role.name,
                    value: role.id,
                }
            }));

            const groupResult = await setting.getGroup();
            setGroupOptions((groupResult.data || []).map((group) => { 
                return {
                    label: group.name,
                    value: group.id,
                }
            }));
            
            const operatingMaterialResult = await setting.getResource();
            setOpertaingMaterialOptions((operatingMaterialResult.data || []).map((operMatOpt) => { 
                return {
                    label: operMatOpt.name,
                    value: operMatOpt.id,
                }
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDropDownOptions();
    }, []);

    const onAddUser = () => {
        let localErrorObj = {};
        if (!firstName) {
            localErrorObj.firstName = 'error-first-name-required';
        }
        if (!lastName) { 
            localErrorObj.lastName = 'error-last-name-required';
        }
        if (!email) {
            localErrorObj.email = 'error-email-required';
        }
        if (!password && mode === 'add') {
            localErrorObj.password = 'error-password-required';
        }
        if (!contactNumber) {
            localErrorObj.contactNumber = 'error-mobile-number-required';
        }
        if (!role) {
            localErrorObj.role = 'error-reporting-role-required';
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
                ...userInfo,
                firstName,
                lastName,
                email,
                password,
                contactNumber,
                operatingMaterial: getIds(operatingMaterial),
                role,
                group
            })
        }       
    };


    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-user' : 'edit-user')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddUser}
            body={ <Container>
                <Row>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('first-name')}
                            required
                            value={firstName}
                            error={errorObj.firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                setErrorObj({ ...errorObj, firstName: e.target.value ? '' : 'error-first-name-required' })
                            }}
                        />
                    </Col>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('last-name')}
                            required
                            value={lastName}
                            error={errorObj.lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                setErrorObj({ ...errorObj, lastName: e.target.value ? '' : 'error-last-name-required' })
                            }}                        
                        />
                    </Col>
                  
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('email-address')}
                            required
                            value={email}
                            error={errorObj.email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorObj({ ...errorObj, email: e.target.value ? '' : 'error-email-required' })
                            }} 
                        />
                    </Col>
                    <Col>
                        <TextFieldAtom 
                            type="text"
                            placeholder={t('mobile-number')}
                            required
                            value={contactNumber}
                            error={errorObj.contactNumber}
                            onChange={(e) => {
                                setMobileNumber(e.target.value);
                                setErrorObj({ ...errorObj, contactNumber: e.target.value ? '' : 'error-mobile-number-required' })
                            }}                         
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                   
                    <Col>
                        <DropdownAtom 
                            placeholder={t('select-group')}
                            value={group}
                            options= {groupOptions}
                            error={errorObj.group}
                            onChange={(e) => {
                                setGroup(e.target.value);
                            }}                       
                        />
                       
                    </Col>
                    <Col>
                        <DropdownAtom 
                            placeholder={t('select-reporting-role')}
                            value={role}
                            required
                            options= {roleOptions}
                            error={errorObj.role}
                            onChange={(e) => {
                                setRole(e.target.value);
                                setErrorObj({ ...errorObj, role: e.target.value ? '' : 'error-reporting-role-required' })
                            }}                       
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <MultiSelectAtom
                            selectedOption={operatingMaterial}
                            placeholder={t('select-operating-material')}
                            options = {operatingMaterialOptions}
                            error={errorObj.operatingMaterial}
                            onChange={(e) => {
                                setOpertaingMaterial(e);
                            }}/>
                    </Col>
                    <Col>
                       
                        {mode === 'add' && <TextFieldAtom 
                            type="password"
                            placeholder={t('password')}
                            required
                            value={password}
                            error={errorObj.password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorObj({ ...errorObj, password: e.target.value ? '' : 'error-password-required' })
                            }} 
                        />}
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddUserModal;
