const getApiUrl = (): string => {
  const env = process.env.NODE_ENV;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  if (env === "development") {
    return "http://localhost:3001";
  } else {
    // For production and any other environment
    return "https://kraft-server.onrender.com"
  }
};

const apiUrl = getApiUrl();

export default apiUrl;
