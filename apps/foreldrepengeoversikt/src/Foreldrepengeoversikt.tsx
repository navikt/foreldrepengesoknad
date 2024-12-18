import { useQuery } from '@tanstack/react-query';

import { Loader } from '@navikt/ds-react';

import { erSakOppdatertOptions, hentSakerOptions, minidialogOptions, søkerInfoOptions } from './api/api';
import { ScrollToTop } from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import { ForeldrepengeoversiktRoutes } from './routes/ForeldrepengeoversiktRoutes';
import { SakOppslag } from './types/SakOppslag';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

export const Foreldrepengeoversikt = () => {
    const backgroundColor = useGetBackgroundColor();

    // Denne trenger vi ikke før senere. Men vi putter den i cache så tidlig som mulig.
    useQuery(minidialogOptions());

    const oppdatertQuery = useQuery({
        ...erSakOppdatertOptions(),
        refetchInterval: (query) => {
            if (query.state.data) {
                return false;
            }

            return 15000;
        },
    });

    const søkerInfoQuery = useQuery(søkerInfoOptions());

    const sakerQuery = useQuery({
        ...hentSakerOptions(),
        enabled: oppdatertQuery.data,
        select: mapSakerDTOToSaker,
    });

    if (søkerInfoQuery.isError || sakerQuery.isError) {
        throw new Error(
            'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
        );
    }

    if (!søkerInfoQuery.data || sakerQuery.isPending) {
        return (
            <div className="py-48 px-0 text-center">
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
        <div className={backgroundColor === 'white' ? 'bg-white' : 'bg-deepblue-50'}>
            <ScrollToTop />
            <ForeldrepengeoversiktRoutes søkerinfo={søkerInfoQuery.data} saker={sakerQuery.data ?? defaultSaker} />
        </div>
    );
};
