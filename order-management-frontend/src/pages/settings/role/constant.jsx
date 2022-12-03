
const getRoleTableColumns = (t, onRoleEdit, onRoleDelete) => {
    return [{
        dataField: 'provided',
        text: t('provided'),
        sort: true
    }, {
        dataField: 'name',
        text: t('role'),
        sort: true
    },
    // {
    //     text: t('action'),
    //     formatter: (cell, row, rowIndex) => {
    //         return <div className="d-flex text-uppercase">   
    //             <p role="button" 
    //                 onClick={() => onRoleEdit(row, rowIndex)}>
    //                 {t('edit')}
    //             </p>
    //             <p role="button" 
    //                 onClick={() => onRoleDelete(row, rowIndex)}
    //                 className="mx-2">
    //                 {t('delete')}
    //             </p>
    //         </div>
    //     }
    // }
    ];
}

export {
    getRoleTableColumns
}