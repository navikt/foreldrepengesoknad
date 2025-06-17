import { CountryCode } from './apiDtoGenerert';

export const EGEN_NÆRING_ID = 'nearing';

export enum Næringstype {
    FISKER = 'FISKE',
    JORDBRUK = 'JORDBRUK_SKOGBRUK',
    DAGMAMMA = 'DAGMAMMA',
    ANNET = 'ANNEN',
}

export type EgenNæring = {
    næringstype: Næringstype;
    fom: string;
    tom: string;
    næringsinntekt?: number;
    pågående: boolean; // Brukes ikke backend
    navnPåNæringen?: string;
    organisasjonsnummer?: string;
    registrertINorge: boolean;
    registrertILand?: CountryCode;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    oppstartsdato?: string;
    hattVarigEndringAvNæringsinntektSiste4Kalenderår?: boolean;
    varigEndringDato?: string;
    varigEndringInntektEtterEndring?: number;
    varigEndringBeskrivelse?: string;
};
