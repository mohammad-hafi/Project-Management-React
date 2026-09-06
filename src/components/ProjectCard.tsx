import type { Project } from "../types/project";
import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
  project: Project;
  onEdit: (Project: Project) => void;
  onDelete: (id: number) => void;
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const navigate = useNavigate();
  return (
    <div className="project-card">
      <h2>{project.name}</h2>
      <p>{project.description}</p>

      <div className="project-actions">
        <button
          type="button"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          View
        </button>

        <button type="button" onClick={() => onEdit(project)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(project.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
