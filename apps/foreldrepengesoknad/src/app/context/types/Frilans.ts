import { TidsperiodeMedValgfriSluttdatoDate } from '@navikt/fp-common';

export interface Frilans {
    jobberFremdelesSomFrilans: boolean;
    oppstart: Date;
    driverFosterhjem?: boolean;
    harJobbetForNærVennEllerFamilieSiste10Mnd: boolean;
    oppdragForNæreVennerEllerFamilieSiste10Mnd: FrilansOppdrag[];
}

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
    pågående: boolean;
}
