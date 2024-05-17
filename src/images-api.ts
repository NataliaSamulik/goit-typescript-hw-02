import axios, { AxiosResponse } from 'axios';
import { Images } from './types';

const KEY_USER: string = 'PXRoCgB3T0DepDcrOvvK3rkUzJUyZfzV2m00tRp2vYM';
axios.defaults.baseURL = "https://api.unsplash.com/";

interface ResultAPI {
  total: number; 
  total_pages: number;
  results: Images[];
}

export const fetchImagesWithKeyword = async (word: string, page: number): Promise<ResultAPI> => {
  const response: AxiosResponse<ResultAPI> = await axios.get(
    `search/photos/?client_id=${KEY_USER}&query=${word}&page=${page}&per_page=20}`
  );
  return response.data;
};

