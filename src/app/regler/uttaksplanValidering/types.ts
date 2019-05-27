import { Dictionary } from 'lodash';
import { InjectedIntl } from 'react-intl';
import { Søknadsinfo } from '../../selectors/types';
import { Periode, Stønadskontouttak, TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { RegelKey } from '.';
import { Tilleggsopplysninger } from '../../types/søknad/Søknad';

type FeilIntlMessage = (intl: InjectedIntl) => string;

export enum RegelAlvorlighet {
    'FEIL' = 'feil',
    'ADVARSEL' = 'advarsel',
    'INFO' = 'info'
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelStatus[];
    avvikPerPeriode: Dictionary<RegelAvvik[]>;
    avvik: RegelAvvik[];
    harFeil: boolean;
}

export interface Regelgrunnlag {
    perioder: Periode[];
    søknadsinfo: Søknadsinfo;
    uttaksstatusStønadskontoer: Stønadskontouttak[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    tilleggsopplysninger: Tilleggsopplysninger;
    perioderSomSkalSendesInn: Periode[];
}

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
    slåsSammenVedOppsummering?: boolean;
}

export type RegelTest = (grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
    passerer: boolean;
    info?: RegelTestresultatInfoObject;
    periodeId?: string;
}

export type RegelTestresultatInfoObject = RegelTestresultatInfo | RegelTestresultatInfo[];

export interface RegelStatus {
    key: RegelKey;
    passerer: boolean;
    regelAvvik?: RegelAvvik[];
}

export interface RegelAvvik {
    id: string;
    key: RegelKey;
    periodeId?: string;
    info: RegelAvvikInfo;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
    slåsSammenVedOppsummering?: boolean;
}

interface AvvikInfo {
    periodeId?: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | undefined };
    renderAsHtml?: boolean;
}

export interface RegelAvvikInfo extends AvvikInfo {
    intlKey: string;
}

export interface RegelTestresultatInfo extends AvvikInfo {
    intlKey?: string;
}
