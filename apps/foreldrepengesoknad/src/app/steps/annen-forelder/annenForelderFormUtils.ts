import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { IntlShape } from 'react-intl';

import {
    AnnenForelder,
    Barn,
    RegistrertAnnenForelder,
    hasValue,
    intlUtils,
    isAnnenForelderOppgitt,
} from '@navikt/fp-common';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';

import SøkerData from 'app/context/types/SøkerData';

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
            fornavn: hasValue(fornavn) ? replaceInvisibleCharsWithSpace(fornavn) : undefined,
            etternavn: hasValue(etternavn) ? replaceInvisibleCharsWithSpace(etternavn) : undefined,
            fnr: hasValue(fnr) && fnr !== undefined ? replaceInvisibleCharsWithSpace(fnr.trim()) : undefined,
            bostedsland: values.bostedsland,
            utenlandskFnr: values.utenlandskFnr,
            erUfør: values.erMorUfør,
            kanIkkeOppgis: values.kanIkkeOppgis,
            harRettPåForeldrepengerINorge: values.harRettPåForeldrepengerINorge,
            harOppholdtSegIEØS: values.harOppholdtSegIEØS,
            harRettPåForeldrepengerIEØS: values.harOppholdtSegIEØS ? values.harRettPåForeldrepengerIEØS : false,
            erInformertOmSøknaden: values.erInformertOmSøknaden,
        };
    }

    return {
        kanIkkeOppgis: true,
    };
};

export const getAnnenForelderFormInitialValues = (
    barn: Barn,
    intl: IntlShape,
    annenForelder?: AnnenForelder,
    søkerData?: SøkerData,
): AnnenForelderFormData | undefined => {
    if (!annenForelder) {
        return undefined;
    }

    if (isAnnenForelderOppgitt(annenForelder)) {
        return {
            kanIkkeOppgis: false,
            fornavn: annenForelder.fornavn === intlUtils(intl, 'annen.forelder') ? '' : annenForelder.fornavn,
            etternavn: annenForelder.etternavn,
            fnr: annenForelder.fnr,
            bostedsland: annenForelder.bostedsland,
            erInformertOmSøknaden: annenForelder.erInformertOmSøknaden,
            harOppholdtSegIEØS: annenForelder.harOppholdtSegIEØS,
            harRettPåForeldrepengerIEØS: annenForelder.harRettPåForeldrepengerIEØS,
            harRettPåForeldrepengerINorge: annenForelder.harRettPåForeldrepengerINorge,
            erMorUfør: annenForelder.erUfør,
            dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg || [],
            aleneOmOmsorg: !!søkerData?.erAleneOmOmsorg,
            datoForAleneomsorg: dateToISOString(barn.datoForAleneomsorg) || '',
            utenlandskFnr: annenForelder.utenlandskFnr || false,
        };
    }

    return {
        kanIkkeOppgis: true,
    };
};
