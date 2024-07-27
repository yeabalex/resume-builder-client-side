import axios from "axios";

export const loginUser = async (credentials: any) =>{
    try{
        const loggedData = await axios.post('http://localhost:3001/api/auth/login', credentials, {withCredentials: true})
        console.log(loggedData)
    }catch(err){
        console.error(err)
    }
}