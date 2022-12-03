import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { TableAtom } from "../../../components/atoms/atom";
import FilterBar from "../../../components/molecule/filter-bar/filter-bar";
import { getArchiveTableColumns, getArchiveFilter } from './constant';

function ArchivePage() {
    const { t } = useTranslation();
    const [leftFilterItems, setLeftFilterItems] = useState(getArchiveFilter(t));
    const archiveColumns = getArchiveTableColumns(t);

    const onFilterAction = (index, key, info) => {
        if (key === 'date') {
            console.log(info);
            const localLeftFilterItems = [...leftFilterItems];
            localLeftFilterItems[0].value = info?.value;
            setLeftFilterItems(localLeftFilterItems);
        }
    };

    return <div>
        <FilterBar 
            leftItems={leftFilterItems}
            onFilterAction={onFilterAction}
        />
        <TableAtom 
            keyField='id' 
            data={[]} 
            columns={archiveColumns}
        />
    </div>

}

export default ArchivePage;
