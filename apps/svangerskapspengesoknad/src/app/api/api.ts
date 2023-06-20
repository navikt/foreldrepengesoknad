import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO copy';
import { useGetRequest } from 'app/utils/hooks/useGetRequest';

const useSøkerinfo = () => {
    const { data, error } = useGetRequest<SøkerinfoDTO>('/sokerinfo', { config: { withCredentials: true } });

    return {
        søkerinfoData: data,
        søkerinfoError: error,
    };
};

const Api = {
    useSøkerinfo,
};

export default Api;
