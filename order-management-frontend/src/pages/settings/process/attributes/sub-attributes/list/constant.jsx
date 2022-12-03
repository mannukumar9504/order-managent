const getProcessAttributesTableColumns = (t, onSubAttributeEdit, onSubAttributeDelete) => {
    return [{
        dataField: 'provided',
        text: t('provided'),
        sort: true
    }, {
        dataField: 'label',
        text: t('name'),
        sort: true
    },
    {
        text: t('action'),
        formatter: (cell, row, rowIndex) => {
            return <div className="d-flex text-uppercase">   
                <p role="button" 
                    onClick={() => onSubAttributeEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    onClick={() => onSubAttributeDelete(row, rowIndex)}
                    className="mx-2">
                    {t('delete')}
                </p>
            </div>
        }
    }];
}

export {
    getProcessAttributesTableColumns
}