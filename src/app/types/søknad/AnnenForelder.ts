interface AnnenForelder {
    navn: string;
    fnr: string;
    utenlandskFnr: boolean;
    bostedsland: string;
    kanIkkeOppgis: boolean;
}

export type AnnenForelderPartial = Partial<AnnenForelder>;

export default AnnenForelder;
