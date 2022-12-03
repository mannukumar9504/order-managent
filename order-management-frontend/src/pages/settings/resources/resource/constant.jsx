const getResourceTableColumns = (t, onResourceEdit, onResourceDelete) => {
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
                    onClick={() => onResourceEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    onClick={() => onResourceDelete(row, rowIndex)}
                    className="mx-2">
                    {t('delete')}
                </p>
            </div>
        }
    }];
}
const manufactureOptions = [
    { 
        value: 1, 
        label: "maufacture"
    }, 
    { 
        value: 2, 
        label: "maufacture2"
    }
];

const typeOptions = [
    {
        value: 1, 
        label: "type"
    }, 
    { 
        value: 2, 
        label: "type1"
    }
];
    
const locationOptions = [
    { 
        value: 1, 
        label: "location1"
    }, 
    { 
        value: 2, 
        label: "location2"
    }
];
const categoryOptions = [
    { 
        value: 1, 
        label: "category"
    }, 
    { 
        value: 2, 
        label: "category2"
    }
];



export {
    getResourceTableColumns,
    manufactureOptions, 
    typeOptions,
    locationOptions,
    categoryOptions
}