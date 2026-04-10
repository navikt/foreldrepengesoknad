import { Saksgrunnlag } from './Saksgrunnlag';

export interface EksisterendeSak {
    saksnummer: string;
    erAnnenPartsSak: boolean;
    grunnlag: Saksgrunnlag;
}
