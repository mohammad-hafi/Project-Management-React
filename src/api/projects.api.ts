import apiClient from "./apiClient";
import type { Project,PaginatedProjectsResponse,CreateProjectRequest,UpdateProjectRequest } from "../types/project";

export async function getProjects(pageNumber=1,pageSize=10): Promise<PaginatedProjectsResponse>
{
    const response=await apiClient.get<PaginatedProjectsResponse>("/projects",{
        params:{
            pageNumber,
            pageSize
        }
    })
    return response.data;
}

export async function getProjectById(id: number):Promise<Project>
{
    const response= await apiClient.get<Project>(`/projects/${id}`)

    return response.data;
}

export async function createProject(
    credentials:CreateProjectRequest
):Promise<Project>
{
    const response= await apiClient.post<Project>(
        "/projects",
        credentials
    )
    return response.data;
}

export async function deleteProject(id:number):Promise<void>
{
    await apiClient.delete(`/projects/${id}`);
}


export async function updateProject(project:UpdateProjectRequest):Promise<Project>
{
    const responce= await apiClient.put<Project>(
    "/projects/update",
    project)

    return responce.data;
}