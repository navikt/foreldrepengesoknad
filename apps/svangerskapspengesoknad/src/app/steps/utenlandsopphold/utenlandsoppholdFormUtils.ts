import InformasjonOmUtenlandsopphold from 'app/types/InformasjonOmUtenlandsopphold';
import { UtenlandsoppholdFormData, initialUtenlandsoppholdFormData } from './utenlandsoppholdFormTypes';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';

export const getInitialUtenlandsoppholdValuesFromState = (
    init: InformasjonOmUtenlandsopphold,
): UtenlandsoppholdFormData => {
    return {
        ...initialUtenlandsoppholdFormData,
        harBoddINorgeSiste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeSiste12Mnd),
        skalBoINorgeNeste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeNeste12Mnd),
    };
};

export const mapUtenlandsoppholdFormDataToState = (
    formValues: Partial<UtenlandsoppholdFormData>,
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold,
): InformasjonOmUtenlandsopphold => {
    const { harBoddINorgeSiste12Mnd, skalBoINorgeNeste12Mnd } = formValues;
    return {
        ...informasjonOmUtenlandsopphold,
        iNorgeSiste12Mnd: convertYesOrNoOrUndefinedToBoolean(harBoddINorgeSiste12Mnd)!,
        iNorgeNeste12Mnd: convertYesOrNoOrUndefinedToBoolean(skalBoINorgeNeste12Mnd)!,
    };
};
