import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import ky, { HTTPError } from 'ky';
import { useMemo } from 'react';

import { useAbortSignal } from '@navikt/fp-api';
import { Arbeidsforhold, Kvittering, LocaleNo } from '@navikt/fp-types';

import { useContextGetAnyData } from './SvpDataContext';
import { getSøknadForInnsending } from './getSøknadForInnsending';

const UKJENT_UUID = 'ukjent uuid';
export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const useSendSøknad = (
    setKvittering: (kvittering: Kvittering) => void,
    locale: LocaleNo,
    arbeidsforhold: Arbeidsforhold[],
) => {
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/svangerskapspenger`),
    });

    const send = async () => {
        const søknadForInnsending = getSøknadForInnsending(arbeidsforhold, hentData, locale);

        const signal = initAbortSignal();

        try {
            const response = await ky.post(`${import.meta.env.BASE_URL}/rest/soknad/svangerskapspenger`, {
                json: søknadForInnsending,
                signal,
            });

            slettMellomlagring();

            setKvittering((await response.json()) as Kvittering);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                Sentry.captureMessage(error.message);

                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = await error.response.json();
                const callIdForBruker = jsonResponse?.uuid ?? UKJENT_UUID;
                const errorMessage =
                    jsonResponse?.message && Array.isArray(jsonResponse.message) && jsonResponse.message.length > 0
                        ? jsonResponse.message[0]
                        : '-';
                Sentry.captureMessage(`{FEIL_VED_INNSENDING}${callIdForBruker} - errorMessage: ${errorMessage}`);
                throw Error(FEIL_VED_INNSENDING + callIdForBruker);
            }
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(String(error));
        }
    };

    const { mutateAsync: sendSøknad, error } = useMutation({
        mutationFn: () => send(),
    });

    return useMemo(
        () => ({
            sendSøknad: () => sendSøknad(),
            errorSendSøknad: error,
        }),
        [sendSøknad, error],
    );
};
