import dayjs from 'dayjs';
import { isForeldrepengerFørFødselUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { UpdatePeriodeParams } from './ModifyPeriodeParams';
import { UttaksplanBuilder } from './UttaksplanBuilder';

const removeEkstrauttakFørTermin = (uttaksplan: Periode[], familiehendelsedato: Date) => {
    return uttaksplan.filter(
        (periode) =>
            dayjs(periode.tidsperiode.fom).isSameOrAfter(familiehendelsedato, 'day') ||
            isForeldrepengerFørFødselUttaksperiode(periode)
    );
};

const updatePeriode = ({
    getUttaksstatusFunc,
    uttaksplan,
    oppdatertPeriode,
    tilgjengeligeStønadskontoer,
    familiehendelsesdato,
    erFlerbarnssøknad,
    erEndringsøknadUtenEkisterendeSak,
    relevantStartDatoForUttak,
    harMidlertidigOmsorg,
    harAktivitetskravIPeriodeUtenUttak,
    erAdopsjon,
    opprinneligPlan,
}: UpdatePeriodeParams): Periode[] => {
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
