import React, { useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TextFieldAtom, ButtonAtom } from '../../../components/atoms/atom';
import { auth } from '../../../store/services/index';
import { AuthContext } from '../../../contexts/AuthProvider';

import './login.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        auth: authData,
        setAuth,
    } = useContext(AuthContext);

    const onLogin = async () => {
        try{
            const result = await auth.signIn({
                userId: email,
                password: password
            });
            if (result && result.data && result.data.token) {
                localStorage.setItem('token', result.data.token);
                setAuth({ ...authData, token: result.data.token });
                navigate('/settings/user');

            }
        } catch(error){
            console.log(error);
        }
    }
    return (
        <div className="auth">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>{t('sign-in')}</h3>
                    <div className="mb-3">
                        <TextFieldAtom 
                            label={t('email-address')}
                            type="email"
                            placeholder={t('enter-email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <TextFieldAtom 
                            label={t('password')}
                            type="password"
                            placeholder={t('enter-password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <ButtonAtom onClick={onLogin}>
                            {t('login')}
                        </ButtonAtom>
                    </div>
                    <p className="forgot-password text-right">
                        <strong className="text-primary" onClick={() => navigate('/forgotPassword')}>{t('forgot-password')}</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;
