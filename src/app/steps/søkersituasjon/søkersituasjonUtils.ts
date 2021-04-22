import SøkersituasjonState from 'app/context/types/SøkersituasjonState';
import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const mapSøkersituasjonFormDataToState = (formData: SøkersituasjonFormData): SøkersituasjonState => {
    const mappedData: Partial<SøkersituasjonState> = {};

    mappedData.situasjon = formData.situasjon;
    mappedData.rolle = formData.rolle;

    return mappedData as SøkersituasjonState;
};
