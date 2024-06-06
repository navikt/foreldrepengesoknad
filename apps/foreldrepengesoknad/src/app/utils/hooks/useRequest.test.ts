import { renderHook, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import { getAxiosInstance } from '@navikt/fp-api';

import { useGetRequest } from './useRequest';

const apiMock = new MockAdapter(getAxiosInstance());

describe('useGetRequest', () => {
    it('skal hente data frå server', async () => {
        const data = {
            test: true,
        };
        const url = '/rest/storage/kvittering/foreldrepenger';
        apiMock.onGet(url).replyOnce(200, data);

        const { result } = renderHook(() => useGetRequest(url));

        await waitFor(() => expect(result.current.data).toEqual(data));
        expect(result.current.error).toBeNull();
    });

    it('skal feile i å hente data frå server', async () => {
        const { result } = renderHook(() => useGetRequest('en url som ikke finnes'));

        expect(result.current.data).toBeUndefined();
        await waitFor(() => expect(result.current.error?.message).toBe('Request failed with status code 404'));
    });

    it('skal ikke hente data når kallet er suspendert', async () => {
        const data = {
            test: true,
        };
        const options = {
            isSuspended: true,
        };
        const url = '/rest/storage/kvittering/foreldrepenger';
        apiMock.onGet(url).replyOnce(200, data);

        const { result } = renderHook(() => useGetRequest(url, options));

        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeNull();
    });
});
