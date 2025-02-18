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

import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import { TilpassPlanenSteg } from './steps/tilpass-planen/TilpassPlanenSteg';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    stønadskontoer?: TilgjengeligeStønadskontoer;
    satser: Satser;
}

export const PlanleggerRouter = ({ locale, changeLocale, stønadskontoer, satser }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<OmPlanleggerenSteg locale={locale} changeLocale={changeLocale} />} />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg locale={locale} />} />
            <Route path={PlanleggerRoutes.OM_BARNET} element={<OmBarnetSteg locale={locale} />} />
            <Route path={PlanleggerRoutes.BARNEHAGEPLASS} element={<BarnehageplassSteg locale={locale} />} />
            <Route
                path={PlanleggerRoutes.ARBEIDSSITUASJON}
                element={<ArbeidssituasjonSteg satser={satser} locale={locale} />}
            />
            <Route path={PlanleggerRoutes.HVOR_MYE} element={<HvorMyeSteg locale={locale} satser={satser} />} />
            <Route
                path={PlanleggerRoutes.HVOR_LANG_PERIODE}
                element={
                    stønadskontoer ? (
                        <HvorLangPeriodeSteg stønadskontoer={stønadskontoer} locale={locale} />
                    ) : (
                        <Loader />
                    )
                }
            />
            <Route
                path={PlanleggerRoutes.FORDELING}
                element={
                    stønadskontoer ? <FordelingSteg stønadskontoer={stønadskontoer} locale={locale} /> : <Loader />
                }
            />
            <Route
                path={PlanleggerRoutes.PLANEN_DERES}
                element={
                    stønadskontoer ? <PlanenDeresSteg stønadskontoer={stønadskontoer} locale={locale} /> : <Loader />
                }
            />
            <Route
                path={PlanleggerRoutes.TILPASS_PLANEN}
                element={
                    stønadskontoer ? <TilpassPlanenSteg stønadskontoer={stønadskontoer} locale={locale} /> : <Loader />
                }
            />
            <Route
                path={PlanleggerRoutes.OPPSUMMERING}
                element={<OppsummeringSteg stønadskontoer={stønadskontoer} satser={satser} locale={locale} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
