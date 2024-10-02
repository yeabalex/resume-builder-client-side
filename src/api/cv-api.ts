import axios from "axios";
import apiUrl from "@/constants/api-url";

export async function createCv(template: string) {
    try {
        const response = await axios.get(`${apiUrl}/api/templates/${template}`, {
            headers: {
                'Content-Type': 'application/json',
                
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        //throw error;
    }
}
