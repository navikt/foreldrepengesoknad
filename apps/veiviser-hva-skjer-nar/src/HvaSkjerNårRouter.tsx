import { HvaSkjerNårRoutes } from 'appData/routes';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LocaleAll } from '@navikt/fp-types';

import { HvaSkjerNårForside } from './pages/forside/HvaSkjerNårForside';
import { OppsummeringHvaSkjerNårSide } from './pages/oppsummering/OppsummeringHvaSkjerNårSide';
import { HvaSkjerNårSituasjon, SituasjonSide } from './pages/situasjon/SituasjonSide';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

export const HvaSkjerNårRouter = ({ locale, changeLocale }: Props) => {
    const [hvaSkjerNårSituasjon, setHvaSkjerNårSituasjon] = useState<HvaSkjerNårSituasjon>();

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

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
