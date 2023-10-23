import { Situasjon, Søkerrolle, Søkersituasjon, hasValue } from '@navikt/fp-common';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum SøkersituasjonFormField {
    situasjon = 'situasjon',
    rolle = 'rolle',
}

export interface SøkersituasjonFormData {
    [SøkersituasjonFormField.situasjon]: Situasjon | '';
    [SøkersituasjonFormField.rolle]: Søkerrolle | '';
}

const initialSøkersituasjonValues: SøkersituasjonFormData = {
    [SøkersituasjonFormField.situasjon]: '',
    [SøkersituasjonFormField.rolle]: '',
};

export const getInitialSøkerSituasjonValues = (stateValues: Søkersituasjon): SøkersituasjonFormData => {
    if (stateValues) {
        return {
            rolle: hasValue(stateValues.rolle) ? stateValues.rolle : initialSøkersituasjonValues.rolle,
            situasjon: hasValue(stateValues.situasjon) ? stateValues.situasjon : initialSøkersituasjonValues.situasjon,
        };
    }
    return initialSøkersituasjonValues;
};

export const SøkersituasjonFormComponents = getTypedFormComponents<SøkersituasjonFormField, SøkersituasjonFormData>();
