import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'https://admin.stayatpurijagannatha.in/api/auth/';

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
  let token = await AsyncStorage.getItem('access_token');

  let options: RequestInit = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  };

  return loaddata(apiPath, options);
};

export const CallApi_Without_Token = async (method: string, apiPath: string, params: any) => {
  let options: RequestInit = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  };

  return loaddata(apiPath, options);
};
