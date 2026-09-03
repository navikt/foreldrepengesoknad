import { PlanleggerRoutes } from 'appData/routes';
import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ArbeidssituasjonSteg } from 'steps/arbeidssituasjon/ArbeidssituasjonSteg';
import { BarnehageplassSteg } from 'steps/barnehageplass/BarnehageplassSteg';
import { FordelingSteg } from 'steps/fordeling/FordelingSteg';
import { HvemPlanleggerSteg } from 'steps/hvem-planlegger/HvemPlanleggerSteg';
import { HvorLangPeriodeSteg } from 'steps/hvor-lang-periode/HvorLangPeriodeSteg';
import { HvorMyeSteg } from 'steps/hvor-mye/HvorMyeSteg';
import { OmBarnetPlanleggerSteg } from 'steps/om-barnet/OmBarnetSteg';
import { OmPlanleggerenSteg } from 'steps/om-planleggeren/OmPlanleggerenSteg';

import { Loader } from '@navikt/ds-react';

import { KontoBeregningDto, Satser } from '@navikt/fp-types';
import { Spinner } from '@navikt/fp-ui';

// PlanenDeres- og Oppsummering-stegene bruker de tunge UI-komponentene i @navikt/fp-uttaksplan
// (kalender, liste, kvoteoppsummering, modaler). De lastes derfor lazy, med prefetch fra
// stegene rett før i planleggerflyten (sjå FordelingSteg og PlanenDeresSteg), slik at bytene
// normalt er hentet før brukaren faktisk navigerer dit.
const PlanenDeresSteg = lazy(() =>
    // eslint-disable-next-line unicorn/prefer-await
    import('steps/planen-deres/PlanenDeresSteg').then((module) => ({ default: module.PlanenDeresSteg })),
);
const OppsummeringSteg = lazy(() =>
    // eslint-disable-next-line unicorn/prefer-await
    import('steps/oppsummering/OppsummeringSteg').then((module) => ({ default: module.OppsummeringSteg })),
);

interface Props {
    stønadskvoter?: { '100': KontoBeregningDto; '80': KontoBeregningDto };
    satser: Satser;
}

export const PlanleggerRouter = ({ stønadskvoter, satser }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<OmPlanleggerenSteg />} />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg />} />
            <Route path={PlanleggerRoutes.OM_BARNET} element={<OmBarnetPlanleggerSteg />} />
            <Route path={PlanleggerRoutes.BARNEHAGEPLASS} element={<BarnehageplassSteg />} />
            <Route path={PlanleggerRoutes.ARBEIDSSITUASJON} element={<ArbeidssituasjonSteg satser={satser} />} />
            <Route path={PlanleggerRoutes.HVOR_MYE} element={<HvorMyeSteg satser={satser} />} />
            <Route
                path={PlanleggerRoutes.HVOR_LANG_PERIODE}
                element={stønadskvoter ? <HvorLangPeriodeSteg stønadskvoter={stønadskvoter} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.FORDELING}
                element={stønadskvoter ? <FordelingSteg stønadskvoter={stønadskvoter} /> : <Loader />}
            />
            <Route
                path={PlanleggerRoutes.PLANEN_DERES}
                element={
                    stønadskvoter ? (
                        <Suspense fallback={<Spinner />}>
                            <PlanenDeresSteg stønadskvoter={stønadskvoter} />
                        </Suspense>
                    ) : (
                        <Loader />
                    )
                }
            />
            <Route
                path={PlanleggerRoutes.OPPSUMMERING}
                element={
                    <Suspense fallback={<Spinner />}>
                        <OppsummeringSteg stønadskvoter={stønadskvoter} satser={satser} />
                    </Suspense>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
