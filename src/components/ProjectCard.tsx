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
  const dueDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC",
  });
  const priorityLabel = ["", "Low", "Medium", "High", "Urgent", "Critical"][project.priorityLevel] ?? "Unspecified";

  return (
    <article className="project-card">
      <div className="project-card-topline">
        <span className={`priority-pill priority-${Math.min(project.priorityLevel, 3)}`}>
          {priorityLabel}
        </span>
        <span className="project-status">Project #{project.id}</span>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <dl className="project-meta">
        <div>
          <dt>Target date</dt>
          <dd>{dueDate.format(new Date(project.targetDate))}</dd>
        </div>
        <div>
          <dt>Priority</dt>
          <dd>{priorityLabel}</dd>
        </div>
      </dl>

      <div className="project-actions">
        <button
          className="project-view"
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
    </article>
  );
}
