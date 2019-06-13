import { ForeldreparForelder } from 'shared/types/foreldreparTypes';
import { Forelder, StønadskontoType } from 'common/types';

export * from '../regler/regelTypes';
export * from './forbrukTypes';
export * from './foreldreparTypes';

export interface Forelderinfo {
    navn: string;
    ikonRef: ForeldreparForelder;
}

export interface OmForeldre {
    mor: Forelderinfo;
    farMedmor?: Forelderinfo;
    bareMor: boolean;
    bareFar: boolean;
    forelderVedAleneomsorg?: Forelder;
    erDeltOmsorg: boolean;
}

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

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}
