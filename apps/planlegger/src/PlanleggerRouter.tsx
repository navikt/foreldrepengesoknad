import { FunctionComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HvemPlanleggerSteg from 'steps/hvemPlanlegger/HvemPlanleggerSteg';
import OmPlanleggerenSteg from 'steps/omPlanleggeren/OmPlanleggerenSteg';
import OmBarnetSteg from 'steps/omBarnet/OmBarnetSteg';
import BarnehageplassSteg from 'steps/barnehageplass/BarnehageplassSteg';
import ArbeidssituasjonSteg from 'steps/arbeidssituasjon/ArbeidssituasjonSteg';
import PeriodeSteg from 'steps/periode/PeriodeSteg';
import PlanInfoSteg from 'steps/planenDeres/PlanInfoSteg';
import OppsummeringSteg from 'steps/oppsummering/OppsummeringSteg';
import OversiktSteg from 'steps/oversikt/OversiktSteg';
import { PlanleggerRoutes } from 'appData/routes';

const PlanleggerRouter: FunctionComponent = () => {
    return (
        <Routes>
            <Route path={PlanleggerRoutes.OM_PLANLEGGEREN} element={<OmPlanleggerenSteg />} />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg />} />
            <Route path={PlanleggerRoutes.OM_BARNET} element={<OmBarnetSteg />} />
            <Route path={PlanleggerRoutes.BARNEHAGEPLASS} element={<BarnehageplassSteg />} />
            <Route path={PlanleggerRoutes.ARBEIDSSITUASJON} element={<ArbeidssituasjonSteg />} />
            <Route path={PlanleggerRoutes.PERIODE} element={<PeriodeSteg />} />
            <Route path={PlanleggerRoutes.PLAN_INFO} element={<PlanInfoSteg />} />
            <Route path={PlanleggerRoutes.OVERSIKT} element={<OversiktSteg />} />
            <Route path={PlanleggerRoutes.OPPSUMMERING} element={<OppsummeringSteg />} />
            <Route path="*" element={<Navigate to={PlanleggerRoutes.OM_PLANLEGGEREN} />} />
        </Routes>
    );
};

export default PlanleggerRouter;
