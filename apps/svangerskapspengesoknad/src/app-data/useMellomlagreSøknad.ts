import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { ApiError, captureApiError, captureMessage } from '@navikt/fp-observability';
import { FpSoknadProblemDetails, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { ContextDataMap, ContextDataType, useContextComplete, useContextReset } from './SvpDataContext';

// Bumpet fra 9 til 10: landkoder i skjemaet gikk fra alpha-2 til alpha-3 (ISO 3166-1),
// så eldre mellomlagret data må forkastes for å unngå at gamle 2-bokstavskoder blir sendt inn.
export const VERSJON_MELLOMLAGRING = 10;

export type SvpMellomlagretData = {
    version: number;
    søkerInfo: SvpPersonopplysningerDto_fpoversikt;
} & ContextDataMap;

type MellomlagreSøknadOptions = {
    // Naviger (react-router) til gjeldande steg før lagring. Default true.
    // Settast false når kallaren skal forlate appen (t.d. fortsett-seinare).
    naviger?: boolean;
    // Prøv kallet på nytt ved transiente feil. Default false.
    medRetry?: boolean;
};

export type MellomlagreSøknadFn = (options?: MellomlagreSøknadOptions) => Promise<void>;

const tilMellomlagringsFeil = (error: unknown): Error => {
    if (error instanceof HTTPError) {
        if (error.response.status === 401 || error.response.status === 403) {
            return error;
        }
        const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
        return new ApiError('', 'Feil ved mellomlagring av svangerskapspengesøknad', jsonResponse);
    }
    if (error instanceof Error) {
        return error;
    }
    return new Error(String(error), { cause: error });
};

export const useMellomlagreSøknad = (
    søkerInfo: SvpPersonopplysningerDto_fpoversikt,
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();
    const resetState = useContextReset();

    const [forespørsel, setForespørsel] = useState<{ naviger: boolean; medRetry: boolean } | null>(null);

    const promiseRef = useRef<() => void>(null);

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    useEffect(() => {
        if (!forespørsel) {
            return;
        }

        const { naviger, medRetry } = forespørsel;

        const lagreEllerSlett = async () => {
            setForespørsel(null);

            const currentPath = state[ContextDataType.APP_ROUTE];
            if (currentPath) {
                if (naviger) {
                    void navigate(currentPath);
                }

                try {
                    const data = {
                        version: VERSJON_MELLOMLAGRING,
                        søkerInfo,
                        ...state,
                    } satisfies SvpMellomlagretData;
                    await ky.post(API_URLS.mellomlagring, {
                        json: data,
                        ...(medRetry && {
                            retry: {
                                limit: 2,
                                methods: ['post'],
                                statusCodes: [408, 429, 500, 502, 503, 504],
                            },
                        }),
                    });
                } catch (error: unknown) {
                    throw tilMellomlagringsFeil(error);
                }
            } else {
                setHarGodkjentVilkår(false);
                resetState();
                void navigate('/');

                // Ved avbryt så set ein Path = undefined og må så rydda opp i data her
                slettMellomlagring();
            }

            if (promiseRef.current) {
                promiseRef.current();
            }
        };

        const lagreOgHåndterFeil = async () => {
            try {
                await lagreEllerSlett();
            } catch (error: unknown) {
                const lagringsfeil = error as Error;
                if (lagringsfeil instanceof ApiError) {
                    captureApiError(lagringsfeil.telemetryMessage, lagringsfeil.problemDetails);
                } else {
                    captureMessage(lagringsfeil.message);
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            }
        };

        void lagreOgHåndterFeil();
    }, [forespørsel]);

    const mellomlagreOgNaviger = useCallback<MellomlagreSøknadFn>((options) => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setForespørsel({ naviger: options?.naviger ?? true, medRetry: options?.medRetry ?? false });

        const promise = new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });

        return promise;
    }, []);

    return mellomlagreOgNaviger;
};
