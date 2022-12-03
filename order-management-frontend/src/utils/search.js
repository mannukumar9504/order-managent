const byString = (o, s) => {
    if (!s) {
        return;
    }
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const x = a[i];
        if (o && x in o) {
            o = o[x];
        } else {
            return;
        }
    }
    return o;
};

const getFieldValue = (rowData, columnDef) => (typeof rowData[columnDef.dataField] !== 'undefined'
    ? rowData[columnDef.dataField]
    : byString(rowData, columnDef.dataField));

export const searchData = (searchText, data, columns) => (data || []).filter((row) => columns.some((columnDef) => {
    const value = getFieldValue(row, columnDef);
    if (value) {
        return value
            .toString()
            .toUpperCase()
            .includes(searchText.toUpperCase());
    }
}));
