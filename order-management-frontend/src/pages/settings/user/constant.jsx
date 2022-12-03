const getUserTableColumns = (t, onUserEdit, onUserDelete) => {
    return [{
        dataField: 'provided',
        text: t('provided'),
        sort: true,
    }, {
        dataField: 'email',
        text: t('username'),
        sort: true
    }, {
        dataField: 'name',
        text: t('name'),
        sort: true,
        formatter: (cell, row) => {
            return `${row.lastName}, ${row.firstName}` 
        }
    },
    {
        dataField: 'contactNumber',
        text: t('contact-data'),
        sort: true
    },
    {
        dataField: 'role.name',
        text: t('reporting-role'),
        sort: true
    },
    {
        dataField: 'operatingMaterial',
        text: t('operating-material'),
        sort: true,
        formatter: (cell, row) => {
            let operString = '';
            (row?.operatingMaterials || []).forEach((oper) => {
                operString += `${oper?.name}, `;
            })
            return operString.substring(0, operString.length - 2);
        }
    },
    {
        text: t('action'),
        formatter: (cell, row, rowIndex) => {
            return <div className="d-flex text-uppercase">   
                <p role="button" 
                    onClick={() => onUserEdit(row, rowIndex)}>
                    {t('edit')}
                </p>
                <p role="button" 
                    onClick={() => onUserDelete(row, rowIndex)}
                    className="mx-2">
                    {t('delete')}
                </p>
            </div>
        }
    }];
}

export {
    getUserTableColumns,
}