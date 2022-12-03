import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TextFieldAtom, ButtonAtom } from '../../../components/atoms/atom';
import './reset-password.css';

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [errorObj, setErrorObj] = useState({
        newPassword: '',
        confirmPassword: ''
    });
 
    const resetPassword = async () => {
        let localErrorObj = {};
        if (!newPassword) {
            localErrorObj.newPassword = 'error-new-password-required';
        }
        if (!confirmPassword) {
            localErrorObj.confirmPassword = 'error-confirm-password-required';
        }
        setErrorObj({...localErrorObj});
        const hasError = Object.keys(localErrorObj).length ;
        if (!hasError){
            navigate('/');
        }
        
    }
    return (
        <div className="auth">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>{t('recover-password')}</h3>
                    <div className="mb-3">
                        <TextFieldAtom 
                            label={t('new-password')}
                            type="password"
                            placeholder={t('enter-password')}
                            value={newPassword}
                            error={errorObj.newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setErrorObj({ ...errorObj, newPassword: e.target.value ? '' : 'error-email-required' })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextFieldAtom 
                            label={t('confirm-password')}
                            type="password"
                            placeholder={t('enter-password')}
                            value={confirmPassword}
                            error={errorObj.confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorObj({ ...errorObj, confirmPassword: e.target.value ? '' : 'error-email-required' })
                            }}                       
                        />
                    </div>
                    <div className="d-grid">
                        <ButtonAtom onClick = {resetPassword}>
                            {t('recover-password')}
                        </ButtonAtom>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPasswordPage;
