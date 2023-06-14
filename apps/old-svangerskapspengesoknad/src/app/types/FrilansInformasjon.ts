import { TidsperiodeMedValgfriSluttdato, TidsperiodeMedValgfriSluttdatoDTO } from 'common/types';

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    pågående: boolean;
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export interface FrilansOppdragDTO {
    navnPåArbeidsgiver: string;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdatoDTO>;
    pågående: boolean;
}

export interface FrilansInformasjonDTO {
    jobberFremdelesSomFrilans: boolean;
    oppstart: Date;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdragDTO[];
}

export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;
export type FrilansInformasjonPartialDTO = Partial<FrilansInformasjonDTO>;
