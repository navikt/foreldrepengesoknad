import { hasValue } from '@navikt/fp-common';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const mapSøkersituasjonFormDataToState = (formData: Partial<SøkersituasjonFormData>): Søkersituasjon => {
    return {
        situasjon: formData.situasjon!,
        rolle: hasValue(formData.rolle) ? formData.rolle! : 'far',
    };
};
