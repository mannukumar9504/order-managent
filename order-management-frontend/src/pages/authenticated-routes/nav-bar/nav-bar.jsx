import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { GoDashboard } from "react-icons/go";
import { BiGridSmall } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

import { NavigationBarAtom } from '../../../components/atoms/atom';

function NavBar(props) {
    const { onNavigationItemClick } = props;
    const { t } = useTranslation();
    const location = useLocation();
    const [selectedSettingRoute, setSelectedSettingRoute] = useState(() => {
        if (location.pathname.includes('settings')) {
            return location?.pathname?.substring(1)?.replace('/', '-');
        }
        return 'settings';
    });
    
    return (
        <NavigationBarAtom>
            <Nav.Link onClick={() => onNavigationItemClick('dashboard')}>
                <GoDashboard className="mx-2" />
                {t("dashboard")}
            </Nav.Link>
            <Nav.Link onClick={() => onNavigationItemClick('operations/planning')}>
                <BiGridSmall className="mx-2" />
                {t("operations")}
            </Nav.Link>
            <NavDropdown 
                title={<>
                    <BiGridSmall className="mx-2" />
                    {t(selectedSettingRoute)}
                </>} 
                id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => {
                    setSelectedSettingRoute('settings-user');
                    onNavigationItemClick('settings/user');
                }}>
                    {t('user')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    setSelectedSettingRoute('settings-role');
                    onNavigationItemClick('settings/role');
                }}>
                    {t('role')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    setSelectedSettingRoute('settings-location');
                    onNavigationItemClick('settings/location');
                }}>
                    {t('location')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    setSelectedSettingRoute('settings-group');
                    onNavigationItemClick('settings/group');
                }}>
                    {t('group')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    setSelectedSettingRoute('settings-organisation');
                    onNavigationItemClick('settings/organisation');
                }}>
                    {t('organisation')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    setSelectedSettingRoute('settings-process');
                    onNavigationItemClick('settings/process');
                }}>
                    {t('process')}
                </NavDropdown.Item>
                <NavDropdown 
                    title={<>
                        {t("resources")}
                    </>} 
                    id="resourcesDropdown"> 
                    <NavDropdown.Item onClick={() => {
                        setSelectedSettingRoute('settings-resource-category');
                        onNavigationItemClick('settings/resources/category');
                    }}>
                        {t('category')}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {
                        setSelectedSettingRoute('settings-resources-manufacture');
                        onNavigationItemClick('settings/resources/manufacture');
                    }}>
                        {t('manufacture')}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {
                        setSelectedSettingRoute('settings-resource-type');
                        onNavigationItemClick('settings/resources/type');
                    }}>
                        {t('type')}
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {
                        setSelectedSettingRoute('settings-resource-resource');
                        onNavigationItemClick('settings/resources/resource');
                    }}>
                        {t('resource')}
                    </NavDropdown.Item>
                </NavDropdown>
            </NavDropdown>
        </NavigationBarAtom>
    );
}

export default NavBar;
