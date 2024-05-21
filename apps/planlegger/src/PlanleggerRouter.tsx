import { PlanleggerRoutes } from 'appData/routes';
import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ArbeidssituasjonSteg from 'steps/arbeidssituasjon/ArbeidssituasjonSteg';
import FordelingSteg from 'steps/fordeling/FordelingSteg';
import HvemPlanleggerSteg from 'steps/hvemPlanlegger/HvemPlanleggerSteg';
import HvorLangPeriodeSteg from 'steps/hvorLangPeriode/HvorLangPeriodeSteg';
import OmBarnetSteg from 'steps/omBarnet/OmBarnetSteg';
import OmPlanleggerenSteg from 'steps/omPlanleggeren/OmPlanleggerenSteg';
import OppsummeringSteg from 'steps/oppsummering/OppsummeringSteg';
import OversiktSteg from 'steps/oversikt/OversiktSteg';
import { TilgjengeligeStønadskontoer } from 'types/TilgjengeligeStønadskontoer';

import { Loader } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
}

const PlanleggerRouter: FunctionComponent<Props> = ({ locale, changeLocale, stønadskontoer }) => {
    const navigate = useNavigate();
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    useEffect(() => {
        setIsFirstLoad(false);
        navigate(PlanleggerRoutes.OM_PLANLEGGEREN);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isFirstLoad) {
        return null;
    }

    return (
        <Routes>
            <Route
                path={PlanleggerRoutes.OM_PLANLEGGEREN}
                element={<OmPlanleggerenSteg locale={locale} changeLocale={changeLocale} />}
            />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg />} />
            <Route path={PlanleggerRoutes.OM_BARNET} element={<OmBarnetSteg />} />
            <Route path={PlanleggerRoutes.ARBEIDSSITUASJON} element={<ArbeidssituasjonSteg />} />
            <Route
                path={PlanleggerRoutes.HVOR_LANG_PERIODE}
                element={stønadskontoer ? <HvorLangPeriodeSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.FORDELING}
                element={stønadskontoer ? <FordelingSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.OVERSIKT}
                element={stønadskontoer ? <OversiktSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.OPPSUMMERING}
                element={<OppsummeringSteg stønadskontoer={stønadskontoer} />}
            />
            <Route path="*" element={<Navigate to={PlanleggerRoutes.OM_PLANLEGGEREN} />} />
        </Routes>
    );
};

export default PlanleggerRouter;
