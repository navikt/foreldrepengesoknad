import { getAxiosInstance } from '@navikt/fp-api';

import Environment from 'app/Environment';

export const AxiosInstanceAPI = (fnr?: string) => getAxiosInstance({ baseUrl: Environment.PUBLIC_PATH, fnr });
