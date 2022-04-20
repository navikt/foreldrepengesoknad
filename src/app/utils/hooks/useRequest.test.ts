import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useRequest } from './useRequest';
import getAxiosInstance from 'app/api/apiInterceptor';

const apiMock = new MockAdapter(getAxiosInstance());

describe('useRequest', () => {
    it('skal hente data frå server', async () => {
        const data = {
            test: true,
        };
        const url = '/storage/kvittering/foreldrepenger';
        apiMock.onGet(url).replyOnce(200, data);

        const { result, waitForNextUpdate } = renderHook(() => useRequest(url));
        await waitForNextUpdate();

        expect(result.current.data).toEqual(data);
        expect(result.current.error).toBeNull();
    });

    it('skal feile i å hente data frå server', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useRequest('en url som ikke finnes'));
        await waitForNextUpdate();

        expect(result.current.data).toBeUndefined();
        expect(result.current.error?.message).toBe('Request failed with status code 404');
    });

    it('skal ikke hente data når kallet er suspendert', async () => {
        const data = {
            test: true,
        };
        const options = {
            isSuspended: true,
        };
        const url = '/storage/kvittering/foreldrepenger';
        apiMock.onGet(url).replyOnce(200, data);

        const { result } = renderHook(() => useRequest(url, options));

        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toBeNull();
    });
});
