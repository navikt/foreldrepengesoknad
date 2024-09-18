import { useQuery } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import Environment from 'app/appData/Environment';

import { erSakOppdatertOptions, hentSakerOptions, minidialogOptions, søkerInfoOptions } from './api/api';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';
import { SakOppslag } from './types/SakOppslag';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
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
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
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
            <BrowserRouter basename={Environment.PUBLIC_PATH}>
                <ScrollToTop />
                <ForeldrepengeoversiktRoutes søkerinfo={søkerInfoQuery.data} saker={sakerQuery.data ?? defaultSaker} />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
