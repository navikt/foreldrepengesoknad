import { TidsperiodeDate, TidsperiodeMedValgfriSluttdato } from '@navikt/fp-common';

export interface Frilans {
    jobberFremdelesSomFrilans: boolean;
    oppstart: string;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdato;
    pågående: boolean;
}

export interface FrilansInnsending extends Omit<Frilans, 'oppdragForNæreVennerEllerFamilieSiste10Mnd'> {
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdragInnsending[];
}

export interface FrilansOppdragInnsending extends Omit<FrilansOppdrag, 'tidsperiode'> {
    tidsperiode: Partial<TidsperiodeDate>;
}
