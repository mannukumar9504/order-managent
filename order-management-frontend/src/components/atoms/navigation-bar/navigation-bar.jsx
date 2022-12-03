import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Container } from "react-bootstrap";


function NavigationBarAtom(props) {
    const { children } = props;
    return (
        <Navbar bg="light" variant="light" className="text-body">
            <Container>
                <Nav className="me-auto text-uppercase text-body">
                    {children}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBarAtom;
