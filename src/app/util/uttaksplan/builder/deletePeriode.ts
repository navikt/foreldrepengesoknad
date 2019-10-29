import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';
import { Uttaksstatus } from '../uttaksstatus';

const deletePeriode = (
    getUttaksstatusFunc: (tilgjengStønadskontoer: TilgjengeligStønadskonto[], uttaksplan: Periode[]) => Uttaksstatus,
    uttaksplan: Periode[],
    slettetPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    familiehendelsesdato: Date,
    erFlerbarnssøknad: boolean,
    erEndringssøknad: boolean,
    opprinneligPlan?: Periode[]
): Periode[] => {
    const builder = UttaksplanBuilder(
        getUttaksstatusFunc,
        uttaksplan,
        familiehendelsesdato,
        tilgjengeligeStønadskontoer,
        erFlerbarnssøknad,
        erEndringssøknad,
        opprinneligPlan
    );

    return builder.slettPeriodeOgBuild(slettetPeriode).perioder;
};

export default deletePeriode;
