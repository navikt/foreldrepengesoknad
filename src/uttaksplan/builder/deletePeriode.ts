import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Periode } from 'uttaksplan/types/Periode';
import { Uttaksstatus } from 'uttaksplan/utils/uttaksstatus';
import { UttaksplanBuilder } from './UttaksplanBuilder';

const deletePeriode = (
    getUttaksstatusFunc: (tilgjengStønadskontoer: TilgjengeligStønadskonto[], uttaksplan: Periode[]) => Uttaksstatus,
    uttaksplan: Periode[],
    slettetPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    familiehendelsesdato: Date,
    erFlerbarnssøknad: boolean,
    erEndringsøknadUtenEkisterendeSak: boolean,
    relevantStartDatoForUttak: Date | undefined,
    harMidlertidigOmsorg: boolean,
    harAktivitetskravIPeriodeUtenUttak: boolean,
    erAdopsjon: boolean,
    opprinneligPlan?: Periode[]
): Periode[] => {
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
