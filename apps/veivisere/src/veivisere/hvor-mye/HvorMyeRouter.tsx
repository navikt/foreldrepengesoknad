import { useQuery } from '@tanstack/react-query';
import Environment from 'appData/Environment';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import { VeiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import dayjs from 'dayjs';
import ky from 'ky';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import ArbeidssituasjonSide, { Arbeidssituasjon } from './arbeidssituasjon/ArbeidssituasjonSide';
import HvorMyeForside from './forside/HvorMyeForside';
import OppsummeringSide from './oppsummering/OppsummeringSide';

const STØNADSKONTO_PARAMS = {
    rettighetstype: 'BEGGE_RETT',
    brukerrolle: 'MOR',
    antallBarn: 1,
    fødselsdato: dayjs().format(ISO_DATE_FORMAT),
    morHarUføretrygd: false,
};

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    satser: Satser;
}

const HvorMyeRouter: FunctionComponent<Props> = ({ locale, changeLocale, satser }) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER'],
        queryFn: () =>
            ky
                .post(`${Environment.PUBLIC_PATH}/rest/konto`, {
                    json: STØNADSKONTO_PARAMS,
                    credentials: 'omit',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .json<TilgjengeligeStønadskontoer>(),
    });

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: VeiviserAmplitudeKey.HVOR_MYE,
            team: 'foreldrepenger',
            pageKey: 'page-unload',
        });
    });

    if (stønadskontoerData.error) {
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
            {arbeidssituasjon && stønadskontoerData.data && (
                <Route
                    path={HvorMyeRoutes.OPPSUMMERING}
                    element={
                        <OppsummeringSide
                            arbeidssituasjon={arbeidssituasjon}
                            stønadskontoer={stønadskontoerData.data}
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
