import { FpEllerEsRoutes } from 'appData/routes';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import FpEllerEsForside from './forside/FpEllerEsForside';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

const FpEllerEsRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <Routes>
            <Route
                path={FpEllerEsRoutes.OM}
                element={<FpEllerEsForside locale={locale} changeLocale={changeLocale} />}
            />
        </Routes>
    );
};

export default FpEllerEsRouter;
