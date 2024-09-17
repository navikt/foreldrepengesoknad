import { useQuery } from '@tanstack/react-query';
import Environment from 'appData/Environment';
import { HvorMyeRoutes } from 'appData/routes';
import { veiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import dayjs from 'dayjs';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { SimpleErrorPage } from '@navikt/fp-ui';

import ArbeidssituasjonSide, { Arbeidssituasjon } from './pages/arbeidssituasjon/ArbeidssituasjonSide';
import HvorMyeForside from './pages/forside/HvorMyeForside';
import OppsummeringSide from './pages/oppsummering/OppsummeringSide';

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

const getStønadskontoer = async () => {
    const response = await fetch(`${Environment.PUBLIC_PATH}/rest/konto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(30 * 1000),
        body: JSON.stringify(STØNADSKONTO_PARAMS),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TilgjengeligeStønadskontoer;
};

export const HvorMyeRouter: FunctionComponent<Props> = ({ locale, changeLocale, satser }) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();

    const stønadskontoerData = useQuery({
        queryKey: ['KONTOER'],
        queryFn: getStønadskontoer,
    });

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: veiviserAmplitudeKey,
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
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
