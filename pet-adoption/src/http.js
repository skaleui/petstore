import axios from 'axios';

const baseurl = "http://localhost:1337/";

export default axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});
