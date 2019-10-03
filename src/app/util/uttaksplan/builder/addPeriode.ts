import { Søknadsinfo } from 'app/selectors/types';
import { Periode, TilgjengeligStønadskonto } from 'app/types/uttaksplan/periodetyper';
import { UttaksplanBuilder } from './UttaksplanBuilder';
import { guid } from 'nav-frontend-js-utils';

interface AddPeriodeResult {
    updatedPlan: Periode[];
    id: string;
}

const addPeriode = (
    søknadsinfo: Søknadsinfo,
    uttaksplan: Periode[],
    nyPeriode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    opprinneligPlan?: Periode[]
): AddPeriodeResult => {
    const familiehendelsedato = søknadsinfo.søknaden.familiehendelsesdato;
    const builder = UttaksplanBuilder(
        uttaksplan,
        familiehendelsedato,
        søknadsinfo,
        tilgjengeligeStønadskontoer,
        opprinneligPlan
    );
    const id = guid();

    return {
        updatedPlan: builder.leggTilPeriodeOgBuild({
            ...nyPeriode,
            id
        }).perioder,
        id
    };
};

export default addPeriode;
