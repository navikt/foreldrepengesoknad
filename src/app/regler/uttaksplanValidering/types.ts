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
    eksisterendeUttaksplan: Periode[] | undefined;
}

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
    slåsSammenVedOppsummering?: boolean;
    skjulesIOppsummering?: boolean;
    skjulesIPeriode?: boolean;
    avvikType?: AvvikType;
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
