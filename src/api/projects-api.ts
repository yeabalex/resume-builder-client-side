import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { ProjectEntry, ProjectEntryWithId } from '@/components/projects/projects';


export const addProject = async (projects: ProjectEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/project`, { arr: projects }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding projects:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<ProjectEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/project`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const updateProjects = async (projects: ProjectEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/project`, { arr: projects }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating projects:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/project?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
