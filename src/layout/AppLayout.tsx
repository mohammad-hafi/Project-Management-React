import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function AppLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className="app-header">
        <Link className="app-brand" to="/projects">
          <span className="app-brand-mark" aria-hidden="true">PM</span>
          <span>
            <strong>Project Manager</strong>
            <small>Workspace</small>
          </span>
        </Link>

        <nav className="app-nav">
          <Link to="/projects">All projects</Link>

          <button type="button" onClick={handleLogout}>
            Sign out
          </button>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}
