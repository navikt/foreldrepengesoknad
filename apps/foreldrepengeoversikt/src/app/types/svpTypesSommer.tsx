export interface GjeldendeVedtak {
    arbeidsforhold: Arbeidsforhold[];
    oppdatertTidspunkt: string;
    sakAvsluttet: boolean;
    saksnummer: string;
}

interface Arbeidsforhold {
    aktivitet: Aktivitet;
    avslutningsÅrsak?: string; //Enum??
    behovFrom: string;
    oppholdsperioder: [];
    tilrettelegginger: svpPerioder[];
}

interface svpPerioder {
    fom: string;
    tom: string;
    type: string; // Enums??
    arbeidstidprosent: number;
}

interface Aktivitet {
    arbeidsgiver: Arbeidsgiver;
    type: string;
}

interface Arbeidsgiver {
    id: string;
    type: string;
}

export interface Søknad {
    arbeidsforhold: Arbeidsforhold[];
    tilstand: string; // Enum??
}
