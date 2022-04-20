import { Periode } from 'uttaksplan/types/Periode';
import { UttaksplanBuilder } from './UttaksplanBuilder';
import { DeletePeriodeParams } from './ModifyPeriodeParams';

const deletePeriode = ({
    getUttaksstatusFunc,
    uttaksplan,
    slettetPeriode,
    tilgjengeligeStønadskontoer,
    familiehendelsesdato,
    erFlerbarnssøknad,
    erEndringsøknadUtenEkisterendeSak,
    relevantStartDatoForUttak,
    harMidlertidigOmsorg,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    opprinneligPlan,
}: DeletePeriodeParams): Periode[] => {
    const builder = UttaksplanBuilder(
        getUttaksstatusFunc,
        uttaksplan,
        familiehendelsesdato,
        tilgjengeligeStønadskontoer,
        erFlerbarnssøknad,
        erEndringsøknadUtenEkisterendeSak,
        relevantStartDatoForUttak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        opprinneligPlan
    );

    return builder.slettPeriodeOgBuild(slettetPeriode).perioder;
};

export default deletePeriode;
