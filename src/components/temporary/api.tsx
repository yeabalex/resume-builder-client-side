import axios from "axios";

export const dashboard = async () => {
    try{
        const loggedData = await axios.get('http://localhost:3001/api/auth/login/status', {withCredentials: true})
        console.log(await loggedData.data)
    }catch(err){
        console.error(err)
    }
}