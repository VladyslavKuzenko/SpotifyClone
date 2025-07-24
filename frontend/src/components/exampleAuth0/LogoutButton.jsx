import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // щоб по вертикалі було по центру всього екрану
      }}
    >
      <button
        onClick={() =>
          logout({
            logoutParams: { returnTo: `${window.location.origin}/main` },
          })
        }
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
