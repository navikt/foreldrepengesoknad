import { AxiosError } from 'axios';
import { getSøknadForInnsending } from 'app/utils/apiUtils';
import { useContextGetAnyData } from './SvpDataContext';
import Api from 'app/api/api';
import { FEIL_VED_INNSENDING, UKJENT_UUID, getErrorCallId, sendErrorMessageToSentry } from 'app/utils/errorUtils';
import { redirectToLogin } from 'app/utils/redirectToLogin';
import { LocaleNo } from '@navikt/fp-types';

export const isAxiosError = (candidate: unknown): candidate is AxiosError<any> => {
    if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
        return true;
    }
    return false;
};

const useSendSøknad = (fødselsnr: string, setKvittering: (kvittering: Kvittering) => void, locale: LocaleNo) => {
    const hentData = useContextGetAnyData();

    const sendSøknad = async (abortSignal: AbortSignal) => {
        const søknadForInnsending = getSøknadForInnsending(hentData);

        let kvittering;

        try {
            const response = await Api.sendSøknad(søknadForInnsending, abortSignal);
            kvittering = response.data;
        } catch (error: unknown) {
            //TODO (TOR) Håndter dette utanfor denne hook'en (På same måte i alle appane)

            if (isAxiosError(error)) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    redirectToLogin();
                }

                sendErrorMessageToSentry(error);

                const submitErrorCallId = getErrorCallId(error);
                const callIdForBruker =
                    submitErrorCallId !== UKJENT_UUID ? submitErrorCallId.slice(0, 8) : submitErrorCallId;
                throw new Error(FEIL_VED_INNSENDING + callIdForBruker);
            }
            throw new Error(String(error));
        }

        try {
            await Api.deleteMellomlagretSøknad(fødselsnr, abortSignal);
        } catch (error) {
            // Vi bryr oss ikke om feil her. Logges bare i backend
        }

        setKvittering(kvittering);
    };

    return sendSøknad;
};

export default useSendSøknad;
