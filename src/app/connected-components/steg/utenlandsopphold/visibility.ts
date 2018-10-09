import InformasjonOmUtenlandsopphold from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { Barn } from '../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const harBoddINorgeSiste12MndContentVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>
): boolean => informasjonOmUtenlandsopphold.iNorgeSiste12Mnd === false;

const skalBoINorgeNeste12MndBlockVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>
): boolean => informasjonOmUtenlandsopphold.iNorgeSiste12Mnd !== undefined;

const skalBoINorgeNeste12MndContentVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>
): boolean => informasjonOmUtenlandsopphold.iNorgeNeste12Mnd === false;

const skalBarnetBliFødtINorgeVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>,
    barn: Partial<Barn>
): boolean => {
    return (
        skalBoINorgeNeste12MndBlockVisible(informasjonOmUtenlandsopphold) &&
        informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !== undefined &&
        barn.erBarnetFødt === false
    );
};

const bleBarnetFødtINorgeVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>,
    barn: Partial<Barn>,
    situasjon: Søkersituasjon
): boolean => {
    return (
        skalBoINorgeNeste12MndBlockVisible(informasjonOmUtenlandsopphold) &&
        informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !== undefined &&
        (barn.erBarnetFødt === true || situasjon === Søkersituasjon.ADOPSJON)
    );
};

export default {
    harBoddINorgeSiste12MndContent: harBoddINorgeSiste12MndContentVisible,
    skalBoINorgeNeste12MndContent: skalBoINorgeNeste12MndContentVisible,
    skalBoINorgeNeste12MndBlock: skalBoINorgeNeste12MndBlockVisible,
    skalBarnetBliFødtINorge: skalBarnetBliFødtINorgeVisible,
    bleBarnetFødtINorge: bleBarnetFødtINorgeVisible
};
