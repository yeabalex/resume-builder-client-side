import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { EducationEntry, EducationEntryWithId } from '@/components/education/education';

export const addEducation = async (education: EducationEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/education`, { arr: education }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding education:', error);
    throw error;
  }
};

export const getEducation = async (): Promise<EducationEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/education`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching education:', error);
    throw error;
  }
};

export const updateEducation = async (education: EducationEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/education`, { arr: education }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating education:', error);
    throw error;
  }
};

export const deleteEducation = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/education?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting education:', error);
    throw error;
  }
};
