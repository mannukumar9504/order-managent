import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TextFieldAtom, ButtonAtom } from '../../../components/atoms/atom';

import './forgot-password.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [errorObj, setErrorObj] = useState({
        email: ''
    });

    const forgotPassword = async () => {
        let localErrorObj = {};
        if (!email) {
            localErrorObj.email = 'error-email-required';
        }
        setErrorObj({...localErrorObj});
        const hasError = Object.keys(localErrorObj).length ;
        if (!hasError){
            navigate('/resetPassword');
        }
        
    }
    return (
        <div className="auth">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>{t('forgot-password')}</h3>
                    <div className="mb-3">
                        <TextFieldAtom 
                            label={t('email-address')}
                            type="email"
                            placeholder={t('enter-email')}
                            value={email}
                            error={errorObj.email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorObj({ ...errorObj, email: e.target.value ? '' : 'error-email-required' })
                            }}
                        />
                    </div>
                    <div className="d-grid">
                        <ButtonAtom onClick = {forgotPassword}>
                            {t('recover-password')}
                        </ButtonAtom>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPasswordPage;
