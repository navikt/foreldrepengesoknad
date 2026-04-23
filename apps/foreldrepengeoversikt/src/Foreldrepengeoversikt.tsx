import { useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useIntl } from 'react-intl';

import { Loader } from '@navikt/ds-react';

import { captureMessage, withScope } from '@navikt/fp-observability';

import { hentSakerOptions, minidialogOptions, søkerInfoOptions } from './api/queries.ts';
import { ScrollToTop } from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import { ForeldrepengeoversiktRoutes } from './routes/ForeldrepengeoversiktRoutes';
import { SakOppslag } from './types/SakOppslag';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

const captureQueryError = (queryName: string, error: Error) => {
    if (error instanceof HTTPError) {
        withScope((scope) => {
            scope.setTag('queryName', queryName);
            scope.setTag('httpStatus', error.response?.status);
            if (error.response?.status === 401 || error.response?.status === 403) {
                return;
            }
            const apiError = error.data as Record<string, unknown> | undefined;
            if (typeof apiError?.callId === 'string') {
                scope.setTag('callId', apiError.callId);
            }
            if (typeof apiError?.feilkode === 'string') {
                scope.setTag('feilkode', apiError.feilkode);
            }
            if (apiError) {
                scope.setContext('apiError', apiError);
            }
            captureMessage(`API-feil i ${queryName}`);
        });
    }
};

export const Foreldrepengeoversikt = () => {
    const intl = useIntl();
    const backgroundColor = useGetBackgroundColor();

    // Denne trenger vi ikke før senere. Men vi putter den i cache så tidlig som mulig.
    useQuery(minidialogOptions());

    const søkerInfoQuery = useQuery(søkerInfoOptions());

    const sakerQuery = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    });

    if (søkerInfoQuery.isError || sakerQuery.isError) {
        if (søkerInfoQuery.error) {
            captureQueryError('søkerInfo', søkerInfoQuery.error);
        }
        if (sakerQuery.error) {
            captureQueryError('saker', sakerQuery.error);
        }
        const error = new Error(intl.formatMessage({ id: 'error.hentingInformasjon' }));
        error.cause = 'capturedBySentry';
        throw error;
    }

    if (!søkerInfoQuery.data || sakerQuery.isPending) {
        return (
            <div className="px-0 py-48 text-center">
                <Loader type="XXL" />
            </div>
        );
    }

    const defaultSaker: SakOppslag = {
        engangsstønad: [],
        foreldrepenger: [],
        svangerskapspenger: [],
    };

    return (
        <div className={backgroundColor === 'white' ? 'bg-ax-bg-default' : 'bg-ax-brand-blue-100'}>
            <ScrollToTop />
            <ForeldrepengeoversiktRoutes søkerinfo={søkerInfoQuery.data} saker={sakerQuery.data ?? defaultSaker} />
        </div>
    );
};
