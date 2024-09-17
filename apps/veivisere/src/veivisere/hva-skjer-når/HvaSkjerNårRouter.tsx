import { ContextRoutes, HvaSkjerNårRoutes } from 'appData/routes';
import { VeiviserAmplitudeKey } from 'appData/veiviserAmplitudeKey';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes, useBeforeUnload } from 'react-router-dom';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll } from '@navikt/fp-types';

import HvaSkjerNårForside from './forside/HvaSkjerNårForside';
import OppsummeringHvaSkjerNårSide from './oppsummering/OppsummeringHvaSkjerNårSide';
import SituasjonSide, { HvaSkjerNårSituasjon } from './situasjon/SituasjonSide';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const HvaSkjerNårRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const [hvaSkjerNårSituasjon, setHvaSkjerNårSituasjon] = useState<HvaSkjerNårSituasjon>();

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
            <Route
                path={HvaSkjerNårRoutes.SITUASJON}
                element={
                    <SituasjonSide
                        hvaSkjerNårSituasjon={hvaSkjerNårSituasjon}
                        setHvaSkjerNårSituasjon={setHvaSkjerNårSituasjon}
                    />
                }
            />
            {hvaSkjerNårSituasjon && (
                <Route
                    path={HvaSkjerNårRoutes.OPPSUMMERING}
                    element={<OppsummeringHvaSkjerNårSide hvaSkjerNårSituasjon={hvaSkjerNårSituasjon} />}
                />
            )}

            <Route path="*" element={<Navigate to={ContextRoutes.HVA_SKJER} />} />
        </Routes>
    );
};

export default HvaSkjerNårRouter;
