import ky, { HTTPError } from 'ky';
import { useCallback, useState } from 'react';

import { captureApiError, captureMessage } from '@navikt/fp-observability';
import type { ProblemDetails } from '@navikt/fp-types';
import type { Mellomlagringsfeil } from '@navikt/fp-ui';

import { MellomlagringResultat, lagMellomlagringskø } from './lagMellomlagringskø';

const RETRY = {
    limit: 2,
    methods: ['post'],
    statusCodes: [408, 429, 500, 502, 503, 504],
};

const rapporterFeil = (telemetrimelding: string, error: unknown) => {
    if (error instanceof HTTPError) {
        captureApiError(telemetrimelding, error.data as ProblemDetails | undefined);
    } else {
        captureMessage(`${telemetrimelding}: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export type LagreMellomlagringOptions = {
    // Prøv kallet på nytt ved transiente feil.
    medRetry?: boolean;
    // Vis feilmelding når lagringen feiler. 401 og 403 håndteres alltid.
    visFeilTilBruker?: boolean;
};

interface Props<T> {
    url: string;
    lagHeaders?: (data: T) => Record<string, string>;
    telemetrimeldingLagring: string;
    telemetrimeldingSletting: string;
}

export const lagMellomlagringskøMotApi = <T>({
    url,
    lagHeaders,
    telemetrimeldingLagring,
    telemetrimeldingSletting,
}: Props<T>) =>
    lagMellomlagringskø<T>({
        lagre: async (data, medRetry): Promise<MellomlagringResultat> => {
            try {
                await ky.post(url, {
                    json: data,
                    headers: lagHeaders?.(data),
                    ...(medRetry && { retry: RETRY }),
                });
                return 'OK';
            } catch (error: unknown) {
                if (error instanceof HTTPError && error.response.status === 401) {
                    location.reload();
                    return 'UTLOGGET';
                }
                if (error instanceof HTTPError && error.response.status === 403) {
                    return 'INGEN_TILGANG';
                }
                rapporterFeil(telemetrimeldingLagring, error);
                return 'FEILET';
            }
        },
        slett: async () => {
            try {
                await ky.delete(url);
            } catch (error: unknown) {
                rapporterFeil(telemetrimeldingSletting, error);
            }
        },
    });

export const useMellomlagringskø = <T>(props: Props<T>) => {
    const [lagringsfeil, setLagringsfeil] = useState<Mellomlagringsfeil>();
    const [kø] = useState(() => lagMellomlagringskøMotApi(props));

    const lagre = useCallback(
        async (data: T, options?: LagreMellomlagringOptions) => {
            const resultat = await kø.lagre(data, options?.medRetry ?? false);
            if (resultat === 'INGEN_TILGANG' || (resultat === 'FEILET' && options?.visFeilTilBruker)) {
                setLagringsfeil(resultat);
            }
            return resultat;
        },
        [kø],
    );

    const nullstillLagringsfeil = useCallback(() => setLagringsfeil(undefined), []);

    return { lagre, slett: kø.slett, lagringsfeil, nullstillLagringsfeil };
};
