import { Tidsperiode } from '@navikt/fp-common';
import { TidsperiodeDTOMedValgfriSluttdato } from './TidsperiodeDTO';

export const egenNæringId = 'næring';

export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export interface EndringAvNæringsinntektInformasjonDTO {
    dato: Date;
    næringsinntektEtterEndring: number;
    forklaring: string;
}

export interface EndringAvNæringsinntektInformasjon {}

export interface EgenNæring {
    næringstyper: Næringstype[];
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
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: string;
    varigEndringBeskrivelse?: string;
}

export interface EgenNæringDTO
    extends Omit<
        EgenNæring,
        | 'tidsperiode'
        | 'pågående'
        | 'endringAvNæringsinntektInformasjon'
        | 'varigEndringDato'
        | 'varigEndringInntektEtterEndring'
        | 'varigEndringBeskrivelse'
        | 'næringsinntekt'
    > {
    tidsperiode: Partial<TidsperiodeDTOMedValgfriSluttdato>;
    endringAvNæringsinntektInformasjon?: EndringAvNæringsinntektInformasjonDTO;
    næringsinntekt?: number;
}
