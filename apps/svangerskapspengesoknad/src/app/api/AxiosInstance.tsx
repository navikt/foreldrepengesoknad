import { getAxiosInstance } from '@navikt/fp-api';

import Environment from 'app/appData/Environment';

export const AxiosInstanceAPI = () => getAxiosInstance({ baseUrl: Environment.PUBLIC_PATH });
