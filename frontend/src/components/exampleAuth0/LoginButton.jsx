import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
       
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default LoginButton;
