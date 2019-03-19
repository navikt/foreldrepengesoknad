import { Dictionary } from 'lodash';
import { RegelKey } from './regelKeys';
import { InjectedIntl } from 'react-intl';
import { Søknadsinfo } from '../../selectors/types';
import { Periode, Stønadskontouttak } from '../../types/uttaksplan/periodetyper';

type FeilIntlMessage = (intl: InjectedIntl) => string;

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'VIKTIG' = 'viktig',
    'INFO' = 'info'
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelTestresultat[];
    resultatPerPeriode: Dictionary<RegelTestresultat[]>;
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
}

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export type RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
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
