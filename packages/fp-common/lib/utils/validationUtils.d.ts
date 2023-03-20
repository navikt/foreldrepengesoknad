import { YesOrNo, DateRange } from '@navikt/sif-common-formik-ds/lib';
export declare const dateToday: Date;
export declare const date1YearFromNow: Date;
export declare const date1YearAgo: Date;
export declare const attenUkerTreDager: Date;
export declare const sixMonthsAgo: Date;
export declare const date21DaysAgo: Date;
export declare const validateYesOrNoIsAnswered: (answer: YesOrNo, errorIntlKey: string) => string | undefined;
export declare const validateRequiredField: (value: any, errorMsg: string) => string | undefined;
export declare const hasValue: (v: any) => boolean;
export declare const erMindreEnn3UkerSiden: (dato: string) => boolean;
export declare const etterDagensDato: (dato: string) => boolean;
export declare const sisteDatoBarnetKanVæreFødt: (dato: string) => boolean;
export declare const sisteMuligeTermindato: (dato: string) => boolean;
export declare const barnetErUnder15årPåAdopsjonsdato: (dato: string, adopsjonsdato: string) => boolean;
export declare const barnetErIkkeFødtFørAdopsjonsDato: (dato: string, adopsjonsdato: string) => boolean;
export declare const sisteDatoAdoptertBarnKanVæreFødt: (dato: string, adopsjonsdato: string) => boolean;
export declare const sisteMuligeDatoForOvertaOmsorg: (dato: string) => boolean;
export declare const erIUke22Pluss3: (dato: string) => boolean;
export declare const utstedtDatoErIUke22: (utstedtDatoString: string, terminDatoString: string) => boolean;
export declare const idagEllerTidligere: (dato: string) => boolean;
export declare const erMyndig: (fødselsdato: string) => boolean;
export declare const getFørsteMuligeTermindato: () => Date;
interface ItemWithFom {
    fom: string;
}
interface OpenDateRange {
    from: Date;
    to?: Date;
}
export declare const getSisteMuligeTermindato: () => Date;
export declare const getForsteMuligeTerminbekreftelsesdato: (termindato?: Date | string) => Date;
export declare const getSisteMuligeTerminbekreftelsesdato: () => Date;
export declare const dateRangesCollide: (ranges: DateRange[]) => boolean;
export declare const dateRangesExceedsRange: (ranges: DateRange[], allowedRange: DateRange) => boolean;
export declare const sortDateRange: (d1: DateRange, d2: DateRange) => number;
export declare const sortItemsByFom: (a: ItemWithFom, b: ItemWithFom) => number;
export declare const sortOpenDateRange: (d1: OpenDateRange, d2: OpenDateRange) => number;
export {};
