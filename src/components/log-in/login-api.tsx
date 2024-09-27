import axios from "axios";


export const loginUser = async (credentials: any) => {
    let apiUrl; 
        
    const env = process.env.NODE_ENV
    if(env == "development"){
        apiUrl="http://localhost:3001"
    }
    else if (env == "production"){
        apiUrl="https://kraftwerk.vercel.app"
    }
    try {        
        const loggedData = await axios.post(`${apiUrl}/api/auth/login`, credentials, { withCredentials: true });
        
    } catch (err) {
        console.log("This", )
        console.error(err);
    }
};
