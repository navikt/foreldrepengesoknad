import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import dayjs from 'dayjs';
import { isForeldrepengerFørFødselUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { Uttaksstatus } from 'uttaksplan/utils/uttaksstatus';
import { UttaksplanBuilder } from './UttaksplanBuilder';

const removeEkstrauttakFørTermin = (uttaksplan: Periode[], familiehendelsedato: Date) => {
    return uttaksplan.filter(
        (periode) =>
            dayjs(periode.tidsperiode.fom).isSameOrAfter(familiehendelsedato, 'day') ||
            isForeldrepengerFørFødselUttaksperiode(periode)
    );
};

const updatePeriode = (
    getUttaksstatusFunc: () => Uttaksstatus,
    uttaksplan: Periode[],
    oppdatertPeriode: Periode,
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
    const familiehendelsedato = familiehendelsesdato;
    const removeOtherPerioderFørTermin =
        isForeldrepengerFørFødselUttaksperiode(oppdatertPeriode) && oppdatertPeriode.skalIkkeHaUttakFørTermin === true;
    const filteredPerioder = removeOtherPerioderFørTermin
        ? removeEkstrauttakFørTermin(uttaksplan, familiehendelsesdato)
        : uttaksplan;

    const builder = UttaksplanBuilder(
        getUttaksstatusFunc,
        filteredPerioder,
        familiehendelsedato,
        tilgjengeligeStønadskontoer,
        erFlerbarnssøknad,
        erEndringsøknadUtenEkisterendeSak,
        relevantStartDatoForUttak,
        harMidlertidigOmsorg,
        harAktivitetskravIPeriodeUtenUttak,
        erAdopsjon,
        opprinneligPlan
    );

    return builder.oppdaterPeriodeOgBuild(oppdatertPeriode).perioder;
};

export default updatePeriode;
