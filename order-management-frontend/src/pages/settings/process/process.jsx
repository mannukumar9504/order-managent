import React, { useState } from "react";
import ProcessList from "./list/list-process";
import ProcessStepList from "./step/list/list-process-step";
import ProcessAttributes from "./attributes/process-attributes";

function ProcessSettingPage() {
    const [view, setView] = useState('list');
    const [selectedProcess, setSelectedProces] = useState({});
    return (
        <>
            {view === 'list' && 
            <ProcessList 
                toggleProcessListView={(selectedKey, row) => {
                    setSelectedProces(row);
                    setView(selectedKey);
                }} />}
            {view === 'process-step' && <ProcessStepList 
                onBack={() => {
                    setView('list');
                    setSelectedProces({});
                }}
                selectedProcess={selectedProcess} />}
            
            {view === 'process-attributes' && <ProcessAttributes 
                onBack={() => {
                    setView('list');
                    setSelectedProces({});
                }}
                selectedProcess={selectedProcess} />}
        </>
    );
}

export default ProcessSettingPage;
