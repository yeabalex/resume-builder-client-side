import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { TechnicalSkillEntry, TechnicalSkillEntryWithId } from '@/components/technical-skills/technical-skills';

export const addTechnicalSkill = async (technicalSkills: TechnicalSkillEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/technical-skill`, { arr: technicalSkills }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding technical skills:', error);
    throw error;
  }
};

export const getTechnicalSkills = async (): Promise<TechnicalSkillEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/technical-skill`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching technical skills:', error);
    throw error;
  }
};

export const updateTechnicalSkills = async (technicalSkills: TechnicalSkillEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/technical-skill`, { arr: technicalSkills }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating technical skills:', error);
    throw error;
  }
};

export const deleteTechnicalSkill = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/technical-skill?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting technical skill:', error);
    throw error;
  }
};
