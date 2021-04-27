import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import SøkersituasjonState from 'app/context/types/SøkersituasjonState';

export enum SøkersituasjonFormField {
    situasjon = 'situasjon',
    rolle = 'rolle',
}

export interface SøkersituasjonFormData {
    [SøkersituasjonFormField.situasjon]?: string;
    [SøkersituasjonFormField.rolle]?: string;
}

const initialSøkersituasjonValues: SøkersituasjonFormData = {
    [SøkersituasjonFormField.situasjon]: undefined,
    [SøkersituasjonFormField.situasjon]: undefined,
};

export const getInitialSøkerSituasjonValues = (stateValues: SøkersituasjonState): SøkersituasjonFormData => {
    if (stateValues.rolle !== undefined && stateValues.situasjon !== undefined) {
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
