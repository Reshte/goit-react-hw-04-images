import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19287883-8248a4cfa378b2f4de664e52e';

export const requestApi = async (page = 1, Query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${Query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
