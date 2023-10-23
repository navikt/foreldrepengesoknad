import { Situasjon, Søkerrolle, Søkersituasjon, hasValue } from '@navikt/fp-common';
import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const mapSøkersituasjonFormDataToState = (formData: Partial<SøkersituasjonFormData>): Søkersituasjon => {
    return {
        situasjon: formData.situasjon as Situasjon,
        rolle: hasValue(formData.rolle) ? (formData.rolle as Søkerrolle) : 'far',
    };
};
