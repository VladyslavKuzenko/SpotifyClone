import React from 'react';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles['left-side']}>
        <div className={styles['login-platform']}>
          <div className={styles.logo}>LOGO</div>
          <div className={styles['login-content']}>
            <div className={styles.text1}>Welcome back</div>
            <div className={styles.text2}>Please enter your details.</div>

            <input
              type="email"
              className={styles.email}
              placeholder="Enter your email"
            />
            <input
              type="password"
              className={styles.password}
              placeholder="Password"
            />

            <button className={styles.continue}>Continue</button>

            <div className={styles.text3}>OR</div>

            <button className={styles['continue-with-google']}>
              Continue with Google
            </button>
            <button className={styles['continue-with-apple']}>
              Continue with Apple
            </button>

            <div className={styles.text4}>
              Don`t have an account? <span className={styles.text5}>Sign up</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles['right-side']}>
        <div className={styles['login-photo']}></div>
      </div>
    </div>
  );
};

export default Login;
