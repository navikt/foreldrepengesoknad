import { Dictionary } from 'lodash';
import { InjectedIntl } from 'react-intl';
import { Søknadsinfo } from '../../selectors/types';
import { Periode, Stønadskontouttak, TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { RegelKey } from '.';
import { Tilleggsopplysninger } from '../../types/s\u00F8knad/S\u00F8knad';

type FeilIntlMessage = (intl: InjectedIntl) => string;

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'VIKTIG' = 'viktig',
    'INFO' = 'info'
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelStatus[];
    resultatPerPeriode: Dictionary<RegelStatus[]>;
    avvik: RegelAvvik[];
    antallAvvik: {
        ulovlig: number;
        viktig: number;
        info: number;
    };
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
    feilmelding?: RegelAvvikIntlFeilmelding;
    periodeId?: string;
}

export interface RegelStatus {
    key: RegelKey;
    passerer: boolean;
    regelAvvik?: RegelAvvik;
}

export interface RegelAvvik {
    key: RegelKey;
    periodeId?: string;
    feilmelding: RegelAvvikIntlFeilmelding;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export interface RegelAvvikIntlFeilmelding {
    intlKey: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | undefined };
}
