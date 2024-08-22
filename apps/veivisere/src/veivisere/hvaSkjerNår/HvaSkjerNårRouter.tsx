import { HvaSkjerNårRoutes } from 'appData/routes';
import { VeiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { FunctionComponent } from 'react';
import { Route, Routes, useBeforeUnload } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';

import HvaSkjerNårForside from './forside/HvaSkjerNårForside';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvaSkjerNårRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    useBeforeUnload(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: VeiviserAmplitudeKey.HVA_SKJER_NÅR,
            team: 'foreldrepenger',
            pageKey: 'page-unload',
        });
    });

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
