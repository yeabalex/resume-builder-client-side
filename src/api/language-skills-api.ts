import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { LanguageSkillEntry, LanguageSkillEntryWithId } from '@/components/language-skill/language-skill';

export const addLanguageSkill = async (languageSkills: LanguageSkillEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/language`, { arr: languageSkills }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding language skills:', error);
    throw error;
  }
};

export const getLanguageSkills = async (): Promise<LanguageSkillEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/language`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching language skills:', error);
    throw error;
  }
};

export const updateLanguageSkills = async (languageSkills: LanguageSkillEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/language`, { arr: languageSkills }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating language skills:', error);
    throw error;
  }
};

export const deleteLanguageSkill = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/language?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting language skill:', error);
    throw error;
  }
};
