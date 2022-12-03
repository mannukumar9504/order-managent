const getCategoryTableColumns = (t, onCategoryEdit, onCategoryDelete) => {
    return [{
        dataField: 'provided',
        text: t('provided'),
        sort: true,
    },{
        dataField: 'name',
        text: t('name'),
        sort: true
    },
    {
        text: t('action'),
        formatter: (cell, row, rowIndex) => {
            return <div className="d-flex text-uppercase">   
                <p role="button" 
                    onClick={() => onCategoryEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    onClick={() => onCategoryDelete(row, rowIndex)}
                    className="mx-2">
                    {t('delete')}
                </p>
            </div>
        }
    }];
}

export {
    getCategoryTableColumns
}