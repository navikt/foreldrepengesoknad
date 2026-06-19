import { ContextDataType, useContextGetAnyData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ArbeidssituasjonSteg } from 'steps/arbeidssituasjon/ArbeidssituasjonSteg';
import { BarnehageplassSteg } from 'steps/barnehageplass/BarnehageplassSteg';
import { FordelingSteg } from 'steps/fordeling/FordelingSteg';
import { HvemPlanleggerSteg } from 'steps/hvem-planlegger/HvemPlanleggerSteg';
import { HvorLangPeriodeSteg } from 'steps/hvor-lang-periode/HvorLangPeriodeSteg';
import { HvorMyeSteg } from 'steps/hvor-mye/HvorMyeSteg';
import { OmBarnetPlanleggerSteg } from 'steps/om-barnet/OmBarnetSteg';
import { OmPlanleggerenSteg } from 'steps/om-planleggeren/OmPlanleggerenSteg';
import { OppsummeringSteg } from 'steps/oppsummering/OppsummeringSteg';
import { PlanenDeresSteg } from 'steps/planen-deres/PlanenDeresSteg';

import { Loader } from '@navikt/ds-react';

import { KontoBeregningDto, Satser } from '@navikt/fp-types';

/**
 * Datakrav per steg: hvilke context-verdier steget (og barna det rendrer) henter ut med
 * `notEmpty`, og dermed forutsetter at finnes. Stegene tidligere i veiviseren har ingen krav.
 *
 * Brukes av {@link MedDatakrav} for å redirecte til start dersom et steg åpnes uten at de
 * innledende stegene er fylt ut – f.eks. ved direkte navigasjon, refresh, en delt/utdatert URL,
 * eller når in-memory state er nullstilt (bytte av planleggertype) og bruker går tilbake/fram i
 * nettleserhistorikken. Uten dette kaster `notEmpty` «Data er ikke oppgitt» og siden krasjer.
 */
const STEG_DATAKRAV: Partial<Record<PlanleggerRoutes, ContextDataType[]>> = {
    [PlanleggerRoutes.OM_BARNET]: [ContextDataType.HVEM_PLANLEGGER],
    [PlanleggerRoutes.BARNEHAGEPLASS]: [ContextDataType.HVEM_PLANLEGGER, ContextDataType.OM_BARNET],
    [PlanleggerRoutes.ARBEIDSSITUASJON]: [ContextDataType.HVEM_PLANLEGGER],
    [PlanleggerRoutes.HVOR_MYE]: [ContextDataType.HVEM_PLANLEGGER, ContextDataType.ARBEIDSSITUASJON],
    [PlanleggerRoutes.HVOR_LANG_PERIODE]: [
        ContextDataType.HVEM_PLANLEGGER,
        ContextDataType.OM_BARNET,
        ContextDataType.ARBEIDSSITUASJON,
    ],
    [PlanleggerRoutes.FORDELING]: [
        ContextDataType.HVEM_PLANLEGGER,
        ContextDataType.OM_BARNET,
        ContextDataType.ARBEIDSSITUASJON,
        ContextDataType.HVOR_LANG_PERIODE,
    ],
    [PlanleggerRoutes.PLANEN_DERES]: [
        ContextDataType.HVEM_PLANLEGGER,
        ContextDataType.OM_BARNET,
        ContextDataType.ARBEIDSSITUASJON,
        ContextDataType.HVOR_LANG_PERIODE,
    ],
    [PlanleggerRoutes.OPPSUMMERING]: [ContextDataType.HVEM_PLANLEGGER, ContextDataType.OM_BARNET],
};

export const MedDatakrav = ({ steg, children }: { steg: PlanleggerRoutes; children: ReactElement }) => {
    const getData = useContextGetAnyData();
    const manglerPåkrevdData = (STEG_DATAKRAV[steg] ?? []).some((key) => getData(key) === undefined);

    if (manglerPåkrevdData) {
        return <Navigate to="/" replace />;
    }

    return children;
};

interface Props {
    stønadskvoter?: { '100': KontoBeregningDto; '80': KontoBeregningDto };
    satser: Satser;
}

export const PlanleggerRouter = ({ stønadskvoter, satser }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<OmPlanleggerenSteg />} />
            <Route path={PlanleggerRoutes.HVEM_PLANLEGGER} element={<HvemPlanleggerSteg />} />
            <Route
                path={PlanleggerRoutes.OM_BARNET}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.OM_BARNET}>
                        <OmBarnetPlanleggerSteg />
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.BARNEHAGEPLASS}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.BARNEHAGEPLASS}>
                        <BarnehageplassSteg />
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.ARBEIDSSITUASJON}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.ARBEIDSSITUASJON}>
                        <ArbeidssituasjonSteg satser={satser} />
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.HVOR_MYE}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.HVOR_MYE}>
                        <HvorMyeSteg satser={satser} />
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.HVOR_LANG_PERIODE}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.HVOR_LANG_PERIODE}>
                        {stønadskvoter ? <HvorLangPeriodeSteg stønadskvoter={stønadskvoter} /> : <Loader />}
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.FORDELING}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.FORDELING}>
                        {stønadskvoter ? <FordelingSteg stønadskvoter={stønadskvoter} /> : <Loader />}
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.PLANEN_DERES}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.PLANEN_DERES}>
                        {stønadskvoter ? <PlanenDeresSteg stønadskvoter={stønadskvoter} /> : <Loader />}
                    </MedDatakrav>
                }
            />
            <Route
                path={PlanleggerRoutes.OPPSUMMERING}
                element={
                    <MedDatakrav steg={PlanleggerRoutes.OPPSUMMERING}>
                        <OppsummeringSteg stønadskvoter={stønadskvoter} satser={satser} />
                    </MedDatakrav>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
