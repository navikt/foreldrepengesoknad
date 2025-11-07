import { PlanleggerRoutes } from 'appData/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ArbeidssituasjonSteg } from 'steps/arbeidssituasjon/ArbeidssituasjonSteg';
import { BarnehageplassSteg } from 'steps/barnehageplass/BarnehageplassSteg';
import { FordelingSteg } from 'steps/fordeling/FordelingSteg';
import { HvemPlanleggerSteg } from 'steps/hvem-planlegger/HvemPlanleggerSteg';
import { HvorLangPeriodeSteg } from 'steps/hvor-lang-periode/HvorLangPeriodeSteg';
import { HvorMyeSteg } from 'steps/hvor-mye/HvorMyeSteg';
import { OmBarnetSteg } from 'steps/om-barnet/OmBarnetSteg';
import { OmPlanleggerenSteg } from 'steps/om-planleggeren/OmPlanleggerenSteg';
import { OppsummeringSteg } from 'steps/oppsummering/OppsummeringSteg';
import { PlanenDeresSteg } from 'steps/planen-deres/PlanenDeresSteg';

import { Loader } from '@navikt/ds-react';

import { KontoBeregningDto, Satser } from '@navikt/fp-types';

import { TilpassPlanenSteg } from './steps/tilpass-planen/TilpassPlanenSteg';

interface Props {
    stønadskontoer?: { '100': KontoBeregningDto; '80': KontoBeregningDto };
    satser: Satser;
}

export const PlanleggerRouter = ({ stønadskontoer, satser }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<OmPlanleggerenSteg />} />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg />} />
            <Route path={PlanleggerRoutes.OM_BARNET} element={<OmBarnetSteg />} />
            <Route path={PlanleggerRoutes.BARNEHAGEPLASS} element={<BarnehageplassSteg />} />
            <Route path={PlanleggerRoutes.ARBEIDSSITUASJON} element={<ArbeidssituasjonSteg satser={satser} />} />
            <Route path={PlanleggerRoutes.HVOR_MYE} element={<HvorMyeSteg satser={satser} />} />
            <Route
                path={PlanleggerRoutes.HVOR_LANG_PERIODE}
                element={stønadskontoer ? <HvorLangPeriodeSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.FORDELING}
                element={stønadskontoer ? <FordelingSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.PLANEN_DERES}
                element={stønadskontoer ? <PlanenDeresSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.TILPASS_PLANEN}
                element={stønadskontoer ? <TilpassPlanenSteg stønadskontoer={stønadskontoer} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.OPPSUMMERING}
                element={<OppsummeringSteg stønadskontoer={stønadskontoer} satser={satser} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
