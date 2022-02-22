import axios from 'axios';

import { BASE_URL } from '../constants/url';
import { RequestMethod, ReturnedRequestInfo } from '../types';

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 30000;

export const fetcher = async (
  method: RequestMethod,
  url: ReturnedRequestInfo['url'],
  ...rest: any
) => {
  try {
    const res = await axios[method](url, ...rest);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('different error than axios');
  }
};
