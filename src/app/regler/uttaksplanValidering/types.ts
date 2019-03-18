import { Dictionary } from 'lodash';
import { RegelKey } from './regelKeys';
import { InjectedIntl } from 'react-intl';
import { Søknadsinfo } from '../../selectors/types';
import { Periode } from '../../types/uttaksplan/periodetyper';

type FeilIntlMessage = (intl: InjectedIntl) => string;

export enum RegelAlvorlighet {
    'ULOVLIG' = 'ulovlig',
    'VIKTIG' = 'viktig',
    'INFO' = 'info'
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelTestresultat[];
    resultatPerPeriode: Dictionary<RegelTestresultat[]>;
    regelbrudd: Regelbrudd[];
}

export interface Regelgrunnlag {
    perioder: Periode[];
    søknadsinfo: Søknadsinfo;
}

export interface Regel {
    key: RegelKey;
    test: RegelTest;
    erRelevant?: (grunnlag: Regelgrunnlag) => boolean;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export type RegelTest = (regel: Regel, grunnlag: Regelgrunnlag) => RegelTestresultat;

export interface RegelTestresultat {
    key: RegelKey;
    passerer: boolean;
    regelbrudd?: Regelbrudd;
}

export interface Regelbrudd {
    periodeId?: string;
    key: RegelKey;
    feilmelding: RegelbruddIntlFeilmelding;
    alvorlighet: RegelAlvorlighet;
    overstyresAvRegel?: RegelKey;
    overstyrerRegler?: RegelKey[];
}

export interface RegelbruddIntlFeilmelding {
    intlKey: string;
    values?: { [key: string]: string | number | Date | FeilIntlMessage | undefined };
}
