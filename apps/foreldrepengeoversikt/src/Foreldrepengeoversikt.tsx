import { useQuery } from '@tanstack/react-query';
import { FormattedMessage } from 'react-intl';

import { Alert, Loader } from '@navikt/ds-react';

import { hentSakerOptions, minidialogOptions, søkerInfoOptions } from './api/queries.ts';
import { ScrollToTop } from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import { ForeldrepengeoversiktRoutes } from './routes/ForeldrepengeoversiktRoutes';
import { SakOppslag } from './types/SakOppslag';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

export const Foreldrepengeoversikt = () => {
    const backgroundColor = useGetBackgroundColor();

    // Denne trenger vi ikke før senere. Men vi putter den i cache så tidlig som mulig.
    useQuery(minidialogOptions());

    const søkerInfoQuery = useQuery(søkerInfoOptions());

    const sakerQuery = useQuery({
        ...hentSakerOptions(),
        select: mapSakerDTOToSaker,
    });

    if (søkerInfoQuery.isError || sakerQuery.isError) {
        return (
            <Alert variant="info" className="m-8 mr-auto ml-auto w-[704px]">
                <FormattedMessage id="error.hentingInformasjon" />
            </Alert>
        );
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
