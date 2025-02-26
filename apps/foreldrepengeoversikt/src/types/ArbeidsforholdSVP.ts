export interface ArbeidsforholdSVP {
    aktivitet: Aktivitet;
    behovFrom: string;
    tilrettelegginger: TilretteleggingPeriodeSVP[];
    oppholdsperioder: Oppholdsperiode[];
    avslutningÅrsak:
        | 'NORMAL'
        | 'TILBAKE_I_HEL_STILLING'
        | 'AVSLAG_OVERGANG_FORELDREPENGER'
        | 'AVSLAG_FØDSEL'
        | 'AVSLAG_TIDSPERIODE_FØR_TERMIN'
        | 'AVSLAG_ANNET'
        | 'AVSLAG_INNGANGSVILKÅR';
}

type Oppholdsperiode = {
    fom: string;
    tom: string;
    årsak: 'FERIE'; //TODO
    oppholdKilde: 'SØKNAD'; //TODO
};

type Aktivitet = {
    type: 'FRILANS' | 'ORDINÆRT_ARBEID' | 'SELVSTENDIG_NÆRINGSDRIVENDE' | 'ANNET';
    arbeidsgiver: Arbeidsgiver;
};

type Arbeidsgiver = {
    id: string;
    type: 'PRIVAT' | 'ORGANISASJON';
};

export type Tilretteleggingstype = 'INGEN' | 'DELVIS' | 'HEL';

export interface TilretteleggingPeriodeSVP {
    type: Tilretteleggingstype;
    fom: string;
    tom: string;
    arbeidstidprosent?: number;
    resultat?: Resultat;
}

type Resultat = {
    resultatType: 'INNVILGET' | 'AVSLAG_SØKNADSFRIST' | 'AVSLAG_ANNET';
    utbetalingsgrad: number;
};
