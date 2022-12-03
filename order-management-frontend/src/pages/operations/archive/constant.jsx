const getArchiveTableColumns = (t) => {
    return [{
        dataField: 'date',
        text: t('date'),
        sort: true
    },
    {
        dataField: 'customer',
        text: t('customer'),
        sort: true
    },
    {
        dataField: 'order',
        text: t('order'),
        sort: true
    },
    {
        dataField: 'position',
        text: t('position'),
        sort: true
    },
    {
        dataField: 'LKW',
        text: t('LKW'),
        sort: true
    },
    {
        dataField: 'quality',
        text: t('quality'),
        sort: true
    },
    {
        dataField: 'thickness',
        text: t('thickness'),
        sort: true
    },
    {
        dataField: 'storage-location',
        text: t('storage-location'),
        sort: true
    },
    {
        dataField: 'piece',
        text: t('piece'),
        sort: true
    },
    {
        dataField: 'thickness',
        text: t('thickness'),
        sort: true
    },
    {
        dataField: 'width',
        text: t('width'),
        sort: true
    },
    {
        dataField: 'length',
        text: t('length'),
        sort: true
    },
    {
        dataField: 'VO-P',
        text: t('VO-P'),
        sort: true
    },
    {
        dataField: 'US-P',
        text: t('US-P'),
        sort: true
    },
    {
        dataField: 'ABN',
        text: t('ABN'),
        sort: true
    }];
}

const getArchiveFilter = (t) => {
    return [
        {
            key: 'date',
            type: 'datepicker',
            label: t('select-date'), 
            value: '', 
        },
        { 
            key: 'period',
            type: 'dropdown', 
            label: t('select-period'), 
            value: '', 
            options: [{ 
                value: '1', 
                lablel: '22' 
            }]
        },
        { 
            key: 'department',
            type: 'dropdown', 
            label: t('select-department'), 
            value: '', 
            options: [{ 
                value: '1', 
                lablel: '22' 
            }]
        }
    ]
}
export {
    getArchiveTableColumns,
    getArchiveFilter,
}