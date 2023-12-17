import axios from 'axios';
import { PROD_API_URL, API_URL } from './config/config'

//const host = process.env.REACT_APP_HOST
//const port = process.env.REACT_APP_PORT
//const BASE_URL = `https://${host}/api/`;
//const BASE_URL = `https://${host}:${port}/api/1.0`;
const apiUrl = import.meta.env.VITE_API_URL;



// `${PROD_API_URL}/user/signin`

// export const fetchMessages = async () => {
//     console.log(`${PROD_API_URL}/event/`);
//     const response =  await fetch(`${PROD_API_URL}/event/`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const responseText = await response.text(); 
//   try {
//     const data = JSON.parse(responseText); 
//     console.log('fetch data is', data);
//     console.log('fetch event',data.event);
//     return data;
//   } catch (error) {
//     console.error('Received response is not JSON:', responseText); 
//     throw error;
//   }

export const fetchMessages = async () => {
  console.log(`${PROD_API_URL}/event/`);
  const response = await fetch(`${PROD_API_URL}/event/`, {
      credentials: 'include' 
  });
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  const responseText = await response.text(); 
  try {
      const data = JSON.parse(responseText); 
      console.log('fetch data is', data);
      console.log('fetch event', data.event);
      return data;
  } catch (error) {
      console.error('Received response is not JSON:', responseText); 
      throw error;
  }
}


export const fetchActivities = async () => {
    console.log(`${PROD_API_URL}/activity`);
    const response = await fetch(`${PROD_API_URL}/activity`, {
        credentials: 'include' 
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
  
    const responseText = await response.text(); 
    try {
        const data = JSON.parse(responseText); 
        console.log('fetch data is', data);
        return data;
    } catch (error) {
        console.error('Received response is not JSON:', responseText); 
        throw error;
    }
  }


  export const fetchMyActivityInfo = async (activityId) => {
    console.log(`${PROD_API_URL}/activity/${activityId}`);
    const response = await fetch(`${PROD_API_URL}/activity/${activityId}`, {
        credentials: 'include' 
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
  
    const responseText = await response.text(); 
    try {
        const data = JSON.parse(responseText); 
        console.log('fetch my activity data is', data);
        return data;
    } catch (error) {
        console.error('Received response is not JSON:', responseText); 
        throw error;
    }
  }



//for my activity lists and status
  export const fetchMyActivities = async (activityId) => {
    console.log(`${PROD_API_URL}/activity/${activityId}`);
    const response = await fetch(`${PROD_API_URL}/activity/${activityId}`, {
        credentials: 'include' 
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
  
    const responseText = await response.text(); 
    try {
        const data = JSON.parse(responseText); 
        console.log('fetch my activity data is', data);
        return data;
    } catch (error) {
        console.error('Received response is not JSON:', responseText); 
        throw error;
    }
  }
  
  
