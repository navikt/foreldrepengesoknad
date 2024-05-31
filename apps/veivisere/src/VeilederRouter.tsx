import { FpEllerEsRoutes, HvaSkjerNårRoutes, HvorMyeRoutes } from 'appData/routes';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import FpEllerEsRouter from './veiledere/fpEllerEs/FpEllerEsRouter';
import HvaSkjerNårRouter from './veiledere/hvaSkjerNår/HvaSkjerNårRouter';
import HvorMyeRouter from './veiledere/hvorMye/HvorMyeRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

const VeilederRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <Routes>
            <Route
                path={HvorMyeRoutes.HVOR_MYE + '/*'}
                element={<HvorMyeRouter locale={locale} changeLocale={changeLocale} />}
            />
            <Route
                path={HvaSkjerNårRoutes.HVA_SKJER + '/*'}
                element={<HvaSkjerNårRouter locale={locale} changeLocale={changeLocale} />}
            />
            <Route
                path={FpEllerEsRoutes.FP_ELLER_ES + '/*'}
                element={<FpEllerEsRouter locale={locale} changeLocale={changeLocale} />}
            />
            <Route path="*" element={<div>Veiledere</div>} />
        </Routes>
    );
};

export default VeilederRouter;
