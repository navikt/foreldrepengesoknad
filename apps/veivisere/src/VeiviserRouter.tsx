import { ContextRoutes } from 'appData/routes';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import FpEllerEsRouter from './veivisere/fpEllerEs/FpEllerEsRouter';
import HvaSkjerNårRouter from './veivisere/hvaSkjerNår/HvaSkjerNårRouter';
import HvorMyeRouter from './veivisere/hvorMye/HvorMyeRouter';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

const VeiviserRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <Routes>
            <Route
                path={ContextRoutes.HVOR_MYE + '/*'}
                element={<HvorMyeRouter locale={locale} changeLocale={changeLocale} />}
            />
            <Route
                path={ContextRoutes.HVA_SKJER + '/*'}
                element={<HvaSkjerNårRouter locale={locale} changeLocale={changeLocale} />}
            />
            <Route
                path={ContextRoutes.FP_ELLER_ES + '/*'}
                element={<FpEllerEsRouter locale={locale} changeLocale={changeLocale} />}
            />
            <Route path="*" element={<div>Veivisere</div>} />
        </Routes>
    );
};

export default VeiviserRouter;
