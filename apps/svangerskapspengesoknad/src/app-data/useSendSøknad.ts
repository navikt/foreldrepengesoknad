import { useMutation } from '@tanstack/react-query';
import { API_URLS } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import ky, { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';

import { captureMessage } from '@navikt/fp-observability';
import { ProblemDetails, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';
import { useAbortSignal } from '@navikt/fp-utils';

import { useContextGetAnyData } from './SvpDataContext';
import { getSøknadForInnsending } from './getSøknadForInnsending';

const UKJENT_UUID = 'ukjent uuid';
const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil-id: ';

export const useSendSøknad = (søkerinfo: SvpPersonopplysningerDto_fpoversikt) => {
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
            void navigate(SøknadRoute.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                captureMessage(error.message);

                if (signal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = await error.response.json<ProblemDetails>();
                captureMessage(`${FEIL_VED_INNSENDING}${JSON.stringify(jsonResponse)}`);
                const callId = jsonResponse?.callId ?? UKJENT_UUID;
                throw new Error(FEIL_VED_INNSENDING + callId.substring(0, 6), { cause: error });
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

    return {
        sendSøknad: () => sendSøknad(),
        errorSendSøknad: error,
    };
};
