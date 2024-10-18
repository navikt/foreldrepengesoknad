import * as Sentry from '@sentry/browser';
import { useMutation } from '@tanstack/react-query';
import { FEIL_VED_INNSENDING, UKJENT_UUID, getSøknadsdataForInnsending } from 'api/apiUtils';
import ky, { HTTPError } from 'ky';
import { Kvittering } from 'types/Kvittering';
import { getFamiliehendelsedato } from 'utils/barnUtils';

import { useAbortSignal } from '@navikt/fp-api';
import { LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import Environment from '../Environment';
import { ContextDataType, useContextGetAnyData } from './FpDataContext';

const useSendSøknad = (
    fødselsnr: string,
    erEndringssøknad: boolean,
    setKvittering: (kvittering: Kvittering) => void,
    locale: LocaleNo,
) => {
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const { mutate: slettMellomlagring } = useMutation({
        mutationFn: () => ky.delete(`${Environment.PUBLIC_PATH}/rest/storage/foreldrepenger`),
    });

    const send = async () => {
        const uttaksplanMetadata = notEmpty(hentData(ContextDataType.UTTAKSPLAN_METADATA));
        const barn = notEmpty(hentData(ContextDataType.OM_BARNET));

        const cleanedSøknad = getSøknadsdataForInnsending(
            erEndringssøknad,
            hentData,
            uttaksplanMetadata.perioderSomSkalSendesInn!,
            getFamiliehendelsedato(barn),
            locale,
            uttaksplanMetadata.endringstidspunkt,
        );

        //TODO (TOR) Denne må håndterast i uttaksplan-steget
        if (cleanedSøknad.uttaksplan.length === 0 && cleanedSøknad.erEndringssøknad) {
            throw new Error('Søknaden din inneholder ingen nye perioder.');
        }

        const abortSignal = initAbortSignal();

        try {
            const url = cleanedSøknad.erEndringssøknad ? '/rest/soknad/endre' : '/rest/soknad';
            const response = await ky.post(`${Environment.PUBLIC_PATH}${url}`, {
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
                const callIdForBruker = jsonResponse?.uuid ? jsonResponse?.uuid.slice(0, 8) : UKJENT_UUID;
                Sentry.captureMessage(FEIL_VED_INNSENDING + callIdForBruker);
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

export default useSendSøknad;
