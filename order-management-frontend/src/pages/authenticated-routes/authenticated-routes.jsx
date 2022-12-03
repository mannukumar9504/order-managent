import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { BrandHeaderAtom } from '../../components/atoms/atom';
import { AuthContext } from '../../contexts/AuthProvider';

import NavBar from "./nav-bar/nav-bar";

function AuthenticatedRoutes(props) {
    const { element } = props;
    const { loader } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/forgotPassword');
        }
    }, [localStorage.getItem('token')]);

    console.log('loader', loader);

    const onNavigationItemClick = (navigationKey) => {
        navigate(`/${navigationKey}`);
    };

    return (
        <>
            <BrandHeaderAtom />
            <NavBar onNavigationItemClick={onNavigationItemClick} />
            <Container>
                {element}
            </Container>

        </>
    );
}

export default AuthenticatedRoutes;
