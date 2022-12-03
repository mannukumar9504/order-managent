import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setting } from '../../../../../store/services/index';

import { TextFieldAtom, ModalAtom, DropdownAtom } from "../../../../../components/atoms/atom";


function AddResourceModal(props) {
    const { show, onClose, onSubmit, mode, resouceInfo = {} } = props;
    const { t } = useTranslation();
    const [name, setName] = useState(resouceInfo?.name ? resouceInfo.name: '');
    const [category, setCategory] = useState(resouceInfo?.category?.id ? resouceInfo.category?.id: '');
    const [manufacture, setManufacture] = useState(resouceInfo?.manufacturer?.id ? resouceInfo.manufacturer?.id: '');
    const [type, setType] = useState(resouceInfo?.type?.id ? resouceInfo.type?.id: '');
    const [location, setLocation] = useState(resouceInfo?.location?.id ? resouceInfo.location?.id: '');

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [manufactureOptions, setManufactureOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const fetchDropDownOptions = async () => {
        try {
            const categoryResult = await setting.getResourceCategory();
            setCategoryOptions((categoryResult.data || []).map((category) => { 
                return {
                    label: category.name,
                    value: category.id,
                }
            }));

            const manufactureResult = await setting.getResourceManufacture();
            setManufactureOptions((manufactureResult.data || []).map((manufacture) => { 
                return {
                    label: manufacture.name,
                    value: manufacture.id,
                }
            }));
            
            const typeResult = await setting.getResourceType();
            setTypeOptions((typeResult.data || []).map((type) => { 
                return {
                    label: type.name,
                    value: type.id,
                }
            }));
            const locationResult = await setting.getLocation();
            setLocationOptions((locationResult.data || []).map((location) => { 
                return {
                    label: location.name,
                    value: location.id,
                }
            }));
                        
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDropDownOptions();
    }, []);

    const [errorObj, setErrorObj] = useState({
        name: '',
        category: '',
        manufacture: '',
        type: '',
        location: ''
    });
    const onAddResource = () => {
        let localErrorObj = {};
        if (!name) {
            localErrorObj.name = 'error-resource-name-required';
        }
        if (!category) {
            localErrorObj.category = 'error-resource-category-required';
        }
        if (!manufacture) {
            localErrorObj.manufacture = 'error-resource-manufacture-required';
        }
        if (!type) {
            localErrorObj.type = 'error-resource-type-required';
        }
        if (!location) {
            localErrorObj.location = 'error-resource-location-required';
        }
        setErrorObj({...localErrorObj});
        const hasError = Object.keys(localErrorObj).length ;
        if (!hasError){
            onSubmit({
                ...resouceInfo,
                name,
                category,
                manufacture,
                type,
                location,
            })
        }       
    };
    return (
        <ModalAtom 
            title={t(mode === 'add' ? 'add-resource' : 'edit-resource')}
            show={show} 
            handleClose={onClose}
            handleSubmit={onAddResource}
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
                                setErrorObj({ ...errorObj, name: e.target.value ? '' : 'error-resource-name-required' })
                            }}
                        />
                    </Col>
                    <Col>
                        <DropdownAtom 
                            placeholder={t('select-category')}
                            value={category}
                            required
                            options= {categoryOptions}
                            error={errorObj.category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setErrorObj({ ...errorObj, category: e.target.value ? '' : 'error-resource-category-required' })
                            }}                        
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <DropdownAtom 
                            type="text"
                            placeholder={t('select-manufacture')}
                            value={manufacture}
                            required
                            options= {manufactureOptions}
                            error={errorObj.manufacture}
                            onChange={(e) => {
                                setManufacture(e.target.value);
                                setErrorObj({ ...errorObj, manufacture: e.target.value ? '' : 'error-resource-manufacture-required' })
                            }}
                        />
                    </Col>
                    <Col>
                        <DropdownAtom 
                            placeholder={t('select-type')}
                            value={type}
                            required
                            options= {typeOptions}
                            error={errorObj.type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setErrorObj({ ...errorObj, type: e.target.value ? '' : 'error-resource-type-required' })
                            }}                        
                        />
                    </Col>
                </Row>
                <Row className="mt-4 mb-4">
                    <Col>
                        <DropdownAtom 
                            placeholder={t('select-location')}
                            value={location}
                            required
                            options= {locationOptions}
                            error={errorObj.location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                setErrorObj({ ...errorObj, location: e.target.value ? '' : 'error-resource-location-required' })
                            }}                       
                        />
                    </Col>
                </Row>
            </Container>}
        />
    );
}

export default AddResourceModal;
