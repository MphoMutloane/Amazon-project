import axios from "axios";

const instance = axios.create({
    baseURL : "https://us-central1-project-3c315.cloudfunctions.net/api" 
});

export default instance;