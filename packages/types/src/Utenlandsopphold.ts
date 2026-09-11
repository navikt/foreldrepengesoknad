// Representasjon i søknadene

export type Utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: boolean;
    skalBoUtenforNorgeNeste12Mnd: boolean;
};

// Merk: `tom` er valgfri fordi senere/fremtidige utenlandsopphold kan mangle kjent sluttdato.
// Typen deles av både tidligere og senere utenlandsopphold (det finnes ingen egne typer for disse),
// så tidligere-steget må selv fortsette å håndheve at `tom` er påkrevd via skjemavalidering.
export type UtenlandsoppholdPeriode = {
    fom: string;
    tom?: string;
    landkode: string;
};
