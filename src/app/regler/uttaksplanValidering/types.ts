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
}

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export type RegelTest = (grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
    passerer: boolean;
    info?: RegelTestresultatInfoObject;
    periodeId?: string;
}

export type RegelTestresultatInfoObject = Partial<RegelTestresultatInfo> | Array<Partial<RegelTestresultatInfo>>;

export interface RegelStatus {
    key: RegelKey;
    passerer: boolean;
    regelAvvik?: RegelAvvik[];
}

export interface RegelAvvik {
    id: string;
    key: RegelKey;
    periodeId?: string;
    info: RegelTestresultatInfo;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export interface RegelTestresultatInfo {
    intlKey: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | undefined };
    periodeId?: string;
}
