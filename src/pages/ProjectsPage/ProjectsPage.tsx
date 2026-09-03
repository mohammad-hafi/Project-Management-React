import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { getProjects, createProject } from "../../api/projects.api";
import type { Project } from "../../types/project";

export default function ProjectsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState(1);
  const [priorityLevel, setPriorityLevel] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 3;

  async function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCreating(true);
    setCreateError("");

    try {
      await createProject({
        name,
        description,
        statusId,
        priorityLevel,
        startDate: new Date(startDate).toISOString(),
        targetDate: new Date(targetDate).toISOString(),
      });

      setName("");
      setDescription("");
      setStatusId(1);
      setPriorityLevel(1);
      setStartDate("");
      setTargetDate("");

      const data = await getProjects(pageNumber, pageSize);

      setProjects(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);
      setCreateError("Failed to create project.");
    } finally {
      setIsCreating(false);
    }
  }

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
      <form onSubmit={handleCreateProject}>
        <h2>Create Project</h2>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="statusId">Status ID</label>
          <input
            id="statusId"
            type="number"
            value={statusId}
            onChange={(event) => setStatusId(Number(event.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="priorityLevel">Priority Level</label>
          <input
            id="priorityLevel"
            type="number"
            value={priorityLevel}
            onChange={(event) => setPriorityLevel(Number(event.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="targetDate">Target Date</label>
          <input
            id="targetDate"
            type="datetime-local"
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
            required
          />
        </div>

        {createError && <p>{createError}</p>}

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Project"}
        </button>
      </form>
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
