import axios from 'axios';

import { joinUrl } from '~/utils/url';

export const http = axios.create({
  baseURL: joinUrl(import.meta.env.VITE_SERVER_URL, 'api'),
});
