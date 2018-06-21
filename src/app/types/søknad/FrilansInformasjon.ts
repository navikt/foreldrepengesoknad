import { TidsperiodeMedValgfriSluttdatoPartial } from 'common/types';

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdatoPartial;
    pågående: boolean;
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    driverFosterhjem: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;
export type FrilansOppdragPartial = Partial<FrilansOppdrag>;
