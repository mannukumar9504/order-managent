const getProcessStepTableColumns = (t, onProcessStepEdit, onProcessStepDelete, onProcessStepResource) => {
    return [{
        dataField: 'attribute',
        text: t('attribute'),
        sort: true
    },
    {
        dataField: 'description',
        text: t('description'),
        sort: true
    },
    {
        dataField: 'label',
        text: t('label'),
        sort: true
    },
    {
        dataField: 'position',
        text: t('position'),
        sort: true
    },
    {
        text: t('action'),
        formatter: (cell, row, rowIndex) => {
            return <div className="d-flex text-uppercase">   
                <p role="button" 
                    onClick={() => onProcessStepEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button"
                    className="mx-2"
                    onClick={() => onProcessStepResource(row, rowIndex)}>
                    {t('resource')}
                </p>
                <p role="button"
                    onClick={() => onProcessStepDelete(row, rowIndex)}>
                    {t('delete')}
                </p>
            </div>
        }
    }];
}

export {
    getProcessStepTableColumns
}