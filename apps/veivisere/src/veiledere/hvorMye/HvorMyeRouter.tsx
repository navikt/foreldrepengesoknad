import { HvorMyeRoutes } from 'appData/routes';
import { FunctionComponent, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import ArbeidssituasjonSide, { Arbeidssituasjon } from './arbeidssituasjon/ArbeidssituasjonSide';
import HvorMyeForside from './forside/HvorMyeForside';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

const HvorMyeRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const [arbeidssituasjon, setArbeidssituasjon] = useState<Arbeidssituasjon>();
    return (
        <Routes>
            <Route
                path={HvorMyeRoutes.OM_HVOR_MYE}
                element={<HvorMyeForside locale={locale} changeLocale={changeLocale} />}
            />
            <Route
                path={HvorMyeRoutes.ARBEIDSSITUASJON}
                element={
                    <ArbeidssituasjonSide
                        arbeidssituasjon={arbeidssituasjon}
                        setArbeidssituasjon={setArbeidssituasjon}
                    />
                }
            />
        </Routes>
    );
};

export default HvorMyeRouter;
