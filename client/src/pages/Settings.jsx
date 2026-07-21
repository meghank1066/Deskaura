import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/settings.css";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove auth token or user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: If you use an AuthContext, call it here (e.g., logout())

    // 2. Redirect user to the login page
    navigate("/login");
  };

  const handleChangePassword = () => {
    // Placeholder or navigate to password reset flow
    alert("Change Password feature coming soon!");
  };

  return (
    <div className="dashboard-layout">
      <Navbar />

      <main className="settings-page">
        <h1>Settings</h1>

        <div className="settings-card">
          <h3>Account Settings</h3>
          <p className="settings-description">
            Manage your account credentials and active session.
          </p>

          <div className="settings-actions">
            <button className="btn btn-secondary" onClick={handleChangePassword}>
              Change Password
            </button>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;