import * as Sentry from '@sentry/browser';
import { AxiosInstance } from 'axios';
import { useCallback, useMemo, useState } from 'react';

import { ApiAccessError, ApiGeneralError, deleteData, isApiError, postData } from '@navikt/fp-api';
import { Kvittering, LocaleNo } from '@navikt/fp-types';

import Environment from './Environment';
import { useContextGetAnyData } from './SvpDataContext';
import { getSøknadForInnsending } from './getSøknadForInnsending';

export const FEIL_VED_INNSENDING =
    'Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ';

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
                    `${Environment.REST_API_URL}/soknad`,
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
                    throw new Error('SendSøknad - This should never happen');
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
