import Api from 'api/api';
import {
    FEIL_VED_INNSENDING,
    UKJENT_UUID,
    getErrorCallId,
    getSøknadsdataForInnsending,
    sendErrorMessageToSentry,
} from 'api/apiUtils';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Kvittering } from 'types/Kvittering';
import { getFamiliehendelsedato } from 'utils/barnUtils';

import { useAbortSignal } from '@navikt/fp-api';
import { LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetAnyData } from './FpDataContext';

export const isAxiosError = (candidate: unknown): candidate is AxiosError<any> => {
    if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
        return true;
    }
    return false;
};

const useSendSøknad = (
    fødselsnr: string,
    erEndringssøknad: boolean,
    setKvittering: (kvittering: Kvittering) => void,
    locale: LocaleNo,
) => {
    const hentData = useContextGetAnyData();
    const { initAbortSignal } = useAbortSignal();

    const [error, setError] = useState<Error>();

    const sendSøknad = async () => {
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

        //TODO (TOR) Denne bør vel håndterast på eit tidligare tidspunkt?
        if (cleanedSøknad.uttaksplan.length === 0 && cleanedSøknad.erEndringssøknad) {
            setError(new Error('Søknaden din inneholder ingen nye perioder.'));
        }

        const abortSignal = initAbortSignal();

        let kvittering;

        try {
            const response = await Api.sendSøknad(cleanedSøknad, fødselsnr, abortSignal);
            kvittering = response.data;
        } catch (postError: unknown) {
            if (isAxiosError(postError)) {
                sendErrorMessageToSentry(postError);
                const submitErrorCallId = getErrorCallId(postError);
                const callIdForBruker =
                    submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
                setError(new Error(FEIL_VED_INNSENDING + callIdForBruker));
            } else {
                setError(new Error(String(postError)));
            }
        }

        try {
            await Api.deleteMellomlagretSøknad(fødselsnr, abortSignal);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (deleteError) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        setKvittering(kvittering);
    };

    return { sendSøknad, errorSendSøknad: error };
};

export default useSendSøknad;
