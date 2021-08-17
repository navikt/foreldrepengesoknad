import {
    Periode,
    isForeldrepengerFørFødselUttaksperiode,
    TilgjengeligStønadskonto,
} from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';
import moment from 'moment';
import { Uttaksstatus } from '../uttaksstatus';

const removeEkstrauttakFørTermin = (uttaksplan: Periode[], familiehendelsedato: Date) => {
    return uttaksplan.filter(
        (periode) =>
            moment(periode.tidsperiode.fom).isSameOrAfter(familiehendelsedato, 'day') ||
            isForeldrepengerFørFødselUttaksperiode(periode)
    );
};

const updatePeriode = (
    getUttaksstatusFunc: (tilgjengStønadskontoer: TilgjengeligStønadskonto[], uttaksplan: Periode[]) => Uttaksstatus,
    uttaksplan: Periode[],
    oppdatertPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    familiehendelsesdato: Date,
    erFlerbarnssøknad: boolean,
    erEndringsøknadUtenEkisterendeSak: boolean,
    relevantStartDatoForUttak: Date | undefined,
    harMidlertidigOmsorg: boolean,
    erArbeidstaker: boolean,
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
        erArbeidstaker,
        opprinneligPlan
    );

    return builder.oppdaterPeriodeOgBuild(oppdatertPeriode).perioder;
};

export default updatePeriode;
