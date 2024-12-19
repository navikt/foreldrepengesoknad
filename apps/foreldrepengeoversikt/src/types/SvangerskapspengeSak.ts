import { ArbeidsforholdSVP } from './ArbeidsforholdSVP';
import { Familiehendelse } from './Familiehendelse';
import { Ytelse } from './Ytelse';
import { ÅpenBehandlingSVP } from './ÅpenBehandling';

type VedtakDto = {
    arbeidsforhold: ArbeidsforholdSVP[];
    avslagÅrsak?: unknown;
};

export interface SvangerskapspengeSakDTO {
    saksnummer: string;
    sakAvsluttet: boolean;
    gjelderAdopsjon?: boolean;
    familiehendelse?: Familiehendelse;
    åpenBehandling?: ÅpenBehandlingSVP;
    gjeldendeVedtak?: VedtakDto;
    oppdatertTidspunkt: string;
}

export interface SvangerskapspengeSak extends SvangerskapspengeSakDTO {
    ytelse: Ytelse.SVANGERSKAPSPENGER;
}
