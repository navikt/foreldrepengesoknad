interface AnnenForelder {
    navn: string;
    fnr: string;
    utenlandskFnr: boolean;
    bostedsland: string;
    kanIkkeOppgis: boolean;
    harRettPåForeldrepenger: boolean;
    erInformertOmSøknaden: boolean;
    skalHaForeldrepenger: boolean;
    erForSyk: boolean;
    erUfør: boolean;
}

export type AnnenForelderPartial = Partial<AnnenForelder>;

export default AnnenForelder;
