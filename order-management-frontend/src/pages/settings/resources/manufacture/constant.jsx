const manufacture = [{
    id: 1,
    provided: '11.06.2022',
    name: 'manufacture1',
},
{
    id: 2,
    provided: '12.06.2022',
    name: 'manufacture2',
}
];

const getManufactureTableColumns = (t, onManufactureEdit, onManufactureDelete) => {
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
                    onClick={() => onManufactureEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    onClick={() => onManufactureDelete(row, rowIndex)}
                    className="mx-2">
                    {t('delete')}
                </p>
            </div>
        }
    }];
}



export {
    manufacture,
    getManufactureTableColumns
}