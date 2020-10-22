import { TidsperiodeStringMedValgfriSluttdato } from '../../../common/types';

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: Partial<TidsperiodeStringMedValgfriSluttdato>;
    pågående: boolean;
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;
export type FrilansOppdragPartial = Partial<FrilansOppdrag>;
