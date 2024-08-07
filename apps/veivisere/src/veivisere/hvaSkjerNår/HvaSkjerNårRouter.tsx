import { HvaSkjerNårRoutes } from 'appData/routes';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LocaleAll } from '@navikt/fp-types';

import HvaSkjerNårForside from './forside/HvaSkjerNårForside';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvaSkjerNårRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <Routes>
            <Route
                path={HvaSkjerNårRoutes.OM}
                element={<HvaSkjerNårForside locale={locale} changeLocale={changeLocale} />}
            />
        </Routes>
    );
};

export default HvaSkjerNårRouter;
