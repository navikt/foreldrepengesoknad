interface AnnenForelder {
    fornavn: string;
    etternavn: string;
    fnr: string;
    utenlandskFnr: boolean;
    bostedsland: string;
    kanIkkeOppgis: boolean;
    harRettPåForeldrepenger: boolean;
    erInformertOmSøknaden: boolean;
    erForSyk: boolean;
    harMorUføretrygd : boolean;
}

export type AnnenForelderPartial = Partial<AnnenForelder>;

export default AnnenForelder;
