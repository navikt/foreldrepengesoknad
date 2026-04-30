import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { erPeriodeIOpprinneligPlan } from 'utils/eksisterendeSakUtils';

import { KontoBeregningDto, UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';

import { useUttaksplanForEksisterendeSak } from './useUttaksplanForEksisterendeSak';
import { useUttaksplanForslag } from './useUttaksplanForslag';

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

type Args = {
    valgteStønadskontoer: KontoBeregningDto | undefined;
    annenPartPerioder: UttakPeriode_fpoversikt[] | undefined;
    erSøkerFarEllerMedmor: boolean;
};

export type GjeldendeUttaksplan = {
    /** Plan henta frå backend for ein eksisterande sak (gjeldende vedtak + annen part). undefined for ny søknad. */
    planFraEksisterendeSak: AlleUttakPerioder[] | undefined;
    /** Initiell plan som vert vist når brukar ikkje har gjort endringar. */
    initiellPlan: AlleUttakPerioder[];
    /** Den planen som faktisk skal visast: mellomlagra plan om den finst, ellers initiell. */
    gjeldendeUttaksplan: AlleUttakPerioder[];
    /** Indikerer om brukar har ein mellomlagra plan i context. */
    harMellomlagretPlan: boolean;
    /** Annen parts periodar er låste når dei kjem frå eksisterande sak eller annenPartVedtak. */
    erPeriodeneTilAnnenPartLåst: boolean;
    /** Sann om brukar sin mellomlagra plan skil seg frå initiellPlan. */
    erPlanenEndret: boolean;
};

/**
 * Samlar all logikk for å avgjere kva uttaksplan som skal visast og redigerast i UttaksplanSteg.
 * Sentraliserer dei ulike plan-kjeldene (mellomlagring, eksisterande sak, annen part, forslag)
 * slik at andre komponentar slepp å rekonstruere dette sjølv.
 */
export const useGjeldendeUttaksplan = ({
    valgteStønadskontoer,
    annenPartPerioder,
    erSøkerFarEllerMedmor,
}: Args): GjeldendeUttaksplan => {
    const mellomlagretPlan = useContextGetData(ContextDataType.UTTAKSPLAN);

    const planFraEksisterendeSak = useUttaksplanForEksisterendeSak(annenPartPerioder);

    // Filtrerer ut periodane til annen part midlertidig fram til me får på plass lagring av desse periodane
    const nyttForslag = useUttaksplanForslag(valgteStønadskontoer, annenPartPerioder).filter(
        (periode) =>
            Uttaksperioden.erIkkeEøsPeriode(periode) &&
            periode.forelder === (erSøkerFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR'),
    );

    const annenPartsPerioderEllerUndefined =
        annenPartPerioder && annenPartPerioder.length > 0 ? annenPartPerioder : undefined;

    const låstePerioderFraBackend = planFraEksisterendeSak ?? annenPartsPerioderEllerUndefined;
    const initiellPlan = låstePerioderFraBackend ?? nyttForslag;

    const gjeldendeUttaksplan = mellomlagretPlan ?? initiellPlan;

    const erPlanenEndret =
        mellomlagretPlan !== undefined &&
        (mellomlagretPlan.length !== initiellPlan.length ||
            initiellPlan.some((initiellPeriode) => !erPeriodeIOpprinneligPlan(mellomlagretPlan, initiellPeriode)));

    return {
        planFraEksisterendeSak,
        initiellPlan,
        gjeldendeUttaksplan,
        harMellomlagretPlan: mellomlagretPlan !== undefined,
        erPeriodeneTilAnnenPartLåst: !!låstePerioderFraBackend,
        erPlanenEndret,
    };
};
