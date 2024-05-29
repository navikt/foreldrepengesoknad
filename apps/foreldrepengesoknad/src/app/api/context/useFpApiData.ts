import { AxiosError } from 'axios';
import { useEffect } from 'react';

import Environment from 'app/Environment';
import { RequestStatus } from 'app/types/RequestState';
import { usePostRequest } from 'app/utils/hooks/useRequest';

import { FpApiDataHashMap, FpApiDataType, useApiContextGetData, useApiContextSaveData } from './FpApiDataContext';

const sortObject = (unordered: Record<string, any>) =>
    Object.keys(unordered)
        .sort((s1, s2) => s1.localeCompare(s2))
        .reduce<Record<string, any>>((obj, key) => {
            obj[key] = unordered[key];
            return obj;
        }, {});

const hashCode = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        const code = string.charCodeAt(i);
        hash = (hash << 5) - hash + code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

const TYPE_URL_MAP = {
    [FpApiDataType.ANNEN_PART_VEDTAK]: `/innsyn/v2/annenPartVedtak`,
    [FpApiDataType.NESTE_SAK_ANNEN_PART_VEDTAK]: `/innsyn/v2/annenPartVedtak`,
    [FpApiDataType.STØNADSKONTOER]: `${Environment.REST_API_URL}/konto`,
};

export const useApiPostData = <DATA_TYPE extends FpApiDataType, PARAMS extends object>(
    type: DATA_TYPE,
    params: PARAMS,
    suspendRequest: boolean,
): {
    data: NonNullable<FpApiDataHashMap[DATA_TYPE]>[1] | undefined;
    requestStatus: RequestStatus;
    error: AxiosError<any, any> | null;
} => {
    const hashedParams = hashCode(JSON.stringify(sortObject(params)));

    const apiData = useApiContextGetData<DATA_TYPE>(type, hashedParams);
    const hasHashedData = !!apiData;
    const updateApiData = useApiContextSaveData(type, hashedParams);

    const { data, requestStatus, error } = usePostRequest<typeof apiData>(TYPE_URL_MAP[type], params, {
        config: {
            withCredentials: true,
        },
        isSuspended: hasHashedData || suspendRequest,
    });

    useEffect(() => {
        if (data) {
            updateApiData(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (error && error.message.includes('Ugyldig ident')) {
        return {
            data: undefined,
            requestStatus: RequestStatus.FINISHED,
            error: null,
        };
    }

    return {
        data: hasHashedData ? apiData : data,
        requestStatus: hasHashedData ? RequestStatus.FINISHED : requestStatus,
        error,
    };
};
