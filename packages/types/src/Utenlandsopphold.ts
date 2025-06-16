// Representasjon i søknadene
import { CountryCode } from './apiDtoGenerert';

export type Utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

export type UtenlandsoppholdPeriode = {
    fom: string;
    tom: string;
    landkode: CountryCode;
};

// API representasjon
type UtenlandsoppholdDTO = {
    land: string;
    tidsperiode: {
        fom: string;
        tom: string;
    };
};

export type InformasjonOmUtenlandsoppholdDTO = {
    iNorgeSiste12Mnd: boolean;
    iNorgeNeste12Mnd: boolean;
    tidligereOpphold: UtenlandsoppholdDTO[];
    senereOpphold: UtenlandsoppholdDTO[];
};
