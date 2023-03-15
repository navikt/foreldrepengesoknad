import { Familiehendelse } from './Familiehendelse';
import { Ytelse } from './Ytelse';
import { ÅpenBehandling } from './ÅpenBehandling';

export interface SvangerskapspengeSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon: boolean;
    familiehendelse: Familiehendelse;
    åpenBehandling?: ÅpenBehandling;
}

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}
