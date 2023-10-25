import { ForeldreparForelder, ForeldreparIllustrasjonsvariant } from './ForeldreparSituasjonTypes';

export interface SituasjonForelderSvg {
    mor: ForeldreparForelder;
    farMedmor: ForeldreparForelder;
    variant?: ForeldreparIllustrasjonsvariant;
}
