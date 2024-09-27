import axios from 'axios';

export const sendData = async (data: any) => {
  try {
    console.log(data)
    const sentData = await axios.post('http://localhost:3001/api/auth/signup', data);
    console.log(sentData.data); 
  } catch (err) {
    console.error(err);
  }
};
