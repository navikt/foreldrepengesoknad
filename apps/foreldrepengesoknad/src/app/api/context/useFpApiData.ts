import { useEffect } from 'react';
import { FpApiDataType, useApiContextGetData, useApiContextSaveData } from './FpApiDataContext';
import { useGetRequest, usePostRequest } from 'app/utils/hooks/useRequest';
import Environment from 'app/Environment';

const sortObject = (testObj: object) => Object.keys(testObj).reduce((a, c) => ((a[c] = testObj[c]), a), {});

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

export const useApiGetData = <DATA, PARAMS extends object>(
    type: FpApiDataType,
    params: PARAMS,
    suspendRequest: boolean,
) => {
    const hashedParams = hashCode(JSON.stringify(sortObject(params)));

    const apiData = useApiContextGetData(type, hashedParams);
    const updateApiData = useApiContextSaveData(type, hashedParams);

    const { data, requestStatus, error } = useGetRequest<DATA>(TYPE_URL_MAP[type], {
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
        data: apiData,
        requestStatus,
        error,
    };
};

export const useApiPostData = <DATA, PARAMS extends object>(
    type: FpApiDataType,
    params: PARAMS,
    suspendRequest: boolean,
) => {
    const hashedParams = hashCode(JSON.stringify(sortObject(params)));

    const apiData = useApiContextGetData(type, hashedParams);
    const updateApiData = useApiContextSaveData(type, hashedParams);

    const { data, requestStatus, error } = usePostRequest<DATA>(TYPE_URL_MAP[type], params, {
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
        data: apiData,
        requestStatus,
        error,
    };
};
