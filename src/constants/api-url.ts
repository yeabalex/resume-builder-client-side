let apiUrl: string = ""; 
        
const env = process.env.NODE_ENV
if(env == "development"){
    apiUrl="http://localhost:3001"
}
else if (env == "production"){
    apiUrl="https://kraftwerk.vercel.app"
}

export default apiUrl
