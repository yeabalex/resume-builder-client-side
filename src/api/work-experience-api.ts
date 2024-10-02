import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { WorkExperienceEntry, WorkExperienceEntryWithId } from '@/components/work-experience/work-experience';

export const addWorkExperience = async (workExperience: WorkExperienceEntry[]): Promise<any> => {
//console.log(workExperience);
  try {
    const response = await axios.post(`${apiUrl}/api/add/work-experience`, {arr:workExperience}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding work experience:', error);
    throw error;
  }
};

export const getWorkExperience = async (): Promise<WorkExperienceEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/work-experience`, {
      withCredentials: true
    });
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching work experience:', error);
    throw error;
  }
};

export const updateWorkExperience = async (workExperience: WorkExperienceEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/work-experience`, { arr: workExperience }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating work experience:', error);
    throw error;
  }
};

export const deleteWorkExperience = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/work-experience?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting work experience:', error);
    throw error;
  }
};
