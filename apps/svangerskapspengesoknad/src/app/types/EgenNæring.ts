import { Tidsperiode } from '@navikt/fp-common';
import { TidsperiodeDTOMedValgfriSluttdato } from './TidsperiodeDTO';

export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export interface EgenNæring {
    næringstype: Næringstype;
    tidsperiode: Tidsperiode;
    næringsinntekt?: string;
    pågående: boolean;
    navnPåNæringen: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: string;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
}

export interface EgenNæringDTO extends Omit<EgenNæring, 'tidsperiode' | 'pågående'> {
    tidsperiode: Partial<TidsperiodeDTOMedValgfriSluttdato>;
}
