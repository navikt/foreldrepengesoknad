import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const cleanupSøkersituasjon = (formData: SøkersituasjonFormData): SøkersituasjonFormData => {
    const cleanedData: Partial<SøkersituasjonFormData> = {};
    cleanedData.situasjon = formData.situasjon;

    return cleanedData as SøkersituasjonFormData;
};
/*
export const dataSøkersituasjonIsValid = (dataSøkersituasjo: SøkersituasjonFormData): boolean => {
    if (dataSøkersituasjo.situasjon === 'adopsjon') {
        return dataSøkersituasjo.situasjon !== undefined;
    }
    if (dataSøkersituasjo.situasjon === 'fødsel') {
        return dataSøkersituasjo.situasjon !== undefined;
    }
    return false;
};
*/
