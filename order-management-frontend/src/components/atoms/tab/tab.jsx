import React from "react";

function TabAtom(props) {
    const { selectedTab, tabs, onTabClick } = props;

    const commonStyle = { width: 100, marginRight: 5, paddingTop: 5 };
    return <div className="d-flex">
        {tabs.map((tab) => {
            return <div
                role="button"
                style={selectedTab === tab.key ? {...commonStyle, background: '#ffc107', color: 'white' } : {...commonStyle, background: '#f8f9fa', color: 'black' }}
                className="text-center"
                onClick={() => onTabClick(tab.key)}>{tab.label}</div>
        })}
    </div>;

}

export default TabAtom;
