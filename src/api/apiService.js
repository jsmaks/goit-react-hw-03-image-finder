import axios from 'axios';

const options = {
  API_KEY: '20689787-83a4953ee3875a5823ca1478f',
  BASE_URL: 'https://pixabay.com/api/',
};

const { API_KEY, BASE_URL } = options;

const fetchImages = ({searchQuery = '', currentPage = 1}) => {
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`;
  return axios.get(url);
};
export default {fetchImages};

