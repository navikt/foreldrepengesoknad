import { useCallback, useMemo, useState } from 'react';
import { AxiosInstance } from 'axios';
import * as Sentry from '@sentry/browser';
import { Kvittering, LocaleNo } from '@navikt/fp-types';
import { ApiAccessError, ApiGeneralError, deleteData, isApiError, postData } from '@navikt/fp-api';
import { getSøknadForInnsending } from 'app/utils/apiUtils';
import Environment from 'app/Environment';
import { FEIL_VED_INNSENDING } from 'app/utils/errorUtils';
import { useContextGetAnyData } from './SvpDataContext';

const useSendSøknad = (svpApi: AxiosInstance, setKvittering: (kvittering: Kvittering) => void, locale: LocaleNo) => {
    const hentData = useContextGetAnyData();

    const [error, setError] = useState<ApiAccessError | ApiGeneralError>();

    const sendSøknad = useCallback(
        async (abortSignal: AbortSignal) => {
            const søknadForInnsending = getSøknadForInnsending(hentData, locale);

            let kvittering;

            try {
                kvittering = await postData<typeof søknadForInnsending, Kvittering>(
                    svpApi,
                    `${Environment.REST_API_URL}/soknad/svangerskapspenger`,
                    søknadForInnsending,
                    FEIL_VED_INNSENDING,
                    true,
                    abortSignal,
                );
            } catch (error: unknown) {
                if (isApiError(error)) {
                    if (error instanceof ApiGeneralError) {
                        Sentry.captureMessage(error.message);
                    }
                    setError(error);
                } else {
                    throw new Error('This should never happen');
                }
            }

            if (kvittering) {
                try {
                    await deleteData(svpApi, '/storage/svangerskapspenger', FEIL_VED_INNSENDING, abortSignal);
                } catch (error) {
                    // Vi bryr oss ikke om feil her. Logges bare i backend
                }

                setKvittering(kvittering);
            }
        },
        [hentData, setKvittering, locale, svpApi],
    );

    return useMemo(
        () => ({
            sendSøknad,
            errorSendSøknad: error,
        }),
        [sendSøknad, error],
    );
};

export default useSendSøknad;
