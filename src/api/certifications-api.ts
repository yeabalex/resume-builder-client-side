import axios from 'axios';
import apiUrl from '@/constants/api-url';
import { CertificationEntry, CertificationEntryWithId } from '@/components/certification/certification';

export const addCertification = async (certifications: CertificationEntry[]): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/api/add/certification`, { arr: certifications }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding certifications:', error);
    throw error;
  }
};

export const getCertifications = async (): Promise<CertificationEntryWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/certification`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    throw error;
  }
};

export const updateCertifications = async (certifications: CertificationEntryWithId[]): Promise<any> => {
  try {
    const response = await axios.put(`${apiUrl}/api/update/certification`, { arr: certifications }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating certifications:', error);
    throw error;
  }
};

export const deleteCertification = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/delete/certification?id=${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting certification:', error);
    throw error;
  }
};
