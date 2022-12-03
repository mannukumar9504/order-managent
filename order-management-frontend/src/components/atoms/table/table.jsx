import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


function TableAtom(props) {
    const { keyField, data, columns, hidePagination = false, customPagination, ...rest } = props;
    
    return (
        <div className="mt-3">
            <BootstrapTable 
                headerClasses="text-uppercase"
                keyField={keyField || 'id'} 
                data={data || []} 
                columns={columns || ''}
                pagination={ hidePagination ? false : customPagination ? customPagination : paginationFactory() }
                {...rest} />
        </div>
    );
}

export default TableAtom;
