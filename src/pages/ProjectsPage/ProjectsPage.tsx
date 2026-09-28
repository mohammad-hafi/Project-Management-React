import { useCallback, useEffect, useState, type FormEvent } from "react";
import ProjectForm from "../../components/ProjectForm";
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
  const [priorityLevel, setPriorityLevel] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 3;

  const toIsoDate = (date: string) => `${date}T00:00:00.000Z`;

  function handleEditProject(project: Project) {
    setEditingProjectId(project.id);

    setName(project.name);
    setDescription(project.description);
    setPriorityLevel(project.priorityLevel);

    setStartDate(project.startDate.slice(0, 10));
    setTargetDate(project.targetDate.slice(0, 10));
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
        statusId: 1,
        priorityLevel,
        startDate: toIsoDate(startDate),
        targetDate: toIsoDate(targetDate),
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

  if (isLoading) {
    return <div className="workspace-state">Loading your projects…</div>;
  }

  if (error) {
    return <div className="workspace-state workspace-state-error">{error}</div>;
  }
  return (
    <div className="workspace">
      <section className="workspace-hero">
        <div>
          <p className="workspace-eyebrow">Project portfolio</p>
          <h1>Keep the work in motion.</h1>
          <p>Plan new initiatives, review what&apos;s underway, and keep every deadline visible.</p>
        </div>
        <div className="workspace-count" aria-label={`${projects.length} projects on this page`}>
          <strong>{projects.length}</strong>
          <span>on this page</span>
        </div>
      </section>

      <ProjectForm
        name={name}
        description={description}
        priorityLevel={priorityLevel}
        startDate={startDate}
        targetDate={targetDate}
        isCreating={isCreating}
        createError={createError}
        isEditing={editingProjectId !== null}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onPriorityLevelChange={setPriorityLevel}
        onStartDateChange={setStartDate}
        onTargetDateChange={setTargetDate}
        onSubmit={handleSubmitProject}
        onCancelEdit={resetForm}
      />

      <section className="projects-section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <div>
            <p className="workspace-eyebrow">Your projects</p>
            <h2 id="projects-heading">In progress</h2>
          </div>
          <span>{projects.length} shown</span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-projects">No projects yet. Create the first one above to get started.</div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <Paginate
        PageNumberChange={setPageNumber}
        TotalPage={totalPages}
        PageNumber={pageNumber}
      />
    </div>
  );
}
