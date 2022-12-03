const getOperationTabs = (t) => {
    return [{
        label: t('planning'),
        key: 'planning'
    },
    {
        label: t('release'),
        key: 'release'
    }, 
    {
        label: t('implement'),
        key: 'implement'
    }]
}
export {
    getOperationTabs,
}