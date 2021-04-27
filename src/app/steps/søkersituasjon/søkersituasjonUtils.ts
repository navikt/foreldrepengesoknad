import SøkersituasjonState from 'app/context/types/SøkersituasjonState';
import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const mapSøkersituasjonFormDataToState = (formData: SøkersituasjonFormData): SøkersituasjonState => {
    return {
        situasjon: formData.situasjon!,
        rolle: formData.rolle!,
    };
};
