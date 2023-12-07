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

    const responseText = await response.text(); // 获取响应的文本内容
  try {
    const data = JSON.parse(responseText); // 尝试解析为 JSON
    return data;
  } catch (error) {
    console.error('Received response is not JSON:', responseText); // 打印原始响应文本
    throw error;
  }

   

   
  
    // const data = await response.json();
    // return data;
    // console.log('fetch message');
    // const data = await response.json(); 
    // console.log(data);
    // return data;
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
  