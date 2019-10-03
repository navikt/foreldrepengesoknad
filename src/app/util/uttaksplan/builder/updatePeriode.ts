import { Søknadsinfo } from 'app/selectors/types';
import {
    Periode,
    isForeldrepengerFørFødselUttaksperiode,
    TilgjengeligStønadskonto
} from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';
import moment from 'moment';

const removeEkstrauttakFørTermin = (uttaksplan: Periode[], familiehendelsedato: Date) => {
    return uttaksplan.filter(
        (periode) =>
            moment(periode.tidsperiode.fom).isSameOrAfter(familiehendelsedato, 'day') ||
            isForeldrepengerFørFødselUttaksperiode(periode)
    );
};

const updatePeriode = (
    søknadsinfo: Søknadsinfo,
    uttaksplan: Periode[],
    oppdatertPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    opprinneligPlan?: Periode[]
): Periode[] => {
    const familiehendelsedato = søknadsinfo.søknaden.familiehendelsesdato;
    const removeOtherPerioderFørTermin =
        isForeldrepengerFørFødselUttaksperiode(oppdatertPeriode) && oppdatertPeriode.skalIkkeHaUttakFørTermin === true;
    const filteredPerioder = removeOtherPerioderFørTermin
        ? removeEkstrauttakFørTermin(uttaksplan, søknadsinfo.søknaden.familiehendelsesdato)
        : uttaksplan;

    const builder = UttaksplanBuilder(
        filteredPerioder,
        familiehendelsedato,
        søknadsinfo,
        tilgjengeligeStønadskontoer,
        opprinneligPlan
    );

    return builder.oppdaterPeriodeOgBuild(oppdatertPeriode).perioder;
};

export default updatePeriode;
