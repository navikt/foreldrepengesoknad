import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import ky, { HTTPError } from 'ky';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { captureApiError } from '@navikt/fp-observability';
import { FpSoknadProblemDetails, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { useAbortSignal } from '@navikt/fp-utils';

import { useContextGetAnyData } from './SvpDataContext';
import { getSøknadForInnsending } from './getSøknadForInnsending';

export const useSendSøknad = (søkerinfo: SvpPersonopplysningerDto_fpoversikt) => {
    const navigate = useNavigate();
    const intl = useIntl();
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
            void navigate(SøknadRoute.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
                captureApiError('Feil ved innsending av svangerskapspengesøknad', jsonResponse);
                const callId = jsonResponse?.callId;
                const feilmelding = callId
                    ? intl.formatMessage(
                          { id: 'useSendSøknad.FeilVedInnsending.MedCallId' },
                          { callId: callId.substring(0, 6) },
                      )
                    : intl.formatMessage({ id: 'useSendSøknad.FeilVedInnsending.UtenCallId' });
                throw new Error(feilmelding, { cause: error });
            }
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(String(error), { cause: error });
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
