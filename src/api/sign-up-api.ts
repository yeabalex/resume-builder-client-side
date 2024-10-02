import axios from 'axios';
import apiUrl from '@/constants/api-url';
export const sendData = async (data: any) => {
  try {
    console.log(data)
    const sentData = await axios.post(`${apiUrl}/api/auth/signup`, data);
    console.log(sentData.data); 
  } catch (err) {
    console.error(err);
  }
};
