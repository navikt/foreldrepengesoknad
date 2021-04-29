import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import Søkersituasjon from 'app/context/types/Søkersituasjon';

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

export const getInitialSøkerSituasjonValues = (stateValues: Søkersituasjon): SøkersituasjonFormData => {
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
