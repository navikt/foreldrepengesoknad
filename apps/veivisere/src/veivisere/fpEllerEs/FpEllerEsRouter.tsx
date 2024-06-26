import { FpEllerEsRoutes } from 'appData/routes';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LocaleAll, Satser } from '@navikt/fp-types';

import FpEllerEsForside from './forside/FpEllerEsForside';
import SituasjonSide from './situasjon/SituasjonSide';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    satser: Satser;
}

const FpEllerEsRouter: FunctionComponent<Props> = ({ locale, changeLocale, satser }) => {
    return (
        <Routes>
            <Route
                path={FpEllerEsRoutes.OM}
                element={<FpEllerEsForside locale={locale} changeLocale={changeLocale} />}
            />
            <Route path={FpEllerEsRoutes.SITUASJON} element={<SituasjonSide satser={satser} />} />
        </Routes>
    );
};

export default FpEllerEsRouter;
