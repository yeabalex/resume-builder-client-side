import apiUrl from "@/constants/api-url";
import axios from "axios";

export const loginUser = async (credentials: any) => {
  let apiUrl;

  const env = process.env.NODE_ENV;
  if (env == "development") {
    apiUrl = "http://localhost:3001";
  } else if (env == "production") {
    apiUrl = "https://kraftwerk.vercel.app";
  }
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
