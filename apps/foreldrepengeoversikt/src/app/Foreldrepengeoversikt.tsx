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
import { mapSakerDTOToSaker } from './utils/sakerUtils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import Environment from './Environment';
import { MinidialogInnslag } from './types/MinidialogInnslag';
import { SakOppslag } from './types/SakOppslag';

import './styles/app.css';

const getSakerSuspended = (oppdatertQuery: UseQueryResult<boolean, unknown>) => {
    if (oppdatertQuery.isLoading) {
        return true;
    }

    return oppdatertQuery.data ? false : true;
};

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');
    const backgroundColor = useGetBackgroundColor();

    const oppdatertQuery = useQuery<boolean>({
        queryKey: ['oppdatert'],
        queryFn: async () =>
            await fetch(`${Environment.REST_API_URL}/innsyn/v2/saker/oppdatert`, { credentials: 'include' }).then(
                (response) => response.json(),
            ),
        refetchInterval: (data) => {
            if (data) {
                return false;
            }

            return 15000;
        },
    });

    const minidialogQuery = useQuery<MinidialogInnslag[]>({
        queryKey: ['minidialog'],
        queryFn: async () =>
            await fetch(`${Environment.REST_API_URL}/minidialog`, { credentials: 'include' }).then((response) =>
                response.json(),
            ),
    });

    const sakerSuspended = getSakerSuspended(oppdatertQuery);

    const { storageData } = Api.useGetMellomlagretSøknad();
    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { sakerData, sakerError } = Api.useGetSaker(sakerSuspended);
    const { minidialogError } = Api.useGetMinidialog();

    useEffect(() => {
        if (søkerinfoError) {
            throw new Error(
                'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }

        if (sakerError) {
            throw new Error(
                'Vi opplever problemer med å hente informasjon om din sak. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
            );
        }
    }, [søkerinfoError, sakerError]);

    const saker = useMemo(() => {
        if (sakerData) {
            return mapSakerDTOToSaker(sakerData);
        }

        return undefined;
    }, [sakerData]);

    console.log(minidialogQuery.error);

    if (
        !søkerinfoData ||
        (!sakerData && !sakerSuspended) ||
        (!saker && !sakerSuspended) ||
        minidialogQuery.isLoading ||
        oppdatertQuery.isLoading
    ) {
        return (
            <div style={{ textAlign: 'center', padding: '12rem 0' }}>
                <Loader type="XXL" />
            </div>
        );
    }

    const aktiveMinidialoger = minidialogQuery.data
        ? minidialogQuery.data.filter(({ gyldigTil }) => dayjs(gyldigTil).isSameOrAfter(new Date(), 'days'))
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
                    storageData={storageData}
                />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
