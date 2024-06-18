import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import ArbeidssituasjonSide, { Arbeidssituasjon } from './arbeidssituasjon/ArbeidssituasjonSide';
import HvorMyeForside from './forside/HvorMyeForside';
import OppsummeringSide from './oppsummering/OppsummeringSide';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

const HvorMyeRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();
    return (
        <Routes>
            <Route path={HvorMyeRoutes.OM} element={<HvorMyeForside locale={locale} changeLocale={changeLocale} />} />
            <Route
                path={HvorMyeRoutes.ARBEIDSSITUASJON}
                element={
                    <ArbeidssituasjonSide
                        arbeidssituasjon={arbeidssituasjon}
                        setArbeidssituasjon={setArbeidssituasjon}
                    />
                }
            />
            {arbeidssituasjon && (
                <Route
                    path={HvorMyeRoutes.OPPSUMMERING}
                    element={<OppsummeringSide arbeidssituasjon={arbeidssituasjon} />}
                />
            )}
            <Route path="*" element={<Navigate to={ContextRoutes.HVOR_MYE + HvorMyeRoutes.OM} />} />
        </Routes>
    );
};

export default HvorMyeRouter;
