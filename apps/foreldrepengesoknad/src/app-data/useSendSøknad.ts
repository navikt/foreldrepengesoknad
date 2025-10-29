import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import { FEIL_VED_INNSENDING, UKJENT_UUID, getSøknadsdataForInnsending } from 'api/apiUtils';
import { API_URLS } from 'api/queries';
import { SøknadRoutes } from 'appData/routes';
import ky, { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import { getFamiliehendelsedato } from 'utils/barnUtils';

import { useAbortSignal } from '@navikt/fp-api';
import { PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetAnyData } from './FpDataContext';

export const useSendSøknad = (søkerinfo: PersonMedArbeidsforholdDto_fpoversikt, erEndringssøknad: boolean) => {
    const navigate = useNavigate();
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(API_URLS.mellomlagring),
    });

    const send = async () => {
        const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
        const barn = notEmpty(hentData(ContextDataType.OM_BARNET));

        const cleanedSøknad = getSøknadsdataForInnsending(
            erEndringssøknad,
            hentData,
            uttaksplanMetadata.perioderSomSkalSendesInn!,
            getFamiliehendelsedato(barn),
            søkerinfo,
            uttaksplanMetadata.endringstidspunkt,
        );

        //TODO (TOR) Denne må håndterast i uttaksplan-steget
        if (cleanedSøknad.uttaksplan.uttaksperioder.length === 0 && erEndringssøknad) {
            throw new Error('Søknaden din inneholder ingen nye perioder.');
        }

        const abortSignal = initAbortSignal();

        try {
            const url = erEndringssøknad ? API_URLS.endreSøknad : API_URLS.sendSøknad;
            await ky.post(url, {
                json: cleanedSøknad,
                signal: abortSignal,
                timeout: 120 * 1000,
            });
            slettMellomlagring();
            navigate(SøknadRoutes.KVITTERING);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (abortSignal.aborted || error.response.status === 401 || error.response.status === 403) {
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

    return { sendSøknad, errorSendSøknad: error };
};
