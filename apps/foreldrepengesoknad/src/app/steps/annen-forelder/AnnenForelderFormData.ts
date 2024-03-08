export type AnnenForelderIkkeOppgitt = {
    kanIkkeOppgis: true;
};

export type AnnenForelderErOppgitt = {
    kanIkkeOppgis: false;
    erAleneOmOmsorg: boolean;
    fornavn: string;
    etternavn: string;
    fnr: string;
    utenlandskFnr?: boolean;
    bostedsland?: string;
    datoForAleneomsorg?: string;
    harRettPåForeldrepengerINorge?: boolean;
    harOppholdtSegIEØS?: boolean;
    harRettPåForeldrepengerIEØS?: boolean;
    erInformertOmSøknaden?: boolean;
    erMorUfør?: boolean;
};

export type AnnenForelderFormData = AnnenForelderIkkeOppgitt | AnnenForelderErOppgitt;

export const erAnnenForelderOppgitt = (
    annenForelder: AnnenForelderFormData,
): annenForelder is AnnenForelderErOppgitt => {
    if (!(annenForelder as AnnenForelderErOppgitt).kanIkkeOppgis) {
        return true;
    }
    return false;
};
