import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const mapSøkersituasjonFormDataToState = (formData: SøkersituasjonFormData): Søkersituasjon => {
    return {
        situasjon: formData.situasjon!,
        rolle: formData.rolle ? formData.rolle : 'far',
    };
};
