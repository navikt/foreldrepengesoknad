import { TilretteleggingPeriodeSVP } from './TilretteleggingsperiodeSVP';

export interface ArbeidsforholdSVP {
    aktivitet: any;
    behovFrom: string;
    tilrettelegginger: TilretteleggingPeriodeSVP[];
    oppholdsperioder: any[];
    avslutningÅrsak:
        | 'NORMAL'
        | 'TILBAKE_I_HEL_STILLING'
        | 'AVSLAG_OVERGANG_FORELDREPENGER'
        | 'AVSLAG_FØDSEL'
        | 'AVSLAG_TIDSPERIODE_FØR_TERMIN'
        | 'AVSLAG_ANNET'
        | 'AVSLAG_INNGANGSVILKÅR';
}
