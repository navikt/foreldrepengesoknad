import { hasValue } from '@navikt/fp-common';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Situasjon } from 'app/types/Situasjon';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { SøkersituasjonFormData } from './søkersituasjonFormConfig';

export const mapSøkersituasjonFormDataToState = (formData: Partial<SøkersituasjonFormData>): Søkersituasjon => {
    return {
        situasjon: formData.situasjon as Situasjon,
        rolle: hasValue(formData.rolle) ? (formData.rolle as Søkerrolle) : 'far',
    };
};
