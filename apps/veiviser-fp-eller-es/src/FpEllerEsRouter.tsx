import { FpEllerEsRoutes } from 'appData/routes';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Satser } from '@navikt/fp-types';

import { FpEllerEsForside } from './pages/forside/FpEllerEsForside';
import { OppsummeringFpEllerEsSide } from './pages/oppsummering/OppsummeringFpEllerEsSide';
import { FpEllerEsSituasjon, SituasjonSide } from './pages/situasjon/SituasjonSide';

interface Props {
    satser: Satser;
}

export const FpEllerEsRouter = ({ satser }: Props) => {
    const [fpEllerEsSituasjon, setFpEllerEsSituasjon] = useState<FpEllerEsSituasjon>();
    return (
        <Routes>
            <Route path="/" element={<FpEllerEsForside />} />
            <Route
                path={FpEllerEsRoutes.SITUASJON}
                element={
                    <SituasjonSide
                        satser={satser}
                        fpEllerEsSituasjon={fpEllerEsSituasjon}
                        setFpEllerEsSituasjon={setFpEllerEsSituasjon}
                    />
                }
            />
            {fpEllerEsSituasjon && (
                <Route
                    path={FpEllerEsRoutes.OPPSUMMERING}
                    element={<OppsummeringFpEllerEsSide fpEllerEsSituasjon={fpEllerEsSituasjon} satser={satser} />}
                />
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
