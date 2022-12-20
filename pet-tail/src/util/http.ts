import axios from 'axios';

const baseurl = process.env.REACT_APP_FETCH_URL;

export default axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

