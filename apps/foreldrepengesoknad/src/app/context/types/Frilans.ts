import { TidsperiodeMedValgfriSluttdatoDate } from '@navikt/fp-common';

export interface Frilans {
    jobberFremdelesSomFrilans: boolean;
    oppstart: Date;
}

export interface FrilansOppdrag {
    navnPåArbeidsgiver: string;
    tidsperiode: TidsperiodeMedValgfriSluttdatoDate;
    pågående: boolean;
}
