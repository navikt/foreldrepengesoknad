import { HvorMyeRoutes } from 'appData/routes';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { KontoBeregningDto, Satser } from '@navikt/fp-types';

import { Arbeidssituasjon, ArbeidssituasjonSide } from './pages/arbeidssituasjon/ArbeidssituasjonSide';
import { HvorMyeForside } from './pages/forside/HvorMyeForside';
import { OppsummeringSide } from './pages/oppsummering/OppsummeringSide';

interface Props {
    satser: Satser;
    stønadskvoter?: { '100': KontoBeregningDto; '80': KontoBeregningDto };
}

export const HvorMyeRouter = ({ satser, stønadskvoter }: Props) => {
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
            {arbeidssituasjon && stønadskvoter && (
                <Route
                    path={HvorMyeRoutes.OPPSUMMERING}
                    element={
                        <OppsummeringSide
                            arbeidssituasjon={arbeidssituasjon}
                            stønadskvoter={stønadskvoter}
                            satser={satser}
                        />
                    }
                />
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
