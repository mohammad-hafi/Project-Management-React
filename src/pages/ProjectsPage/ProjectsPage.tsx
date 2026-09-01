import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main>
      <h1>Projects</h1>

      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
