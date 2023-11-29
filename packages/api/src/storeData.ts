import { AxiosInstance } from 'axios';
import { ApiAccessError, ApiGeneralError, isAxiosError } from './error';

// TODO Tekstane burde ikkje ligga i denne pakka + lokalisering
const UKJENT_UUID = 'ukjent uuid';

const storeData = async <REQUEST_DATA, RESPONSE_DATA>(
    instance: AxiosInstance,
    url: string,
    data: REQUEST_DATA,
    errorMessage: string,
    abortSignal?: AbortSignal,
) => {
    try {
        const response = await instance.post<RESPONSE_DATA>(url, data, {
            withCredentials: true,
            timeout: 60 * 1000,
            headers: {
                'content-type': 'application/json;',
            },
            signal: abortSignal,
        });
        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error) && error.code !== 'ERR_CANCELED') {
            if (error.response?.status === 401 || error.response?.status === 403) {
                throw new ApiAccessError();
            }

            const submitErrorCallId =
                error.response && error.response.data && error.response.data.uuid
                    ? error.response.data.uuid
                    : UKJENT_UUID;
            const callIdForBruker =
                submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
            throw new ApiGeneralError(errorMessage + callIdForBruker);
        }
        if (error instanceof Error) {
            throw new ApiGeneralError(error.message);
        }
        throw new ApiGeneralError(String(error));
    }
};

export default storeData;
