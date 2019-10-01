import { Søknadsinfo } from 'app/selectors/types';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';

const deletePeriode = (
    søknadsinfo: Søknadsinfo,
    uttaksplan: Periode[],
    slettetPeriode: Periode,
    opprinneligPlan?: Periode[]
): Periode[] => {
    const familiehendelseDato = søknadsinfo.søknaden.familiehendelsesdato;
    const builder = UttaksplanBuilder(uttaksplan, familiehendelseDato, opprinneligPlan);

    return builder.slettPeriodeOgBuild(slettetPeriode).perioder;
};

export default deletePeriode;
