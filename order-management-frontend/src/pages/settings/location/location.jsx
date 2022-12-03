import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { FilterBar } from "../../../components/molecule/molecule";
import { TableAtom, ModalAtom } from '../../../components/atoms/atom';
import { getLocationTableColumns } from './constant';
import AddLocationModal from "./add/add-location";
import { getSearchAddFilter } from '../../../utils/get-filter-items';
import { searchData } from '../../../utils/search';
import { setting } from '../../../store/services/index';
import { showToast, getFormattedDate } from '../../../utils/method';

function LocationSettingPage() {
    const { t } = useTranslation();
    const [locationModalView, setLocationModalView] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-location' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [locationList, setLocationsList] = useState([]);
    const [filteredLocationList, setFilteredLocationList] = useState([]);

    const fetchLocation = async () => {
        try{
            let result = await setting.getLocation();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setLocationsList(result);
            setFilteredLocationList(result);
            console.log(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchLocation();
    }, []);

    const onLocationEdit = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedLocation(row);
        setLocationModalView('edit');
    };

    const onLocationDelete = (row, rowIndex) => {
        console.log('row', row, rowIndex);
        setSelectedLocation(row);
        setShowdeleteModal(true);
    }
    
    const onDeleteLocation = async () => {
        try {
            const res = await setting.deleteLocation(selectedLocation.id);
            showToast(t(res?.message), { type: 'success' });
            fetchLocation();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }


    const onAddLocation = async (locationInfo) => {
        try{
            if (locationModalView === 'add') {
                const res = await setting.addLocation({
                    name: locationInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (locationModalView === 'edit') {
                const res = await setting.updateLocation({
                    name: locationInfo.name
                }, locationInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchLocation();
            setLocationModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }

    }
    const locationsColumns = getLocationTableColumns(t, onLocationEdit, onLocationDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filteredRoleList = searchData(info?.value, locationList, locationsColumns.slice(0, -1));
            setFilteredLocationList(filteredRoleList);
        }
        if (key === 'add') {
            setSelectedLocation({});
            setLocationModalView('add');
        }
    };

    return (
        <>
            <FilterBar 
                leftItems={leftFilterItems}
                rightItems={rightFilterItems}
                onFilterAction={onFilterAction} />

            <TableAtom 
                keyField='id' 
                data={ filteredLocationList } 
                columns={locationsColumns}
            />
            
            {locationModalView && <AddLocationModal 
                mode={locationModalView}
                locationInfo={selectedLocation}
                show
                onClose={() => {setLocationModalView('');  setSelectedLocation('')} }
                onSubmit={onAddLocation}
            />}
            <ModalAtom 
                title={t('delete-location')}
                body = {<p>{t('delete-location-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteLocation}
            />
        </>
    );
}

export default LocationSettingPage;
