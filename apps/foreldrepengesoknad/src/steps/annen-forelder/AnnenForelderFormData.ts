import { AnnenForelder, AnnenForelderOppgitt } from '@navikt/fp-common';

export type AnnenForelderFormData = Partial<AnnenForelder>;

export const isAnnenForelderOppgittFormData = (
    annenForelder: AnnenForelderFormData,
): annenForelder is Partial<AnnenForelderOppgitt> => {
    if (annenForelder.kanIkkeOppgis === true) {
        return false;
    }
    return true;
};
