import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import brandLogo from "../../../assets/images/brandLogo.jpg";

function BrandHeaderAtom() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onLogout = () => {
        navigate('/');
        localStorage.setItem('token', '');
    }
    return (
        <Navbar className="p-0">
            <Container>
                <Navbar.Brand className="p-0">
                    <p className="navbar-brand" role="button" onClick={() => navigate('/')}>
                        <img
                            src={brandLogo}
                            width="150%"
                            height={100}
                            alt="Logo here"
                            className="align-middle"
                        />
                    </p>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="mb-5 d-flex">
                        <p className="text-body">
                            <FaUserAlt />{" "}
                        </p>
                        <p className="text-body px-2">{t("users-steel")}</p>
                        <strong className="font-weight-bold text-warning ml-2 cursor-pointer" 
                            onClick={onLogout}
                            role="button">
                            {t("logout")}
                        </strong>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BrandHeaderAtom;
