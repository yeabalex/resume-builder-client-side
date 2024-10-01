import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { SoftSkillEntry, SoftSkillEntryWithId } from '@/components/soft-skills/soft-skills';

export const addSoftSkill = async (softSkills: SoftSkillEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/soft-skill`, { arr: softSkills }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding soft skills:', error);
    throw error;
  }
};

export const getSoftSkills = async (): Promise<SoftSkillEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/soft-skill`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching soft skills:', error);
    throw error;
  }
};

export const updateSoftSkills = async (softSkills: SoftSkillEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/soft-skill`, { arr: softSkills }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating soft skills:', error);
    throw error;
  }
};

export const deleteSoftSkill = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/soft-skill?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting soft skill:', error);
    throw error;
  }
};
