import { Søknadsinfo } from 'app/selectors/types';
import { Periode, isForeldrepengerFørFødselUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';
import moment from 'moment';

const removeEkstrauttakFørTermin = (uttaksplan: Periode[], familiehendelseDato: Date) => {
    return uttaksplan.filter(
        (periode) =>
            moment(periode.tidsperiode.fom).isSameOrAfter(familiehendelseDato, 'day') ||
            isForeldrepengerFørFødselUttaksperiode(periode)
    );
};

const updatePeriode = (
    søknadsinfo: Søknadsinfo,
    uttaksplan: Periode[],
    oppdatertPeriode: Periode,
    opprinneligPlan?: Periode[]
): Periode[] => {
    const familiehendelseDato = søknadsinfo.søknaden.familiehendelsesdato;
    const removeOtherPerioderFørTermin =
        isForeldrepengerFørFødselUttaksperiode(oppdatertPeriode) && oppdatertPeriode.skalIkkeHaUttakFørTermin === true;
    const filteredPerioder = removeOtherPerioderFørTermin
        ? removeEkstrauttakFørTermin(uttaksplan, søknadsinfo.søknaden.familiehendelsesdato)
        : uttaksplan;

    const builder = UttaksplanBuilder(filteredPerioder, familiehendelseDato, opprinneligPlan);

    return builder.oppdaterPeriodeOgBuild(oppdatertPeriode).perioder;
};

export default updatePeriode;
