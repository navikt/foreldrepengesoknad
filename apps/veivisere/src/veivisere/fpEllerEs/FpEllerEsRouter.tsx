import { FpEllerEsRoutes } from 'appData/routes';
import { FunctionComponent, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

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
    return (
        <Routes>
            <Route
                path={FpEllerEsRoutes.OM}
                element={<FpEllerEsForside locale={locale} changeLocale={changeLocale} />}
            />
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
        </Routes>
    );
};

export default FpEllerEsRouter;
