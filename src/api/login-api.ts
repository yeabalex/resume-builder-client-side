import apiUrl from "@/constants/api-url";
import axios from "axios";

export const loginUser = async (credentials: any) => {

  try {
    const loggedData = await axios.post(
      `${apiUrl}/api/auth/login`,
      credentials,
      { withCredentials: true }
    );
    console.log(loggedData.data, "here");
    return loggedData;
  } catch (err) {
    //console.log("This");
    //console.error(err);
  }
};

export async function getLogStatus() {
  try {
    const res = await axios.get(`${apiUrl}/api/auth/login/status`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {}
}
