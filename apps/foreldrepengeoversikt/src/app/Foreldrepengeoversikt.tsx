import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect } from 'react';
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

    // TODO: har jeg tolket denne riktig? Slik jeg forstår det er formålet å ikke kjøre /saker endepunktet før spørringen om saker er oppdatert gir true.
    // Om det er tilfellet passer dette perfekt for "enabled".
    const sakerQuery = useQuery({
        ...hentSakerOptions(),
        enabled: oppdatertQuery.data,
        select: mapSakerDTOToSaker,
    });

    useEffect(() => {
        // TODO: Virker litt unaturlig. Kan vi kaste rett fra query kanskje? Hvordan håndtere dette best?
        if (søkerInfoQuery.error) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }

        if (sakerQuery.error) {
            throw new Error(
                'Vi opplever problemer med å hente informasjon om din sak. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }
    }, [søkerInfoQuery.error, sakerQuery.error]);

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
                <ForeldrepengeoversiktRoutes
                    søkerinfo={søkerInfoQuery.data}
                    saker={sakerQuery.data || defaultSaker}
                    // TODO: trengs denne å sendes?
                    oppdatertData={oppdatertQuery.data === undefined ? true : oppdatertQuery.data}
                />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
