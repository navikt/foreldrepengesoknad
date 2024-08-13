import { Familiehendelse } from './Familiehendelse';
import { Ytelse } from './Ytelse';
import { ÅpenBehandlingSVP } from './ÅpenBehandling';

export interface SvangerskapspengeSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon?: boolean;
    familiehendelse?: Familiehendelse;
    åpenBehandling?: ÅpenBehandlingSVP;
    oppdatertTidspunkt: string;
}

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}
