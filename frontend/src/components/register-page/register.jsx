import React from "react";
import styles from "./register.module.css";

const Register = () => {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["left-side"]}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.register}>
          <div className={styles.text1}>Sign up</div>
          <div className={styles.text2}>Enter details to create your account</div>
          <button className={styles["sign-up-with-btn"]}>Sign up with Google</button>
          <div className={styles.text3}>Or sign up with email</div>

          <div className={styles.text4}>Your name</div>
          <div className={styles.cont1}>
            <input type="text" className={styles["reg-name"]} placeholder="Name" />
            <input type="text" className={styles["reg-lastname"]} placeholder="Last name" />
          </div>

          <div className={styles.text4}>Email</div>
          <input type="text" className={styles["reg-email"]} placeholder="example@gmail.com" />

          <div className={styles.text4}>Password</div>
          <input type="password" className={styles["reg-password"]} placeholder="min, 8 characters" />

          <div className={styles.text4}>Confirm password</div>
          <input type="password" className={styles["reg-confirm"]} placeholder="min, 8 characters" />

          <div className={styles.remme}>
            <input type="checkbox" className={styles["remember-me"]} />
            <div className={styles.text5}>Remember me</div>
          </div>

          <button className={styles.continue}>Continue</button>

          <div className={styles.text6}>Already have an account? Login now</div>
        </div>
      </div>

      <div className={styles["right-side"]}>
        <div className={styles["reg-photo"]}></div>
      </div>
    </div>
  );
};

export default Register;
