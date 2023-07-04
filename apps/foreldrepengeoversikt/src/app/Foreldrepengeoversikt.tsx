import { Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';
import { HendelseType } from './types/HendelseType';
import { mapSakerDTOToSaker } from './utils/sakerUtils';
import { UseQueryResult } from '@tanstack/react-query';
//import Environment from './Environment';


import './styles/app.css';
import { SakOppslag } from './types/SakOppslag';

const getSakerSuspended = (oppdatertQuery: UseQueryResult<boolean, unknown>) => {
    if (oppdatertQuery.isLoading) {
        return true;
    }

    return oppdatertQuery.data ? false : true;
};

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');
    const backgroundColor = useGetBackgroundColor();

    // const oppdatertQuery = useQuery<boolean>({
    //     queryKey: ['oppdatert'],
    //     queryFn: async () =>
    //         await fetch(`${Environment.REST_API_URL}/innsyn/v2/saker/oppdatert`, { credentials: 'include' }).then(
    //             (response) => response.json()
    //         ),
    //     refetchInterval: (data) => {
    //         if (data) {
    //             return false;
    //         }

    //         return 15000;
    //     },
    // });

    //const oppdatertQuery = { data: true };
    const oppdatertQuery = { data: true } as UseQueryResult<boolean, unknown>;

    const sakerSuspended = getSakerSuspended(oppdatertQuery);

    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { sakerData, sakerError } = Api.useGetSaker(sakerSuspended);
    const { minidialogData, minidialogError } = Api.useGetMinidialog();

    useEffect(() => {
        if (søkerinfoError) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.'
            );
        }

        if (sakerError) {
            throw new Error(
                'Vi opplever problemer med å hente informasjon om din sak. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.'
            );
        }
    }, [søkerinfoError, sakerError]);

    const saker = useMemo(() => {
        if (sakerData) {
            return mapSakerDTOToSaker(sakerData);
        }

        return undefined;
    }, [sakerData]);

    if (
        !søkerinfoData ||
        (!sakerData && !sakerSuspended) ||
        (!saker && !sakerSuspended) ||
        (!minidialogData && !minidialogError) ||
        oppdatertQuery.isLoading
    ) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }
    const aktiveMinidialoger = minidialogData
        ? minidialogData.filter(
              ({ gyldigTil, aktiv, hendelse }) =>
                  aktiv &&
                  dayjs(gyldigTil).isSameOrAfter(new Date(), 'days') &&
                  hendelse !== HendelseType.TILBAKEKREVING_FATTET_VEDTAK
          )
        : undefined;
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
                    søkerinfo={søkerinfoData}
                    saker={saker || defaultSaker}
                    minidialogerData={aktiveMinidialoger}
                    minidialogerError={minidialogError}
                    oppdatertData={oppdatertQuery.data === undefined ? true : oppdatertQuery.data}
                />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
