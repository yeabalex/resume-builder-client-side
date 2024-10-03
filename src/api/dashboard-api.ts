import axios from "axios";
import apiUrl from "@/constants/api-url";

export async function getUserCv() {
  try {
    const res = await axios.get(`${apiUrl}/api/get/cvs`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserData() {
  try {
    const response = await axios.get(
      `${apiUrl}/api/auth/login/status`,
      { withCredentials: true }
    );
    return response;
  } catch (err) {}
}
