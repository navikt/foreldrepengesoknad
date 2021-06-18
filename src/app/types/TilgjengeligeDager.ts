import { TilgjengeligStønadskonto } from './TilgjengeligeStønadskonto';

export interface TilgjengeligeDager {
    dagerTotalt: number;
    dagerForeldrepengerFørFødsel: number;
    dagerEtterTermin: number;
    dagerMor: number;
    dagerFarMedmor: number;
    dagerFelles: number;
    flerbarnsdager: number;
    maksDagerMor: number;
    maksDagerFar: number;
    stønadskontoer: TilgjengeligStønadskonto[];
    dagerForeldrepenger: number;
}
