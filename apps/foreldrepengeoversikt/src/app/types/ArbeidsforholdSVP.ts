import { TilretteleggingPeriodeSVP } from './TilretteleggingsperiodeSVP';

export interface ArbeidsforholdSVP {
    aktivitet: any;
    behovFrom: string;
    tilrettelegginger: TilretteleggingPeriodeSVP[];
    oppholdsperioder: any[];
}
