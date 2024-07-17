import { Familiehendelse } from './Familiehendelse';
import { Ytelse } from './Ytelse';
import { ÅpenBehandlingFP } from './ÅpenBehandling';

export interface EngangsstønadSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon: boolean;
    familiehendelse: Familiehendelse;
    åpenBehandling?: ÅpenBehandlingFP;
    oppdatertTidspunkt: string;
}

export interface EngangsstønadSak extends EngangsstønadSakDTO {
    ytelse: Ytelse.ENGANGSSTØNAD;
}
