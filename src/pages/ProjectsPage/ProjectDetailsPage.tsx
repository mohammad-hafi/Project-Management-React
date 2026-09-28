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
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <main>
      <Link to="/projects" replace>
        ← Back to Projects
      </Link>

      <h1>{project.name}</h1>

      <p>{project.description}</p>

      <p>
        Priority Level: {priorityLabels[project.priorityLevel] ?? "Unspecified"}
      </p>

      <p>Start Date: {project.startDate}</p>

      <p>Target Date: {project.targetDate}</p>
    </main>
  );
}
