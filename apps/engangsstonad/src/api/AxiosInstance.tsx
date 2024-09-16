import Environment from 'appData/Environment';

import { getAxiosInstance } from '@navikt/fp-api';

export const AxiosInstanceAPI = () => getAxiosInstance({ baseUrl: Environment.PUBLIC_PATH });
