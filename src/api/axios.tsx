import axios from 'axios';
import config from 'react-native-config';

export const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 1000,
});
