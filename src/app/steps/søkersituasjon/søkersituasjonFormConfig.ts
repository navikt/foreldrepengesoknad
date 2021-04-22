import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum SøkersituasjonFormField {
    situasjon = 'situasjon',
    rolle = 'rolle',
}

export interface SøkersituasjonFormData {
    [SøkersituasjonFormField.situasjon]?: string;
    [SøkersituasjonFormField.rolle]?: 'K' | 'M';
}

export const initialSøkersituasjonValues: SøkersituasjonFormData = {
    [SøkersituasjonFormField.situasjon]: undefined,
    [SøkersituasjonFormField.situasjon]: undefined,
};

export const SøkersituasjonFormComponents = getTypedFormComponents<SøkersituasjonFormField, SøkersituasjonFormData>();
