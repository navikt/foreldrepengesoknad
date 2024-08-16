import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import { VeiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll, Satser } from '@navikt/fp-types';

import FpEllerEsForside from './forside/FpEllerEsForside';
import OppsummeringFpEllerEsSide from './oppsummering/OppsummeringFpEllerEsSide';
import SituasjonSide, { FpEllerEsSituasjon } from './situasjon/SituasjonSide';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    satser: Satser;
}

const FpEllerEsRouter: FunctionComponent<Props> = ({ locale, changeLocale, satser }) => {
    const [fpEllerEsSituasjon, setFpEllerEsSituasjon] = useState<FpEllerEsSituasjon>();

    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: VeiviserAmplitudeKey.FP_ELLER_ES,
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
            <Route path="*" element={<Navigate to={ContextRoutes.FP_ELLER_ES} />} />
        </Routes>
    );
};

export default FpEllerEsRouter;
