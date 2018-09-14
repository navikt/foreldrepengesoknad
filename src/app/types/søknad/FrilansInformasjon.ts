import { TidsperiodeMedValgfriSluttdato } from 'common/types';

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>;
    pågående: boolean;
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    oppstart: Date;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;
export type FrilansOppdragPartial = Partial<FrilansOppdrag>;
