import Environment from 'appData/Environment';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import { VeiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { getAxiosInstance, usePostRequest } from '@navikt/fp-api';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import ArbeidssituasjonSide, { Arbeidssituasjon } from './arbeidssituasjon/ArbeidssituasjonSide';
import HvorMyeForside from './forside/HvorMyeForside';
import OppsummeringSide from './oppsummering/OppsummeringSide';

export const veivisereApi = getAxiosInstance();

const STØNADSKONTO_PARAMS = {
    rettighetstype: 'BEGGE_RETT',
    brukerrolle: 'MOR',
    antallBarn: 1,
    fødselsdato: dayjs().format(ISO_DATE_FORMAT),
    morHarUføretrygd: false,
};

const STØNADSKONTO_OPTIONS = {
    isSuspended: false,
    withCredentials: false,
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    satser: Satser;
}

const HvorMyeRouter: FunctionComponent<Props> = ({ locale, changeLocale, satser }) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();

    const requestData = usePostRequest<TilgjengeligeStønadskontoer>(
        veivisereApi,
        `${Environment.PUBLIC_PATH}/rest/konto`,
        STØNADSKONTO_PARAMS,
        STØNADSKONTO_OPTIONS,
    );

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: VeiviserAmplitudeKey.HVOR_MYE,
            team: 'foreldrepenger',
            pageKey: 'page-unload',
        });
    });

    if (requestData.error) {
        return <SimpleErrorPage />;
    }

    return (
        <Routes>
            <Route path="/" element={<HvorMyeForside locale={locale} changeLocale={changeLocale} />} />
            <Route
                path={HvorMyeRoutes.ARBEIDSSITUASJON}
                element={
                    <ArbeidssituasjonSide
                        arbeidssituasjon={arbeidssituasjon}
                        setArbeidssituasjon={setArbeidssituasjon}
                        satser={satser}
                    />
                }
            />
            {arbeidssituasjon && requestData.data && (
                <Route
                    path={HvorMyeRoutes.OPPSUMMERING}
                    element={
                        <OppsummeringSide
                            arbeidssituasjon={arbeidssituasjon}
                            stønadskontoer={requestData.data}
                            satser={satser}
                        />
                    }
                />
            )}
            <Route path="*" element={<Navigate to={ContextRoutes.HVOR_MYE} />} />
        </Routes>
    );
};

export default HvorMyeRouter;
