import { CountryCode } from '@navikt/fp-types';

interface Common {
    kanIkkeOppgis: boolean;
}

export interface AnnenForelderOppgitt extends Common {
    fornavn: string;
    etternavn: string;
    fnr: string;
    utenlandskFnr?: boolean;
    bostedsland?: CountryCode;
    harRettPåForeldrepengerINorge?: boolean;
    harOppholdtSegIEØS?: boolean;
    harRettPåForeldrepengerIEØS?: boolean;
    erInformertOmSøknaden?: boolean;
    erForSyk?: boolean;
    erMorUfør?: boolean;
    erAleneOmOmsorg: boolean;
    datoForAleneomsorg?: string;
}

export type AnnenForelderIkkeOppgitt = Common;

export type AnnenForelder = AnnenForelderIkkeOppgitt | AnnenForelderOppgitt;

export const isAnnenForelderOppgitt = (annenForelder: AnnenForelder): annenForelder is AnnenForelderOppgitt => {
    return annenForelder.kanIkkeOppgis === false;
};

export const isAnnenForelderIkkeOppgitt = (annenForelder: AnnenForelder): annenForelder is AnnenForelderIkkeOppgitt => {
    return annenForelder.kanIkkeOppgis === true;
};

export const isAnnenForelderOppgittNorsk = (annenForelder: AnnenForelder): annenForelder is AnnenForelderOppgitt => {
    return isAnnenForelderOppgitt(annenForelder) && !annenForelder.utenlandskFnr;
};

export const isAnnenforelderOppholdtSegIEØS = (annenForelder: AnnenForelder): annenForelder is AnnenForelderOppgitt => {
    return isAnnenForelderOppgitt(annenForelder) && annenForelder.harOppholdtSegIEØS === true;
};
