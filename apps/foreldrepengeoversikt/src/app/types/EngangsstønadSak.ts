import { Familiehendelse } from './Familiehendelse';
import { Ytelse } from './Ytelse';
import { ÅpenBehandling } from './ÅpenBehandling';

export interface EngangsstønadSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon: boolean;
    familiehendelse: Familiehendelse;
    åpenBehandling?: ÅpenBehandling;
}

export interface EngangsstønadSak extends EngangsstønadSakDTO {
    ytelse: Ytelse.ENGANGSSTØNAD;
}
