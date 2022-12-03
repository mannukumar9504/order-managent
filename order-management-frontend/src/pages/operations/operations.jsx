import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ButtonAtom, TabAtom } from '../../components/atoms/atom';
import { getOperationTabs } from './constant';

function OperationPage() {
    const [selectedTab, setSelectedTab] = useState('planning');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onArchive = () => {
        setSelectedTab('archive');
        navigate('/operations/archive');
    };

    return <div className="d-flex justify-content-between mt-3">
        <TabAtom 
            tabs={getOperationTabs(t)}
            selectedTab={selectedTab}
            onTabClick={(tabKey) => {
                navigate(`/operations/${tabKey}`);
                setSelectedTab(tabKey);
            }} />

        <ButtonAtom 
            className={selectedTab === 'archive' ? "btn btn-warning text-white" : "btn btn-seconday" }
            onClick={() => onArchive()}>
            {t('archive')}
        </ButtonAtom>
    </div>

}

export default OperationPage;
