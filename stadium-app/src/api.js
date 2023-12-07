import axios from 'axios';
//const host = process.env.REACT_APP_HOST
//const port = process.env.REACT_APP_PORT
//const BASE_URL = `https://${host}/api/`;
//const BASE_URL = `https://${host}:${port}/api/1.0`;
const apiUrl = import.meta.env.VITE_API_URL;



export const fetchMessages = async () => {
      const response =  await fetch(`${apiUrl}/api/event/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response.data)
    return response.json();
  };
  

// export const fetchMessages = async () => {
//   try {
//     const response =  await fetch(`${BASE_URL}/api/event/`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };


// export const fetchProducts = async (category) => {
//     const response = await fetch(`${BASE_URL}/products/${category}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   };
  