import { AxiosError } from 'axios';
import { notEmpty } from '@navikt/fp-validation';
import {
    FEIL_VED_INNSENDING,
    FOR_MANGE_VEDLEGG_ERROR,
    UKJENT_UUID,
    getErrorCallId,
    getSøknadsdataForInnsending,
    sendErrorMessageToSentry,
} from 'app/api/apiUtils';
import { FpDataType, useFpStateAllDataFn } from './FpDataContext';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { ISOStringToDate } from '@navikt/fp-common';
import Api from 'app/api/api';
import { Kvittering } from 'app/types/Kvittering';
import { redirectToLogin } from 'app/utils/redirectToLogin';

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
) => {
    const hentData = useFpStateAllDataFn();

    const sendSøknad = async (abortSignal: AbortSignal) => {
        const uttaksplanMetadata = notEmpty(hentData(FpDataType.UTTAKSPLAN_METADATA));
        const barn = notEmpty(hentData(FpDataType.OM_BARNET));

        const cleanedSøknad = getSøknadsdataForInnsending(
            erEndringssøknad,
            hentData,
            uttaksplanMetadata.perioderSomSkalSendesInn!,
            ISOStringToDate(getFamiliehendelsedato(barn))!,
            uttaksplanMetadata.endringstidspunkt,
        );

        //TODO (TOR) Denne bør vel håndterast på eit tidligare tidspunkt?
        if (cleanedSøknad.uttaksplan.length === 0 && cleanedSøknad.erEndringssøknad) {
            throw new Error('Søknaden din inneholder ingen nye perioder.');
        }

        try {
            const response = await Api.sendSøknad(cleanedSøknad, fødselsnr, abortSignal);
            setKvittering(response.data);
        } catch (error: unknown) {
            //TODO (TOR) Håndter dette utanfor denne hook'en (På same måte i alle appane)

            if (isAxiosError(error)) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    redirectToLogin();
                }

                sendErrorMessageToSentry(error);

                if (
                    error.response &&
                    error.response.status === 400 &&
                    error.response.data &&
                    error.response.data.messages &&
                    error.response.data.messages.includes(
                        'Vedleggslisten kan ikke inneholde flere enn 40 opplastede vedlegg',
                    )
                ) {
                    throw new Error(FOR_MANGE_VEDLEGG_ERROR);
                }

                const submitErrorCallId = getErrorCallId(error);
                const callIdForBruker =
                    submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
                throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
            }
            throw new Error(String(error));
        }

        try {
            await Api.deleteMellomlagretSøknad(fødselsnr, abortSignal);

            const vedleggUtenLastOppSenere = cleanedSøknad.vedlegg.filter((v) => v.uuid);

            if (vedleggUtenLastOppSenere.length > 0) {
                await Api.deleteMellomlagredeVedlegg(fødselsnr, vedleggUtenLastOppSenere, abortSignal);
            }
        } catch (error) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }
    };

    return sendSøknad;
};

export default useSendSøknad;
