import { Tidsperiode, TidsperiodeMedValgfriSluttdato } from './../types/Tidsperiode';
export declare const formatDate: (date: Date | string) => string;
export declare const formatDateExtended: (date: Date | string) => string;
export declare const formatTidsperiode: (tidsperiode: Tidsperiode) => string;
export declare const formatTidsperiodeMedValgfriSluttdato: (tidsperiode: TidsperiodeMedValgfriSluttdato) => string;
export declare const doesTidsperiodeContainDate: (tidsperiode: Tidsperiode, date: string) => boolean;
export declare const doesTidsperiodeMedValgfriSluttdatoContainDate: (tidsperiode: TidsperiodeMedValgfriSluttdato, date: string) => boolean;
