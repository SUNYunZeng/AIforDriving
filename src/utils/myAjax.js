import axios from 'axios';
import store from '@/store';

export function post (order, option={}){
  return axios.post(store.state.bUrl + order, option, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function get (url) {
  return axios.get(url);
}
