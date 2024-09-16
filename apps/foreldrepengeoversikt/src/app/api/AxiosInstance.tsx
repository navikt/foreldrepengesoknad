import { getAxiosInstance } from '@navikt/fp-api';

import { prefiks_public_path } from 'app/api/api';

export const AxiosInstanceAPI = () => getAxiosInstance({ baseUrl: prefiks_public_path });
