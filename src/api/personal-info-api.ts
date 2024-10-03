import axios from "axios";
import { UserData } from "../components/personal-info/personal-info";
import apiUrl from "@/constants/api-url";

export async function sendPersonalInfo(data: UserData) {
  try {
    const res = await axios.post(`${apiUrl}/api/add/personal-info`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

export async function getPersonalInfo() {
  try {
    const res = await axios.get(`${apiUrl}/api/user/personal-info`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePersonalInfo(data: UserData) {
  try {
    const res = await axios.put(`${apiUrl}/api/update/personal-info`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error updating personal info:', err);
    throw err;
  }
}


