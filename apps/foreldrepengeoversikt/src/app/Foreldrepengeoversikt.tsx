import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import { erSakOppdatertOptions, hentSakerOptions, minidialogOptions, søkerInfoOptions } from './api/api';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';
import './styles/app.css';
import { SakOppslag } from './types/SakOppslag';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');
    const backgroundColor = useGetBackgroundColor();

    const oppdatertQuery = useQuery({
        ...erSakOppdatertOptions(),
        refetchInterval: (query) => {
            if (query.state.data) {
                return false;
            }

            return 15000;
        },
    });

    const minidialogQuery = useQuery(minidialogOptions());
    const søkerInfoQuery = useQuery(søkerInfoOptions());

    const sakerQuery = useQuery({
        ...hentSakerOptions(),
        enabled: oppdatertQuery.data,
        select: mapSakerDTOToSaker,
    });

    // TODO: Føles litt unaturlig å kaste error istedenfor å rendre her. Er det fordi vi vil treffe ErrorBoundary for å logge til entry?
    if (søkerInfoQuery.isError || sakerQuery.isError) {
        throw new Error(
            'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
        );
    }

    // TODO: ønsker vi egentlig å vente på alle queries før vi går videre?
    if (!søkerInfoQuery.data || sakerQuery.isPending || minidialogQuery.isPending || oppdatertQuery.isPending) {
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
        <div
            className={classNames(bem.block, backgroundColor === 'white' ? bem.element('white') : bem.element('blue'))}
        >
            <BrowserRouter>
                <ScrollToTop />
                <ForeldrepengeoversiktRoutes søkerinfo={søkerInfoQuery.data} saker={sakerQuery.data || defaultSaker} />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
