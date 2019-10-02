import { Søknadsinfo } from 'app/selectors/types';
import { Periode } from 'app/types/uttaksplan/periodetyper';
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
    opprinneligPlan?: Periode[]
): AddPeriodeResult => {
    const familiehendelsedato = søknadsinfo.søknaden.familiehendelsesdato;
    const builder = UttaksplanBuilder(uttaksplan, familiehendelsedato, opprinneligPlan);
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
