import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { WorkExperienceEntry } from '@/components/work-experience/work-experience';

export const addWorkExperience = async (workExperience: WorkExperienceEntry): Promise<any> => {

  try {
    const response = await axios.post(`${apiUrl}/api/add/work-experience`, workExperience, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding work experience:', error);
    throw error;
  }
};
