import { Søknadsinfo } from 'app/selectors/types';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';

const deletePeriode = (
    søknadsinfo: Søknadsinfo,
    uttaksplan: Periode[],
    slettetPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    opprinneligPlan?: Periode[]
): Periode[] => {
    const familiehendelsedato = søknadsinfo.søknaden.familiehendelsesdato;
    const builder = UttaksplanBuilder(
        uttaksplan,
        familiehendelsedato,
        søknadsinfo,
        tilgjengeligeStønadskontoer,
        opprinneligPlan
    );

    return builder.slettPeriodeOgBuild(slettetPeriode).perioder;
};

export default deletePeriode;
