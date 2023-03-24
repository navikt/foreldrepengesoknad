import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const cleanupSøkersituasjon = (formData: SøkersituasjonFormData): SøkersituasjonFormData => {
    const cleanedData: Partial<SøkersituasjonFormData> = {};
    cleanedData.situasjon = formData.situasjon;

    return cleanedData as SøkersituasjonFormData;
};
