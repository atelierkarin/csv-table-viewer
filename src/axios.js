import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://waas-school-ui.hkedcity.net'
});

export default instance;