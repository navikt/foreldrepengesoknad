interface Common {
    kanIkkeOppgis: boolean;
}

export interface AnnenForelderOppgitt extends Common {
    fornavn: string;
    etternavn: string;
    fnr: string;
    utenlandskFnr?: boolean;
    bostedsland?: string;
    harRettPåForeldrepenger?: boolean;
    erInformertOmSøknaden?: boolean;
    erForSyk?: boolean;
    erUfør?: boolean;
}

export interface AnnenForelderIkkeOppgitt extends Common {}

type AnnenForelder = AnnenForelderIkkeOppgitt | AnnenForelderOppgitt;

export const isAnnenForelderOppgitt = (annenForelder: AnnenForelder): annenForelder is AnnenForelderOppgitt => {
    return annenForelder.kanIkkeOppgis === false;
};

export const isAnnenForelderIkkeOppgitt = (annenForelder: AnnenForelder): annenForelder is AnnenForelderIkkeOppgitt => {
    return annenForelder.kanIkkeOppgis === true;
};

export default AnnenForelder;
