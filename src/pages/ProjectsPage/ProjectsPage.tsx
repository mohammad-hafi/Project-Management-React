import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { getProjects } from "../../api/projects.api";
import type { Project } from "../../types/project";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 3;

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      setError("");
      try {
        const data = await getProjects(pageNumber, pageSize);

        console.log("PROJECTS RESPONSE:", data);

        setProjects(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("PROJECTS ERROR:", error);
        setError("Failed to load projects.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, [pageNumber]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Projects</h1>

      <button onClick={handleLogout}>Logout</button>

      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}

      <div>
        <button
          onClick={() => setPageNumber((current) => current - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>

        <span>
          Page {pageNumber} of {totalPages}
        </span>

        <button
          onClick={() => setPageNumber((current) => current + 1)}
          disabled={pageNumber === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
