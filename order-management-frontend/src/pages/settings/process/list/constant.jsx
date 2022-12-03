const getProcessTableColumns = (t, onProcessEdit, onProcessDelete, onProcessStep, onProcessAttributes) => {
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
                    onClick={() => onProcessEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    className="mx-2"
                    onClick={() => onProcessStep(row, rowIndex)}>
                    {t('process-step')}
                </p>
                <p role="button"
                    onClick={() => onProcessAttributes(row, rowIndex)}>
                    {t('attributes')}
                </p>
                <p role="button"
                    className="mx-2"
                    onClick={() => onProcessDelete(row, rowIndex)}>
                    {t('delete')}
                </p>
            </div>
        }
    }];
}

export {
    getProcessTableColumns
}