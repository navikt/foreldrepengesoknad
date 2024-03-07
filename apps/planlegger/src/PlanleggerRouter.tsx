import { PlanleggerRoutes } from 'appData/routes';
import { FunctionComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ArbeidssituasjonSteg from 'steps/arbeidssituasjon/ArbeidssituasjonSteg';
import BarnehageplassSteg from 'steps/barnehageplass/BarnehageplassSteg';
import FordelingSteg from 'steps/fordeling/FordelingSteg';
import HvemPlanleggerSteg from 'steps/hvemPlanlegger/HvemPlanleggerSteg';
import HvorLangPeriodeSteg from 'steps/hvorLangPeriode/HvorLangPeriodeSteg';
import OmBarnetSteg from 'steps/omBarnet/OmBarnetSteg';
import OmPlanleggerenSteg from 'steps/omPlanleggeren/OmPlanleggerenSteg';
import OppsummeringSteg from 'steps/oppsummering/OppsummeringSteg';
import OversiktSteg from 'steps/oversikt/OversiktSteg';
import PlanInfoSteg from 'steps/planenDeres/PlanInfoSteg';

import { LocaleAll } from '@navikt/fp-types';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const PlanleggerRouter: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    return (
        <Routes>
            <Route
                path={PlanleggerRoutes.OM_PLANLEGGEREN}
                element={<OmPlanleggerenSteg locale={locale} changeLocale={changeLocale} />}
            />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg />} />
            <Route path={PlanleggerRoutes.OM_BARNET} element={<OmBarnetSteg />} />
            <Route path={PlanleggerRoutes.BARNEHAGEPLASS} element={<BarnehageplassSteg />} />
            <Route path={PlanleggerRoutes.ARBEIDSSITUASJON} element={<ArbeidssituasjonSteg />} />
            <Route path={PlanleggerRoutes.HVOR_LANG_PERIODE} element={<HvorLangPeriodeSteg />} />
            <Route path={PlanleggerRoutes.FORDELING} element={<FordelingSteg />} />
            <Route path={PlanleggerRoutes.PLAN_INFO} element={<PlanInfoSteg />} />
            <Route path={PlanleggerRoutes.OVERSIKT} element={<OversiktSteg />} />
            <Route path={PlanleggerRoutes.OPPSUMMERING} element={<OppsummeringSteg />} />
            <Route path="*" element={<Navigate to={PlanleggerRoutes.OM_PLANLEGGEREN} />} />
        </Routes>
    );
};

export default PlanleggerRouter;
