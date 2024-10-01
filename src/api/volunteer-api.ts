import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { VolunteerEntry, VolunteerEntryWithId } from '@/components/volunteer/volunteer';

export const addVolunteer = async (volunteerExperiences: VolunteerEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/volunteer`, { arr: volunteerExperiences }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding volunteer experiences:', error);
    throw error;
  }
};

export const getVolunteer = async (): Promise<VolunteerEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/volunteers`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer experiences:', error);
    throw error;
  }
};

export const updateVolunteer = async (volunteerExperiences: VolunteerEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/volunteer`, { arr: volunteerExperiences }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating volunteer experiences:', error);
    throw error;
  }
};

export const deleteVolunteer = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/volunteer?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting volunteer experience:', error);
    throw error;
  }
};
