import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import ky, { HTTPError } from 'ky';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAbortSignal } from '@navikt/fp-api';
import { PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { useContextGetAnyData } from './SvpDataContext';
import { getSøknadForInnsending } from './getSøknadForInnsending';

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const useSendSøknad = (søkerinfo: PersonMedArbeidsforholdDto_fpoversikt) => {
    const navigate = useNavigate();
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    const send = async () => {
        const søknadForInnsending = getSøknadForInnsending(søkerinfo, hentData);

        const signal = initAbortSignal();

        try {
            await ky.post(API_URLS.sendSøknad, {
                json: søknadForInnsending,
                signal,
            });

            slettMellomlagring();
            navigate(SøknadRoute.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                Sentry.captureMessage(error.message);

                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = await error.response.json();
                Sentry.captureMessage(`${FEIL_VED_INNSENDING}${JSON.stringify(jsonResponse)}`);
                const callIdForBruker = jsonResponse?.uuid ?? UKJENT_UUID;
                throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
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
