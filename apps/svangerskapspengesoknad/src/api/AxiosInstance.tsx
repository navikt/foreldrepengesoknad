import Environment from 'appData/Environment';

import { getAxiosInstance } from '../../../../packages/api';

export const AxiosInstanceAPI = () => getAxiosInstance({ baseUrl: Environment.PUBLIC_PATH });
