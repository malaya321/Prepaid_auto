import AsyncStorage from '@react-native-async-storage/async-storage';

 const API = 'http://77.68.14.214/prepaid-auto-booking-backend/public/api/auth_api/'

const loaddata = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "API CONTROLLER PAGE");
  }
};

export const CallApi = async (method: string, apiPath: string, params: any) => {
  // let token = await AsyncStorage.getItem('access_token');
let apiurl= API+apiPath
  let options: RequestInit = {
    method: method,
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: params,
  };

  return loaddata(apiurl, options);
};

export const CallApi_Without_Token = async (method: string, apiPath: string, params: any) => {
  let apiurl= API+apiPath
  let options: RequestInit = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: params,
  };


  return loaddata(apiurl, options);
};

export const CallApi_formdata = async (method: string, apiPath: string, params: any) => {
  // let token = await AsyncStorage.getItem('access_token');
  let apiurl= API+apiPath
  let options: RequestInit = {
    method: method,
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  };


  return loaddata(apiurl, options);
};

export const CallApi_formdata_Without_Token = async (method: string, apiPath: string, params: any) => {
  let apiurl= API+apiPath
 
 let options: RequestInit = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  };

 
  return loaddata(apiurl, options);
};
