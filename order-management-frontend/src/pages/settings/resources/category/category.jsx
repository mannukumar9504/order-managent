import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import FilterBar from "../../../../components/molecule/filter-bar/filter-bar";
import { TableAtom, ModalAtom } from '../../../../components/atoms/atom';
import { getCategoryTableColumns } from './constant';
import { getSearchAddFilter } from '../../../../utils/get-filter-items';
import { searchData } from '../../../../utils/search';
import { setting } from '../../../../store/services/index';
import { showToast, getFormattedDate } from '../../../../utils/method';
import AddCategoryModal from './add/add-category';
    
function ResourceCategoryPage() {
    const { t } = useTranslation();
    const [categoryModalView, setCategoryModalView] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({});
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const filterItems = getSearchAddFilter(t, { addTextKey: 'add-category' });
    const [leftFilterItems, setLeftFilterItems] = useState(filterItems.left || []);
    const [rightFilterItems] = useState(filterItems.right || []);
    const [categoryList, setCategoryList] = useState([]);
    const [filterdCategoryList, setFilterdCategoryList] = useState([]);
    const fetchCategories = async () => {
        try{
            let result = await setting.getResourceCategory();
            result = (result?.data || []).map((record) => {
                return {
                    ...record,
                    provided: getFormattedDate(record.createdAt)
                }
            })
            setCategoryList(result);
            setFilterdCategoryList(result);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const onCategoryEdit = (row, rowIndex) => {
        setSelectedCategory(row);
        setCategoryModalView('edit');
    };

    const onCategoryDelete = (row, rowIndex) => {
        setSelectedCategory(row);
        setShowdeleteModal(true);
    }
    const onDeleteCategory = async () => {
        try {
            const res = await setting.deleteResourceCategory(selectedCategory?.id);
            showToast(t(res?.message), { type: 'success' });
            fetchCategories();
            setShowdeleteModal(false);
        } catch(error) {
            showToast(t(error?.message), { type: 'error' });
        }
    }

    const onAddCategory = async (categoryInfo) => {
        try{
            if (categoryModalView === 'add') {
                const res = await setting.addResourceCategory({
                    name: categoryInfo.name
                });
                showToast(t(res?.message), { type: 'success' });
            } else if (categoryModalView === 'edit') {
                const res = await setting.updateResourceCategory({
                    name: categoryInfo.name
                }, categoryInfo.id);
                showToast(t(res?.message), { type: 'success' });
            }  
            fetchCategories();
            setCategoryModalView('');  
        } catch(error){
            showToast(t(error?.message), { type: 'error' });
        }
    }
    const categoryColumns = getCategoryTableColumns(t, onCategoryEdit, onCategoryDelete);

    const onFilterAction = (index, key, info) => {
        if (key === 'search') {
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
            const filterCategoryList = searchData(info?.value, categoryList, categoryColumns.slice(0, -1));
            setCategoryList(filterCategoryList);
        }
        if (key === 'add') {
            setSelectedCategory({});
            setCategoryModalView('add');
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
                data={ filterdCategoryList } 
                columns={categoryColumns} 
            />

            {categoryModalView && <AddCategoryModal
                mode={categoryModalView}
                categoryInfo={selectedCategory}
                show
                onClose={() => {setCategoryModalView(''); } }
                onSubmit={onAddCategory}
            />}
            <ModalAtom 
                title={t('delete-category')} 
                body={<p>{t('delete-category-warning')}</p>}
                saveText = "delete"
                show={showDeleteModal} 
                handleClose={() => setShowdeleteModal(false) }
                handleSubmit={onDeleteCategory}
            />
        </>
    );
}

export default ResourceCategoryPage;
