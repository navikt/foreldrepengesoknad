import { Familiehendelse } from './Familiehendelse';
import { Ytelse } from './Ytelse';
import { GjeldendeVedtak } from './svpTypesSommer';
import { ÅpenBehandling } from './ÅpenBehandling';

export interface SvangerskapspengeSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon?: boolean;
    familiehendelse?: Familiehendelse;
    åpenBehandling?: ÅpenBehandling;
    gjeldendeVedtak?: GjeldendeVedtak;
}

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}
