const getProcessStepResourceTableColumns = (t, onCheckBoxSelection) => {
    return [{
        dataField: 'category.name',
        text: t('category'),
    },{
        dataField: 'manufacturer.name',
        text: t('manufacturer'),
    },{
        dataField: 'type.name',
        text: t('type'),
    },{
        dataField: 'name',
        text: t('name'),
    },{
        dataField: 'location.name',
        text: t('location'),
    },
    ];
}

export {
    getProcessStepResourceTableColumns
}