import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/ProjectForm";
import { useAuth } from "../../auth/useAuth";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../../api/projects.api";
import type { Project } from "../../types/project";
import ProjectCard from "../../components/ProjectCard";
import Paginate from "../../components/Pagination";

export default function ProjectsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statusId, setStatusId] = useState(1);
  const [priorityLevel, setPriorityLevel] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 3;

  function handleEditProject(project: Project) {
    setEditingProjectId(project.id);

    setName(project.name);
    setDescription(project.description);
    setStatusId(project.statusId);
    setPriorityLevel(project.priorityLevel);

    setStartDate(project.startDate.slice(0, 16));
    setTargetDate(project.targetDate.slice(0, 16));
  }
  async function handleDelete(id: number) {
    try {
      await deleteProject(id);

      const data = await getProjects(pageNumber, pageSize);
      setProjects(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);
    }
  }
  async function handleSubmitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsCreating(true);
    setCreateError("");

    try {
      const projectData = {
        name,
        description,
        statusId,
        priorityLevel,
        startDate: new Date(startDate).toISOString(),
        targetDate: new Date(targetDate).toISOString(),
      };

      if (editingProjectId === null) {
        await createProject(projectData);
      } else {
        await updateProject({
          id: editingProjectId,
          ...projectData,
        });
      }
      await loadProjects();

      resetForm();
    } catch (error) {
      console.error("SAVE PROJECT ERROR:", error);
      setCreateError("Failed to save project.");
    } finally {
      setIsCreating(false);
    }
  }
  function resetForm() {
    setEditingProjectId(null);
    setName("");
    setDescription("");
    setStatusId(1);
    setPriorityLevel(1);
    setStartDate("");
    setTargetDate("");
    setCreateError("");
  }
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getProjects(pageNumber, pageSize);

      setProjects(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("PROJECTS ERROR:", error);
      setError("Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

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
      <ProjectForm
        name={name}
        description={description}
        statusId={statusId}
        priorityLevel={priorityLevel}
        startDate={startDate}
        targetDate={targetDate}
        isCreating={isCreating}
        createError={createError}
        isEditing={editingProjectId !== null}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onStatusIdChange={setStatusId}
        onPriorityLevelChange={setPriorityLevel}
        onStartDateChange={setStartDate}
        onTargetDateChange={setTargetDate}
        onSubmit={handleSubmitProject}
        onCancelEdit={resetForm}
      />
      <h1>Projects</h1>

      <button onClick={handleLogout}>Logout</button>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={handleEditProject}
          onDelete={handleDelete}
        />
      ))}

      <Paginate
        PageNumberChange={setPageNumber}
        TotalPage={totalPages}
        PageNumber={pageNumber}
      />
    </main>
  );
}
