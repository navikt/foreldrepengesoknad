import { FpEllerEsRoutes } from 'appData/routes';
import { veiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll, Satser } from '@navikt/fp-types';

import { FpEllerEsForside } from './pages/forside/FpEllerEsForside';
import { OppsummeringFpEllerEsSide } from './pages/oppsummering/OppsummeringFpEllerEsSide';
import { FpEllerEsSituasjon, SituasjonSide } from './pages/situasjon/SituasjonSide';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    satser: Satser;
}

export const FpEllerEsRouter = ({ locale, changeLocale, satser }: Props) => {
    const [fpEllerEsSituasjon, setFpEllerEsSituasjon] = useState<FpEllerEsSituasjon>();

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: veiviserAmplitudeKey,
            team: 'foreldrepenger',
            pageKey: 'page-unload',
        });
    });

    return (
        <Routes>
            <Route path="/" element={<FpEllerEsForside locale={locale} changeLocale={changeLocale} />} />
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
