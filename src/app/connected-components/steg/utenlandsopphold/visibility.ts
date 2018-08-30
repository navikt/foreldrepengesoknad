import VisibilityFunction from '../../../types/dom/Visibility';
import Søknad from '../../../types/søknad/Søknad';

const harBoddINorgeSiste12MndContentVisible: VisibilityFunction<Søknad> = (søknad: Søknad) => {
    const { informasjonOmUtenlandsopphold } = søknad;

    return informasjonOmUtenlandsopphold.iNorgeSiste12Mnd === false;
};

const skalBoINorgeNeste12MndContentVisible: VisibilityFunction<Søknad> = (søknad: Søknad) => {
    const { informasjonOmUtenlandsopphold } = søknad;

    return informasjonOmUtenlandsopphold.iNorgeNeste12Mnd === false;
};

const skalBoINorgeNeste12MndBlockVisible: VisibilityFunction<Søknad> = (søknad: Søknad) => {
    const { informasjonOmUtenlandsopphold } = søknad;

    return informasjonOmUtenlandsopphold.iNorgeSiste12Mnd !== undefined;
};

const væreINorgeVedFødselSpørsmålVisible: VisibilityFunction<Søknad> = (søknad: Søknad) => {
    const { informasjonOmUtenlandsopphold, barn } = søknad;

    return informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !== undefined && barn.erBarnetFødt === false;
};

export default {
    harBoddINorgeSiste12MndContent: harBoddINorgeSiste12MndContentVisible,
    skalBoINorgeNeste12MndContent: skalBoINorgeNeste12MndContentVisible,
    skalBoINorgeNeste12MndBlock: skalBoINorgeNeste12MndBlockVisible,
    væreINorgeVedFødselSpørsmål: væreINorgeVedFødselSpørsmålVisible
};
