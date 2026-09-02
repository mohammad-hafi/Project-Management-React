export interface Project {
  id: number;
  name: string;
  description: string;
  statusId: number;
  priorityLevel: number;
  startDate: string;
  targetDate: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  statusId: number;
  priorityLevel: number;
  startDate: string;
  targetDate: string;
}

export interface UpdateProjectRequest {
  id: number;
  name: string;
  description: string;
  statusId: number;
  priorityLevel: number;
  startDate: string;
  targetDate: string;
}

export interface PaginatedProjectsResponse {
  items: Project[];
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}