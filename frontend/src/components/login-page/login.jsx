import React, { useEffect, useRef, useState } from 'react';
import styles from './login.module.css'; // твій CSS модуль

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const btnLoginRef = useRef(null);
    const btnGoogleRef = useRef(null);
    const linkSignupLoginRef = useRef(null);
    const [isSignupMode, setIsSignupMode] = useState(false);

    // Captcha refs
    const captchaRef = useRef(null);
    const triggerCaptchaRef = useRef(null);
    const signupCaptchaRef = useRef(null);
    const webAuthRef = useRef(null);

    // Вставляємо конфіг — заміни цей рядок на свій base64 config
    const base64Config = '@@config@@'; // постав свій base64 конфіг сюди

    useEffect(() => {
        if (!window.auth0) {
            console.error('Auth0 library not loaded');
            return;
        }

        const config = JSON.parse(decodeURIComponent(escape(window.atob(base64Config))));

        // Приведення leeway до int
        if (config.internalOptions.leeway) {
            const conv = parseInt(config.internalOptions.leeway);
            if (!isNaN(conv)) config.internalOptions.leeway = conv;
        }

        const params = {
            overrides: {
                __tenant: config.auth0Tenant,
                __token_issuer: config.authorizationServer.issuer,
            },
            domain: config.auth0Domain,
            clientID: config.clientID,
            redirectUri: config.callbackURL,
            responseType: 'code',
            scope: config.internalOptions.scope,
            _csrf: config.internalOptions._csrf,
            state: config.internalOptions.state,
            _intstate: config.internalOptions._intstate,
        };

        webAuthRef.current = new window.auth0.WebAuth(params);
        const databaseConnection = 'Username-Password-Authentication';

        // Рендер captcha в контейнер (треба додати в jsx контейнер з класом captcha-container)
        captchaRef.current = webAuthRef.current.renderCaptcha(
            document.querySelector('.captcha-container'),
            null,
            (error, payload) => {
                if (payload) {
                    triggerCaptchaRef.current = payload.triggerCaptcha;
                }
            }
        );

        // Обробники:
        const login = (e) => {
            e.preventDefault();
            if (!btnLoginRef.current) return;

            btnLoginRef.current.disabled = true;
            const username = emailRef.current.value;
            const password = passwordRef.current.value;

            const request = () => {
                webAuthRef.current.login(
                    {
                        realm: databaseConnection,
                        username,
                        password,
                        captcha: captchaRef.current.getValue(),
                    },
                    (err) => {
                        if (err) {
                            displayError(err);
                        }
                        btnLoginRef.current.disabled = false;
                    }
                );
            };

            if (triggerCaptchaRef.current) {
                triggerCaptchaRef.current(request);
            } else {
                request();
            }
        };

        const signup = (e) => {
            e.preventDefault();
            if (!btnLoginRef.current) return;

            btnLoginRef.current.disabled = true;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            const request = () => {
                webAuthRef.current.redirect.signupAndLogin(
                    {
                        connection: databaseConnection,
                        email,
                        password,
                        captcha: signupCaptchaRef.current.getValue(),
                    },
                    (err) => {
                        if (err) {
                            displayError(err);
                        }
                        btnLoginRef.current.disabled = false;
                    }
                );
            };

            if (triggerCaptchaRef.current) {
                triggerCaptchaRef.current(request);
            } else {
                request();
            }
        };

        const loginWithGoogle = (e) => {
            e.preventDefault();
            webAuthRef.current.authorize(
                {
                    connection: 'google-oauth2',
                },
                (err) => {
                    if (err) displayError(err);
                }
            );
        };

        const displayError = (err) => {
            captchaRef.current.reload();
            alert(err.policy || err.description || 'Error occurred');
        };

        const toggleSignupLogin = (e) => {
            e.preventDefault();
            setIsSignupMode((prev) => !prev);
            // при переключенні треба реініціалізувати captcha
            if (isSignupMode) {
                // Переходимо до логіну
                captchaRef.current = webAuthRef.current.renderCaptcha(
                    document.querySelector('.captcha-container'),
                    null,
                    (error, payload) => {
                        if (payload) {
                            triggerCaptchaRef.current = payload.triggerCaptcha;
                        }
                    }
                );
            } else {
                // Переходимо до реєстрації
                signupCaptchaRef.current = webAuthRef.current.renderSignupCaptcha(
                    document.querySelector('.captcha-container'),
                    null,
                    (error, payload) => {
                        if (payload) {
                            triggerCaptchaRef.current = payload.triggerCaptcha;
                        }
                    }
                );
            }
        };

        if (btnLoginRef.current) {
            btnLoginRef.current.onclick = isSignupMode ? signup : login;
        }
        if (btnGoogleRef.current) {
            btnGoogleRef.current.onclick = loginWithGoogle;
        }
        if (linkSignupLoginRef.current) {
            linkSignupLoginRef.current.onclick = toggleSignupLogin;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignupMode]);

    return (
        <div className={styles['login-container']}>
            <div className={styles['left-side1']}>
                <div className={styles['log-logo']}>LOGO</div>
                <div className={styles.text10}>Welcome back</div>
                <div className={styles.text11}>Please enter your details.</div>

                <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={styles['email-input']}
                />

                <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={styles['password-input']}
                />

                <button
                    ref={btnLoginRef}
                    type="submit"
                    id="btn-login"
                    className={styles['log-continue']}
                >
                    {isSignupMode ? 'Sign Up' : 'Continue'}
                </button>

                <div className={styles.text12}>OR</div>

                <button
                    ref={btnGoogleRef}
                    type="button"
                    id="btn-google"
                    className={styles['continue-google']}
                >
                    Continue with Google
                </button>

                <button className={styles['continue-apple']}>Continue with Apple</button>

                <div className={`${styles.text13} form-group`}>
                    <span id="login-signup-msg">
                        {isSignupMode ? 'Already have an account?' : "Don't have an account?"}
                    </span>{' '}
                    <a
                        href="#"
                        id="link-signup-login"
                        ref={linkSignupLoginRef}
                        style={{ cursor: 'pointer' }}
                    >
                        {isSignupMode ? 'Login' : 'Sign Up'}
                    </a>
                </div>

                {/* Контейнер для капчі */}
                <div className="captcha-container" style={{ marginTop: '20px' }}></div>
            </div>

            <div className={styles['right-side1']}>
                <div className={styles['log-photo']}></div>
            </div>
        </div>
    );
};

export default Login;
