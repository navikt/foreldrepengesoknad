import ky, { HTTPError, ResponsePromise } from 'ky';

import { captureApiError } from '@navikt/fp-observability';

import { lagMellomlagringskøMotApi } from './useMellomlagringskø';

vi.mock('@navikt/fp-observability', () => ({ captureApiError: vi.fn(), captureMessage: vi.fn() }));

const lagHttpError = (status: number) =>
    new HTTPError(new Response(null, { status }), new Request('https://example.com'), {} as never);

const lagKø = () =>
    lagMellomlagringskøMotApi<{ steg: string }>({
        url: '/mellomlagring',
        telemetrimeldingLagring: 'Feil ved lagring',
        telemetrimeldingSletting: 'Feil ved sletting',
    });

describe('lagMellomlagringskøMotApi', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('skal rapportere feil ved sletting uten å avvise', async () => {
        vi.spyOn(ky, 'delete').mockReturnValue(Promise.reject(lagHttpError(500)) as unknown as ResponsePromise);

        await lagKø().slett();

        expect(captureApiError).toHaveBeenCalledWith('Feil ved sletting', undefined);
    });

    it('skal forkaste lagring som ikke er startet når mellomlagringen slettes', async () => {
        let fullførFørste: () => void = () => undefined;
        const postMock = vi.spyOn(ky, 'post').mockReturnValueOnce(
            new Promise<void>((resolve) => {
                fullførFørste = resolve;
            }) as unknown as ResponsePromise,
        );
        const deleteMock = vi.spyOn(ky, 'delete').mockReturnValue(Promise.resolve() as unknown as ResponsePromise);

        const kø = lagKø();
        const første = kø.lagre({ steg: 'a' }, false);
        const andre = kø.lagre({ steg: 'b' }, false);
        const sletting = kø.slett();

        expect(deleteMock).not.toHaveBeenCalled();

        fullførFørste();
        await sletting;

        expect(await første).toBe('OK');
        expect(await andre).toBe('FORKASTET');
        expect(postMock).toHaveBeenCalledOnce();
        expect(deleteMock).toHaveBeenCalledOnce();
    });
});
