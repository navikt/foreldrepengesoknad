import { AxiosError } from 'axios';
import { useState } from 'react';

import { LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import Api from 'app/api/api';
import {
    FEIL_VED_INNSENDING,
    FOR_MANGE_VEDLEGG_ERROR,
    UKJENT_UUID,
    getErrorCallId,
    getSøknadsdataForInnsending,
    sendErrorMessageToSentry,
} from 'app/api/apiUtils';
import { Kvittering } from 'app/types/Kvittering';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

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

    const [error, setError] = useState<Error>();

    const sendSøknad = async (abortSignal: AbortSignal) => {
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

        let kvittering;

        try {
            const response = await Api.sendSøknad(cleanedSøknad, fødselsnr, abortSignal);
            kvittering = response.data;
        } catch (postError: unknown) {
            //TODO (TOR) Håndter dette utanfor denne hook'en (På same måte i alle appane)

            if (isAxiosError(postError)) {
                sendErrorMessageToSentry(postError);

                if (
                    postError.response?.status === 400 &&
                    postError.response?.data?.messages?.includes(
                        'Vedleggslisten kan ikke inneholde flere enn 40 opplastede vedlegg',
                    )
                ) {
                    setError(new Error(FOR_MANGE_VEDLEGG_ERROR));
                }

                const submitErrorCallId = getErrorCallId(postError);
                const callIdForBruker =
                    submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
                setError(new Error(FEIL_VED_INNSENDING + callIdForBruker));
            }
            setError(new Error(String(postError)));
        }

        try {
            await Api.deleteMellomlagretSøknad(fødselsnr, abortSignal);
        } catch (deleteError) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        setKvittering(kvittering);
    };

    return { sendSøknad, errorSendSøknad: error };
};

export default useSendSøknad;
