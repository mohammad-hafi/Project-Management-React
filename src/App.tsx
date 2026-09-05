import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ProjectDetailsPage from "./pages/ProjectsPage/ProjectDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
