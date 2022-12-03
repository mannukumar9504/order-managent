const type = [{
    id: 1,
    provided: '11.06.2022',
    name: 'Type',
},
{
    id: 2,
    provided: '12.06.2022',
    name: 'Type1',
}
];

const getTypeTableColumns = (t, onTypeEdit, onTypeDelete) => {
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
                    onClick={() => onTypeEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    onClick={() => onTypeDelete(row, rowIndex)}
                    className="mx-2">
                    {t('delete')}
                </p>
            </div>
        }
    }];
}



export {
    type,
    getTypeTableColumns
}