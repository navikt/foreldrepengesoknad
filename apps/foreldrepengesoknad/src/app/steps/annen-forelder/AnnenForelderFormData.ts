import { Attachment } from '@navikt/fp-common';

export type AnnenForelderIkkeOppgitt = {
    kanIkkeOppgis: true;
};

type AnnenForelderErOppgitt = {
    kanIkkeOppgis: false;
    aleneOmOmsorg?: boolean;
    fornavn: string;
    etternavn: string;
    fnr: string;
    utenlandskFnr?: boolean;
    bostedsland?: string;
    dokumentasjonAvAleneomsorg: Attachment[];
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
