import { useEffect } from 'react';
import { FpApiDataHashMap, FpApiDataType, useApiContextGetData, useApiContextSaveData } from './FpApiDataContext';
import { useGetRequest, usePostRequest } from 'app/utils/hooks/useRequest';
import Environment from 'app/Environment';
import { RequestStatus } from 'app/types/RequestState';
import { AxiosError } from 'axios';

const sortObject = (unordered: Record<string, any>) =>
    Object.keys(unordered)
        .sort()
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
    [FpApiDataType.STØNADSKONTOER_80]: `${Environment.REST_API_URL}/konto`,
    [FpApiDataType.STØNADSKONTOER_100]: `${Environment.REST_API_URL}/konto`,
};

export const useApiGetData = <DATA_TYPE extends FpApiDataType, PARAMS extends object>(
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
    const updateApiData = useApiContextSaveData(type, hashedParams);

    const { data, requestStatus, error } = useGetRequest<typeof apiData>(TYPE_URL_MAP[type], {
        config: {
            timeout: 15 * 1000,
            params,
            withCredentials: false,
        },
        isSuspended: !!apiData || suspendRequest,
    });

    useEffect(() => {
        if (data) {
            updateApiData(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return {
        data: data || apiData,
        requestStatus,
        error,
    };
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
    const updateApiData = useApiContextSaveData(type, hashedParams);

    const { data, requestStatus, error } = usePostRequest<typeof apiData>(TYPE_URL_MAP[type], params, {
        config: {
            withCredentials: true,
        },
        isSuspended: !!apiData || suspendRequest,
    });

    useEffect(() => {
        if (data) {
            updateApiData(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return {
        data: (data || apiData) as any,
        requestStatus,
        error,
    };
};
