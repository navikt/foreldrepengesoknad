import { Tidsperiode } from '@navikt/fp-common';
import { TidsperiodeDTOMedValgfriSluttdato } from './TidsperiodeDTO';

export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export interface EndringAvNæringsinntektInformasjonDTO {
    dato: string;
    næringsinntektEtterEndring: string;
    forklaring: string;
}

export interface EndringAvNæringsinntektInformasjon {
    dato: string;
    næringsinntektEtterEndring: string;
    forklaring: string;
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
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjon;
}

export interface EgenNæringDTO
    extends Omit<EgenNæring, 'tidsperiode' | 'pågående' | 'endringAvNæringsinntektInformasjon'> {
    tidsperiode: Partial<TidsperiodeDTOMedValgfriSluttdato>;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjonDTO;
}
