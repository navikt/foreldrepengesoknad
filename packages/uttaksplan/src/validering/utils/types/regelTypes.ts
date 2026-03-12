import { Dictionary } from 'lodash';
import { IntlShape } from 'react-intl';

import { Søknadsinfo } from '@navikt/fp-common';

type FeilIntlMessage = (intl: IntlShape) => string;

export enum RegelAlvorlighet {
    FEIL = 'feil',
    ADVARSEL = 'advarsel',
    INFO = 'info',
}

export interface UttaksplanRegelTestresultat {
    resultat: RegelStatus[];
    avvikPerPeriode: Dictionary<RegelAvvik[]>;
    avvik: RegelAvvik[];
    harFeil: boolean;
}

type RegelKategori = 'fordeling' | undefined;

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

export type RegelTest = (grunnlag: Søknadsinfo) => RegelTestresultat;

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

type AvvikType = 'forretning' | 'skjema';

export interface RegelAvvik {
    id: string;
    regel: Regel;
    periodeId?: string;
    info: RegelAvvikInfo;
}

type avikValueFunk = (intl: IntlShape) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type intlHTMLFragmentFunc = (msg: any) => any;

interface AvvikInfo {
    periodeId?: string;
    values?: {
        [key: string]: string | number | Date | FeilIntlMessage | avikValueFunk | undefined | intlHTMLFragmentFunc;
    };
    renderAsHtml?: boolean;
}

export interface RegelAvvikInfo extends AvvikInfo {
    intlKey: string;
}

export interface RegelTestresultatInfo extends AvvikInfo {
    intlKey?: string;
}
