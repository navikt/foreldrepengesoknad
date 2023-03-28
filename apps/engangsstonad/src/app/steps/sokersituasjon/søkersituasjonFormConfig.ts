import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum SøkersituasjonFormField {
    situasjon = 'situasjon',
}

export interface SøkersituasjonFormData {
    [SøkersituasjonFormField.situasjon]?: string;
}

export const initialSøkersituasjonValues: SøkersituasjonFormData = {
    [SøkersituasjonFormField.situasjon]: undefined,
};

export const SøkersituasjonFormComponents = getTypedFormComponents<SøkersituasjonFormField, SøkersituasjonFormData>();
