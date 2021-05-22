import { hasValue } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Barn from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { AnnenForelderFormData, initialAnnenForelderValues } from './annenforelderFormConfig';

export const mapAnnenForelderFormToState = (values: Partial<AnnenForelderFormData>): AnnenForelder => {
    if (values.kanIkkeOppgis === false) {
        return {
            etternavn: values.etternavn!,
            fornavn: values.fornavn!,
            fnr: values.fnr!,
            bostedsland: hasValue(values.bostedsland) ? values.bostedsland : undefined,
            utenlandskFnr: hasValue(values.utenlandskFnr) ? values.utenlandskFnr : undefined,
            erUfør: convertYesOrNoOrUndefinedToBoolean(values.erMorUfør),
            kanIkkeOppgis: values.kanIkkeOppgis,
            harRettPåForeldrepenger: convertYesOrNoOrUndefinedToBoolean(values.harRettPåForeldrepenger),
            erInformertOmSøknaden: convertYesOrNoOrUndefinedToBoolean(values.erInformertOmSøknaden),
        };
    }

    return {
        kanIkkeOppgis: true,
    };
};

export const getAnnenForelderFormInitialValues = (
    annenForelder: AnnenForelder,
    barn: Barn,
    søker: Søker
): AnnenForelderFormData => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        return {
            ...initialAnnenForelderValues,
            harRettPåForeldrepenger: convertBooleanOrUndefinedToYesOrNo(annenForelder.harRettPåForeldrepenger),
            bostedsland: annenForelder.bostedsland || '',
            erInformertOmSøknaden: convertBooleanOrUndefinedToYesOrNo(annenForelder.erInformertOmSøknaden),
            erMorUfør: convertBooleanOrUndefinedToYesOrNo(annenForelder.erUfør),
            etternavn: annenForelder.etternavn,
            fornavn: annenForelder.fornavn,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
            fnr: annenForelder.fnr,
            aleneOmOmsorg: convertBooleanOrUndefinedToYesOrNo(søker.erAleneOmOmsorg),
            utenlandskFnr: annenForelder.utenlandskFnr || false,
        };
    }

    if (isAnnenForelderIkkeOppgitt(annenForelder)) {
        return {
            ...initialAnnenForelderValues,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
        };
    }

    return {
        ...initialAnnenForelderValues,
    };
};
