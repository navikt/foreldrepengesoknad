import { Dictionary } from 'lodash';
import { InjectedIntl } from 'react-intl';

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
}

export type RegelKategori = 'fordeling' | undefined;

export interface Regel {
    key: string;
    test: RegelTest;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: string;
    overstyrerRegler?: string[];
    slåsSammenVedOppsummering?: boolean;
    skjulesIOppsummering?: boolean;
    skjulesIPeriode?: boolean;
    avvikType?: AvvikType;
    kategori?: RegelKategori;
}

export type RegelTest = (grunnlag: any) => RegelTestresultat;

export interface RegelTestresultat {
    passerer: boolean;
    info?: RegelTestresultatInfoObject;
    periodeId?: string;
}

export type RegelTestresultatInfoObject = RegelTestresultatInfo | RegelTestresultatInfo[];

export interface RegelStatus {
    key: string;
    passerer: boolean;
    regelAvvik?: RegelAvvik[];
}

export type AvvikType = 'forretning' | 'skjema';

export interface RegelAvvik {
    id: string;
    regel: Regel;
    periodeId?: string;
    info: RegelAvvikInfo;
}

type avikValueFunk = (intl: InjectedIntl) => string;

interface AvvikInfo {
    periodeId?: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | avikValueFunk | undefined };
    renderAsHtml?: boolean;
}

export interface RegelAvvikInfo extends AvvikInfo {
    intlKey: string;
}

export interface RegelTestresultatInfo extends AvvikInfo {
    intlKey?: string;
}
