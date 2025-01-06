import { HvorMyeRoutes } from 'appData/routes';
import { veiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import { Arbeidssituasjon, ArbeidssituasjonSide } from './pages/arbeidssituasjon/ArbeidssituasjonSide';
import { HvorMyeForside } from './pages/forside/HvorMyeForside';
import { OppsummeringSide } from './pages/oppsummering/OppsummeringSide';

interface Props {
    satser: Satser;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

export const HvorMyeRouter = ({ satser, stønadskontoer }: Props) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: veiviserAmplitudeKey,
            team: 'foreldrepenger',
            pageKey: 'page-unload',
        });
    });

    return (
        <Routes>
            <Route path="/" element={<HvorMyeForside />} />
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
            {arbeidssituasjon && stønadskontoer && (
                <Route
                    path={HvorMyeRoutes.OPPSUMMERING}
                    element={
                        <OppsummeringSide
                            arbeidssituasjon={arbeidssituasjon}
                            stønadskontoer={stønadskontoer}
                            satser={satser}
                        />
                    }
                />
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
