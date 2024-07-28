import axios from "axios";

export const loginUser = async (credentials: any) =>{
    try{
        const loggedData = await axios.post('https://kraft-server.onrender.com/api/auth/login', credentials, {withCredentials: true})
        console.log(loggedData)
    }catch(err){
        console.error(err)
    }
}