import { API_URLS } from 'api/queries';
import ky, { HTTPError } from 'ky';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VERSJON_MELLOMLAGRING } from 'utils/mellomlagringUtils';

import { captureMessage } from '@navikt/fp-observability';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt, ProblemDetails } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType, useContextComplete } from './FpDataContext';

export type FpMellomlagretData = {
    version: number;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    foreldrepengerSaker: FpSak_fpoversikt[];
    erEndringssøknad: boolean;
    søknadGjelderEtNyttBarn?: boolean;
} & ContextDataMap;

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const useMellomlagreSøknad = (
    foreldrepengerSaker: FpSak_fpoversikt[],
    søkerInfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    søknadGjelderEtNyttBarn?: boolean,
) => {
    const navigate = useNavigate();
    const state = useContextComplete();

    const [skalMellomlagre, setSkalMellomlagre] = useState(false);

    const promiseRef = useRef<() => void>(null);

    useEffect(() => {
        if (skalMellomlagre) {
            const currentRoute = notEmpty(state[ContextDataType.APP_ROUTE]);

            const lagre = async () => {
                setSkalMellomlagre(false);

                void navigate(currentRoute);

                const data = {
                    version: VERSJON_MELLOMLAGRING,
                    søkerInfo,
                    foreldrepengerSaker,
                    erEndringssøknad,
                    søknadGjelderEtNyttBarn,
                    ...state,
                } satisfies FpMellomlagretData;

                try {
                    await ky.post(API_URLS.mellomlagring, {
                        json: data,
                        headers: {
                            fnr: søkerInfo.fnr,
                        },
                    });
                } catch (error: unknown) {
                    if (error instanceof HTTPError) {
                        if (error.response.status === 401 || error.response.status === 403) {
                            throw error;
                        }

                        const jsonResponse = error.data as ProblemDetails | undefined;
                        const callId = jsonResponse?.callId ?? UKJENT_UUID;
                        captureMessage(FEIL_VED_INNSENDING + callId);
                        throw new Error(FEIL_VED_INNSENDING + callId.substring(0, 6), { cause: error });
                    }
                    if (error instanceof Error) {
                        throw error;
                    }
                    throw new Error(String(error), { cause: error });
                }

                if (promiseRef.current) {
                    promiseRef.current();
                }
            };

            lagre().catch((error) => {
                //Logg feil, men ikkje vis feilmelding til brukar
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                captureMessage(error.message);

                if (promiseRef.current) {
                    promiseRef.current();
                }
            });
        }
    }, [skalMellomlagre]);

    const mellomlagreSøknadOgNaviger = useCallback(() => {
        //Må gå via state change sidan ein må få oppdatert context før ein mellomlagrar
        setSkalMellomlagre(true);

        const promise = new Promise<void>((resolve) => {
            promiseRef.current = resolve;
        });

        return promise;
    }, []);

    return mellomlagreSøknadOgNaviger;
};
