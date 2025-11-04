// Representasjon i søknadene
import { CountryCode } from './fpsoknadDtoGenerert';

export type Utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

export type UtenlandsoppholdPeriode = {
    fom: string;
    tom: string;
    landkode: CountryCode;
};
