import apiClient from "./apiClient";
import type { Project,PaginatedProjectsResponse } from "../types/project";

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
