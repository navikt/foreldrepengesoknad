import { Periode } from '../../types';

export enum TidslinjeinnslagType {
    'periode' = 'periode',
    'hendelse' = 'hendelse'
}

export interface InnslagHendelsetype {
    type: TidslinjeinnslagType.hendelse;
    hendelse: 'termin' | 'permisjonsslutt';
    dato: Date;
}

export interface InnslagPeriodetype {
    type: TidslinjeinnslagType.periode;
    periode: Periode;
    perioderekke: Periode[];
    ekstrainfo?: InnslagEkstrainfo;
}

export interface InnslagEkstrainfo {
    tekst: React.ReactNode;
}

export type Tidslinjeinnslag = InnslagPeriodetype | InnslagHendelsetype;
