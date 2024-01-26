import { AnnenForelder, RegistrertAnnenForelder } from '@navikt/fp-common';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';

import { AnnenForelderFormData } from './AnnenForelderFormData';

export const mapAnnenForelderFormToState = (
    values: AnnenForelderFormData,
    skalOppgiPersonalia: boolean,
    annenForelderFraRegistrertBarn: RegistrertAnnenForelder | undefined,
): AnnenForelder => {
    if (values.kanIkkeOppgis === false) {
        const fornavn =
            skalOppgiPersonalia && annenForelderFraRegistrertBarn
                ? annenForelderFraRegistrertBarn.fornavn
                : values.fornavn;
        const etternavn =
            skalOppgiPersonalia && annenForelderFraRegistrertBarn
                ? annenForelderFraRegistrertBarn.etternavn
                : values.etternavn;
        const fnr =
            skalOppgiPersonalia && annenForelderFraRegistrertBarn ? annenForelderFraRegistrertBarn.fnr : values.fnr;
        return {
            fornavn: replaceInvisibleCharsWithSpace(fornavn),
            etternavn: replaceInvisibleCharsWithSpace(etternavn),
            fnr: replaceInvisibleCharsWithSpace(fnr.trim()),
            erAleneOmOmsorg: values.erAleneOmOmsorg,
            bostedsland: values.bostedsland,
            utenlandskFnr: values.utenlandskFnr,
            erMorUfør: values.erMorUfør,
            kanIkkeOppgis: values.kanIkkeOppgis,
            harRettPåForeldrepengerINorge: values.harRettPåForeldrepengerINorge,
            harOppholdtSegIEØS: values.harOppholdtSegIEØS,
            harRettPåForeldrepengerIEØS: values.harOppholdtSegIEØS ? values.harRettPåForeldrepengerIEØS : false,
            erInformertOmSøknaden: values.erInformertOmSøknaden,
            datoForAleneomsorg: values.datoForAleneomsorg,
        };
    }

    return {
        kanIkkeOppgis: true,
    };
};
