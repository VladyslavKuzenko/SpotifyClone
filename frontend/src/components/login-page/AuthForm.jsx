import React, { useEffect, useRef, useState } from "react";
import auth0 from "auth0-js";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

  const [webAuth, setWebAuth] = useState(null);
  const [captchaInstance, setCaptchaInstance] = useState(null);
  const [triggerCaptcha, setTriggerCaptcha] = useState(null);

  useEffect(() => {
    const config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));

    const leeway = parseInt(config.internalOptions.leeway);
    if (!isNaN(leeway)) {
      config.internalOptions.leeway = leeway;
    }

    const params = {
      overrides: {
        __tenant: config.auth0Tenant,
        __token_issuer: config.authorizationServer.issuer,
      },
      domain: config.auth0Domain,
      clientID: config.clientID,
      redirectUri: config.callbackURL,
      responseType: "code",
      scope: config.internalOptions.scope,
      _csrf: config.internalOptions._csrf,
      state: config.internalOptions.state,
      _intstate: config.internalOptions._intstate,
    };

    const wa = new auth0.WebAuth(params);
    setWebAuth(wa);

    const captcha = wa.renderCaptcha(captchaRef.current, null, (err, payload) => {
      if (payload) setTriggerCaptcha(() => payload.triggerCaptcha);
    });

    setCaptchaInstance(captcha);
  }, []);

  const handleAuthError = (err) => {
    captchaInstance?.reload();
    setError(err.policy || err.description || "Unknown error");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = emailRef.current.value;
    const password = passwordRef.current.value;

    const login = () => {
      webAuth.login({
        realm: "Username-Password-Authentication",
        username,
        password,
        captcha: captchaInstance.getValue()
      }, (err) => {
        if (err) handleAuthError(err);
      });
    };

    triggerCaptcha ? triggerCaptcha(login) : login();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const signup = () => {
      webAuth.redirect.signupAndLogin({
        connection: "Username-Password-Authentication",
        email,
        password,
        captcha: captchaInstance.getValue()
      }, (err) => {
        if (err) handleAuthError(err);
      });
    };

    triggerCaptcha ? triggerCaptcha(signup) : signup();
  };

  const handleGoogleLogin = () => {
    webAuth.authorize({
      connection: "google-oauth2"
    }, (err) => {
      if (err) handleAuthError(err);
    });
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setIsSignup(!isSignup);

    const render = isSignup ? webAuth.renderCaptcha : webAuth.renderSignupCaptcha;

    const newCaptcha = render(captchaRef.current, null, (err, payload) => {
      if (payload) setTriggerCaptcha(() => payload.triggerCaptcha);
    });

    setCaptchaInstance(newCaptcha);
  };

  // Inline styles (same as CSS in original)
  const styles = {
    body: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      padding: 15,
      backgroundColor: "#fff",
      boxShadow: "0px 5px 5px #ccc",
      borderRadius: 5,
      borderTop: "1px solid #e9e9e9",
      width: "100%",
      maxWidth: 400,
    },
    header: {
      textAlign: "center",
      marginBottom: 20,
    },
    img: {
      width: 75,
    },
    error: {
      display: error ? "block" : "none",
      whiteSpace: "break-spaces",
    },
    toggleLink: {
      cursor: "pointer",
    },
    invisible: {
      visibility: "hidden",
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.box}>
        <div style={styles.header}>
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg" alt="Auth0 Logo" style={styles.img} />
          <h3>Welcome</h3>
          <h5>{isSignup ? "CREATE AN ACCOUNT" : "PLEASE LOG IN"}</h5>
        </div>
        {error && <div className="alert alert-danger" style={styles.error}>{error}</div>}
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" ref={emailRef} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" ref={passwordRef} required />
          </div>
          <div className="captcha-container form-group" ref={captchaRef} />

          <button type="submit" className="btn btn-primary btn-block">
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          {!isSignup && (
            <button type="button" onClick={handleGoogleLogin} className="btn btn-danger btn-block">
              Log In with Google
            </button>
          )}

          <hr />
          <div className="form-group text-center">
            <span>{isSignup ? "Already have an account?" : "Don't have an account?"}</span>{" "}
            <a onClick={toggleForm} style={styles.toggleLink}>
              {isSignup ? "Login" : "Sign Up"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
