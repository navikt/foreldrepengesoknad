import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import { FEIL_VED_INNSENDING, UKJENT_UUID, getSøknadsdataForInnsending } from 'api/apiUtils';
import ky, { HTTPError } from 'ky';
import { Kvittering } from 'types/Kvittering';
import { getFamiliehendelsedato } from 'utils/barnUtils';

import { useAbortSignal } from '@navikt/fp-api';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetAnyData } from './FpDataContext';

export const useSendSøknad = (
    fødselsnr: string,
    erEndringssøknad: boolean,
    setKvittering: (kvittering: Kvittering) => void,
) => {
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${import.meta.env.BASE_URL}/rest/storage/foreldrepenger`),
    });

    const send = async () => {
        const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
        const barn = notEmpty(hentData(ContextDataType.OM_BARNET));

        const cleanedSøknad = getSøknadsdataForInnsending(
            erEndringssøknad,
            hentData,
            uttaksplanMetadata.perioderSomSkalSendesInn!,
            getFamiliehendelsedato(barn),
            uttaksplanMetadata.endringstidspunkt,
        );

        //TODO (TOR) Denne må håndterast i uttaksplan-steget
        if (cleanedSøknad.uttaksplan.uttaksperioder.length === 0 && erEndringssøknad) {
            throw new Error('Søknaden din inneholder ingen nye perioder.');
        }

        const abortSignal = initAbortSignal();

        try {
            const url = erEndringssøknad ? '/rest/soknad/foreldrepenger/endre' : '/rest/soknad/foreldrepenger';
            const response = await ky.post(`${import.meta.env.BASE_URL}${url}`, {
                json: cleanedSøknad,
                signal: abortSignal,
                timeout: 120 * 1000,
                headers: {
                    fnr: fødselsnr,
                },
            });

            slettMellomlagring();

            setKvittering((await response.json()) as Kvittering);
        } catch (error: unknown) {
            if (error instanceof HTTPError) {
                if (abortSignal.aborted || error.response.status === 401 || error.response.status === 403) {
                    throw error;
                }

                const jsonResponse = await error.response.json();
                Sentry.captureMessage(`${FEIL_VED_INNSENDING}${JSON.stringify(jsonResponse)}`);
                const callIdForBruker = jsonResponse?.uuid ?? UKJENT_UUID;
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

    return { sendSøknad, errorSendSøknad: error };
};
