import axios from 'axios';

const serverUrl = 'http://localhost:2000';
const HTTP = axios.create({
  baseURL: serverUrl,
});
export default HTTP;
