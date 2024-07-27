import axios from 'axios';

export const sendData = async (data: any) => {
  try {
    const sentData = await axios.post('http://localhost:3001/api/auth/signup', data);
    console.log(sentData.data); 
  } catch (err) {
    console.error(err);
  }
};
