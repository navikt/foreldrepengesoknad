import { UseQueryResult, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import Api, { erSakOppdatertOptions, minidialogOptions, søkerInfoOptions } from './api/api';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';
import './styles/app.css';
import { SakOppslag } from './types/SakOppslag';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

const getSakerSuspended = (oppdatertQuery: UseQueryResult<boolean, unknown>) => {
    return oppdatertQuery.isLoading || !oppdatertQuery.data;
};

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
    const sakerSuspended = getSakerSuspended(oppdatertQuery);

    const { storageData } = Api.useGetMellomlagretSøknad();
    const søkerInfoQuery = useQuery(søkerInfoOptions());
    const { sakerData, sakerError } = Api.useGetSaker(sakerSuspended);
    const { minidialogError } = Api.useGetMinidialog();

    useEffect(() => {
        // TODO: Virker litt unaturlig. Kan vi kaste rett fra query kanskje? Hvordan håndtere dette best?
        if (søkerInfoQuery.error) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }

        if (sakerError) {
            throw new Error(
                'Vi opplever problemer med å hente informasjon om din sak. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }
    }, [søkerInfoQuery.error, sakerError]);

    const saker = useMemo(() => {
        if (sakerData) {
            return mapSakerDTOToSaker(sakerData);
        }

        return undefined;
    }, [sakerData]);

    if (
        !søkerInfoQuery.data ||
        (!sakerData && !sakerSuspended) ||
        (!saker && !sakerSuspended) ||
        minidialogQuery.isPending ||
        oppdatertQuery.isPending
    ) {
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
                    saker={saker || defaultSaker}
                    minidialogerData={minidialogQuery.data}
                    minidialogerError={minidialogError}
                    oppdatertData={oppdatertQuery.data === undefined ? true : oppdatertQuery.data}
                    storageData={storageData}
                />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
