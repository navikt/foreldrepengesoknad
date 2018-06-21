import { TidsperiodeMedValgfriSluttdato } from 'common/types';

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
}

export interface FrilansInformasjon {
    jobberFremdelesSomFrilans: boolean;
    driverFosterhjem: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export type FrilansInformasjonPartial = Partial<FrilansInformasjon>;
