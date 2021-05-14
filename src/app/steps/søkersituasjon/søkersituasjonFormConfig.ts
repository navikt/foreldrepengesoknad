import { hasValue } from '@navikt/fp-common';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerrolle } from 'app/types/Søkerrolle';

export enum SøkersituasjonFormField {
    situasjon = 'situasjon',
    rolle = 'rolle',
}

export interface SøkersituasjonFormData {
    [SøkersituasjonFormField.situasjon]?: Situasjon;
    [SøkersituasjonFormField.rolle]?: Søkerrolle;
}

const initialSøkersituasjonValues: SøkersituasjonFormData = {
    [SøkersituasjonFormField.situasjon]: '',
    [SøkersituasjonFormField.situasjon]: '',
};

export const getInitialSøkerSituasjonValues = (stateValues: Søkersituasjon): SøkersituasjonFormData => {
    if (hasValue(stateValues.rolle) && hasValue(stateValues.situasjon)) {
        return {
            rolle: stateValues.rolle,
            situasjon: stateValues.situasjon,
        };
    }

    return initialSøkersituasjonValues;
};

export const SøkersituasjonFormComponents = getTypedFormComponents<
    SøkersituasjonFormField,
    SøkersituasjonFormData,
    string
>();
