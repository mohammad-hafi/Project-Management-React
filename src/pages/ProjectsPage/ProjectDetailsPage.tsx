import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getProjectById } from "../../api/projects.api";
import type { Project } from "../../types/project";

const priorityLabels: Record<number, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
  5: "Critical",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      const id = Number(projectId);

      if (Number.isNaN(id)) {
        setError("Invalid project ID.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError("");

        const data = await getProjectById(Number(projectId));

        setProject(data);
      } catch (error) {
        console.error("PROJECT DETAILS ERROR:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError("Project not found.");
        } else {
          setError("Failed to load project.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  if (isLoading) {
    return <div className="workspace-state">Loading project…</div>;
  }

  if (error) {
    return <div className="workspace-state workspace-state-error">{error}</div>;
  }

  if (!project) {
    return <div className="workspace-state">Project not found.</div>;
  }

  return (
    <section className="project-detail">
      <Link className="back-link" to="/projects">← Back to projects</Link>
      <div className="project-detail-header">
        <div>
          <p className="workspace-eyebrow">Project overview</p>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <span className={`priority-pill priority-${Math.min(project.priorityLevel, 3)}`}>
          {priorityLabels[project.priorityLevel] ?? "Unspecified"}
        </span>
      </div>
      <dl className="project-detail-grid">
        <div><dt>Priority</dt><dd>{priorityLabels[project.priorityLevel] ?? "Unspecified"}</dd></div>
        <div><dt>Project ID</dt><dd>#{project.id}</dd></div>
        <div><dt>Started</dt><dd>{formatDate(project.startDate)}</dd></div>
        <div><dt>Target date</dt><dd>{formatDate(project.targetDate)}</dd></div>
      </dl>
    </section>
  );
}
