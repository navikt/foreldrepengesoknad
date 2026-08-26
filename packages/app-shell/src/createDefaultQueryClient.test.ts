import { QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDefaultQueryClient } from './createDefaultQueryClient';

/**
 * En fane som har ligget åpen til sesjonen løp ut, oppdager ingenting før
 * brukeren prøver å hente eller lagre noe. Testene sikrer at 401 fra både
 * queries og mutations laster siden på nytt, slik at Wonderwall får sendt
 * brukeren til innlogging.
 */

const lagHttpError = (status: number) =>
    new HTTPError(
        new Response(null, { status }),
        new Request('https://www.nav.no/foreldrepenger/soknad/fpsoknad/api/sak'),
        // ky krever et options-objekt, men bruker det ikke i denne konstruktøren.
        {} as never,
    );

const stubReload = () => {
    const reload = vi.fn();
    vi.stubGlobal('location', { ...globalThis.location, reload });
    return reload;
};

const kjørQueryFeil = (client: QueryClient, error: unknown) => {
    // QueryCache.onError nås via cache-instansen, uten å måtte montere en komponent.
    client.getQueryCache().config.onError?.(error as Error, {} as never);
};

const kjørMutationFeil = (client: QueryClient, error: unknown) => {
    client.getMutationCache().config.onError?.(error as Error, undefined, undefined, {} as never, {} as never);
};

describe('createDefaultQueryClient', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('laster siden på nytt når en query feiler med 401', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient({ apiQueryErrorMessage: 'test' });

        kjørQueryFeil(client, lagHttpError(401));

        expect(reload).toHaveBeenCalledOnce();
    });

    it('laster siden på nytt når en mutation feiler med 401', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient({ apiQueryErrorMessage: 'test' });

        kjørMutationFeil(client, lagHttpError(401));

        expect(reload).toHaveBeenCalledOnce();
    });

    it('laster siden på nytt ved 401 fra mutation også uten apiQueryErrorMessage', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient();

        kjørMutationFeil(client, lagHttpError(401));

        expect(reload).toHaveBeenCalledOnce();
    });

    it('laster ikke siden på nytt når en query feiler med 403', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient({ apiQueryErrorMessage: 'test' });

        kjørQueryFeil(client, lagHttpError(403));

        expect(reload).not.toHaveBeenCalled();
    });

    it('laster ikke siden på nytt når en mutation feiler med 403', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient({ apiQueryErrorMessage: 'test' });

        kjørMutationFeil(client, lagHttpError(403));

        expect(reload).not.toHaveBeenCalled();
    });

    it('laster ikke siden på nytt når en mutation feiler med 500', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient({ apiQueryErrorMessage: 'test' });

        kjørMutationFeil(client, lagHttpError(500));

        expect(reload).not.toHaveBeenCalled();
    });

    it('laster ikke siden på nytt ved en vanlig Error fra mutation', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient({ apiQueryErrorMessage: 'test' });

        kjørMutationFeil(client, new Error('nettverksfeil'));

        expect(reload).not.toHaveBeenCalled();
    });

    it('registrerer ingen queryCache-handler uten apiQueryErrorMessage, så 401 fra uinnloggede apper ignoreres', () => {
        const reload = stubReload();
        const client = createDefaultQueryClient();

        kjørQueryFeil(client, lagHttpError(401));

        expect(reload).not.toHaveBeenCalled();
    });
});
