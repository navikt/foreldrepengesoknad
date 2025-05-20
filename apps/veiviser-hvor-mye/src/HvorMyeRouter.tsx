import { HvorMyeRoutes } from 'appData/routes';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
