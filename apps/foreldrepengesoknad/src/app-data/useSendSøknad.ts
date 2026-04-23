import { useMutation } from '@tanstack/react-query';
import { getSøknadsdataForInnsending } from 'api/apiUtils';
import { API_URLS } from 'api/queries';
import { SøknadRoutes } from 'appData/routes';
import ky, { HTTPError } from 'ky';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { captureApiError } from '@navikt/fp-observability';
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt, FpSoknadProblemDetails } from '@navikt/fp-types';
import { useAbortSignal } from '@navikt/fp-utils';

import { useContextGetAnyData } from './FpDataContext';

export const useSendSøknad = (
    søkerinfo: FpPersonopplysningerDto_fpoversikt,
    erEndringssøknad: boolean,
    foreldrepengerSaker: FpSak_fpoversikt[],
) => {
    const navigate = useNavigate();
    const intl = useIntl();
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    const send = async () => {
        const cleanedSøknad = getSøknadsdataForInnsending(erEndringssøknad, hentData, søkerinfo, foreldrepengerSaker);

        const abortSignal = initAbortSignal();

        try {
            const url = erEndringssøknad ? API_URLS.endreSøknad : API_URLS.sendSøknad;
            await ky.post(url, {
                json: cleanedSøknad,
                signal: abortSignal,
                timeout: 120 * 1000,
            });
            slettMellomlagring();
            void navigate(SøknadRoutes.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (abortSignal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                // Hvis man får 409 har man sendt inn nøyaktig samme søknad.
                // Da ønsker vi at de skal følge samme løp som om de fikk 200 og havne på kvitteringssiden slik at de kan se søknad i innsyn.
                if (error.response.status === 409) {
                    slettMellomlagring();
                    return navigate(SøknadRoutes.KVITTERING);
                }

                const jsonResponse = error.data as FpSoknadProblemDetails | undefined;
                captureApiError('Feil ved innsending av foreldrepengesøknad', jsonResponse);
                const callId = jsonResponse?.callId;
                const feilmelding = callId
                    ? intl.formatMessage({ id: 'useSendSøknad.FeilVedInnsending.MedCallId' }, { callId: callId.substring(0, 6) })
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

    return { sendSøknad, errorSendSøknad: error };
};
