import { Loader } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/api';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { useGetBackgroundColor } from './hooks/useBackgroundColor';
import ForeldrepengeoversiktRoutes from './routes/ForeldrepengeoversiktRoutes';
import { HendelseType } from './types/HendelseType';
import { mapSakerDTOToSaker } from './utils/sakerUtils';

import './styles/app.css';

const Foreldrepengeoversikt: React.FunctionComponent = () => {
    const bem = bemUtils('app');
    const backgroundColor = useGetBackgroundColor();

    const { søkerinfoData, søkerinfoError } = Api.useSøkerinfo();
    const { sakerData, sakerError } = Api.useGetSaker();
    const { annenPartsVedtakError } = Api.useGetAnnenPartsVedtak(true);
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

        if (annenPartsVedtakError) {
            throw new Error('Vi klarte ikke å hente opp informasjon om den andre forelderen.');
        }
    }, [søkerinfoError, sakerError, annenPartsVedtakError]);

    const saker = useMemo(() => {
        if (sakerData) {
            return mapSakerDTOToSaker(sakerData);
        }

        return undefined;
    }, [sakerData]);

    if (!søkerinfoData || !sakerData || !saker || (!minidialogData && !minidialogError)) {
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

    return (
        <div
            className={classNames(bem.block, backgroundColor === 'white' ? bem.element('white') : bem.element('blue'))}
        >
            <BrowserRouter>
                <ScrollToTop />
                <ForeldrepengeoversiktRoutes
                    søkerinfo={søkerinfoData}
                    saker={saker}
                    minidialogerData={aktiveMinidialoger}
                    minidialogerError={minidialogError}
                />
            </BrowserRouter>
        </div>
    );
};

export default Foreldrepengeoversikt;
