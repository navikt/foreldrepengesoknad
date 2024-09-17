import { getAxiosInstance } from '@navikt/fp-api';

import Environment from '../Environment';

export const AxiosInstanceAPI = (fnr?: string) => getAxiosInstance({ baseUrl: Environment.PUBLIC_PATH, fnr });
