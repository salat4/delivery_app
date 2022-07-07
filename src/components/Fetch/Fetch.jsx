import axios from "axios";


axios.defaults.baseURL = "http://localhost:3000/"



export const FetchShop = async() =>{
    try {
        const response = await axios.get('/shop');
        return response.data;
    } catch (error) {
        console.error(error);
      }
}
