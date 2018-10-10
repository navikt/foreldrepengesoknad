import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import { Barn } from '../../../types/søknad/Barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';

const oppholdErOk = (boddINorge: boolean | undefined, opphold: Utenlandsopphold[] | undefined): boolean => {
    if (boddINorge !== false) {
        return boddINorge !== undefined;
    }
    return opphold !== undefined && opphold.length > 0;
};

const harBoddINorgeSiste12MndContentVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>
): boolean => informasjonOmUtenlandsopphold.iNorgeSiste12Mnd === false;

const skalBoINorgeNeste12MndBlockVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>
): boolean => {
    return oppholdErOk(informasjonOmUtenlandsopphold.iNorgeSiste12Mnd, informasjonOmUtenlandsopphold.tidligereOpphold);
};

const skalBoINorgeNeste12MndContentVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>
): boolean => informasjonOmUtenlandsopphold.iNorgeNeste12Mnd === false;

const skalVæreINorgeVedFødselVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>,
    barn: Partial<Barn>
): boolean => {
    return (
        skalBoINorgeNeste12MndBlockVisible(informasjonOmUtenlandsopphold) &&
        oppholdErOk(informasjonOmUtenlandsopphold.iNorgeNeste12Mnd, informasjonOmUtenlandsopphold.senereOpphold) &&
        barn.erBarnetFødt === false
    );
};

const varDuINorgeDaBarnetBleFødtVisible = (
    informasjonOmUtenlandsopphold: Partial<InformasjonOmUtenlandsopphold>,
    barn: Partial<Barn>
): boolean => {
    return (
        skalBoINorgeNeste12MndBlockVisible(informasjonOmUtenlandsopphold) &&
        informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !== undefined &&
        barn.erBarnetFødt === true
    );
};

const befinnerDuDegINorgePåDatoForOmsorgsovertakelseVisible = (søkersituasjon: Søkersituasjon) => {
    return søkersituasjon === Søkersituasjon.ADOPSJON;
};

export default {
    harBoddINorgeSiste12MndContent: harBoddINorgeSiste12MndContentVisible,
    skalBoINorgeNeste12MndContent: skalBoINorgeNeste12MndContentVisible,
    skalBoINorgeNeste12MndBlock: skalBoINorgeNeste12MndBlockVisible,
    skalVæreINorgeVedFødsel: skalVæreINorgeVedFødselVisible,
    varDuINorgeDaBarnetBleFødt: varDuINorgeDaBarnetBleFødtVisible,
    befinnerDuDegINorgePåDatoForOmsorgsovertakelse: befinnerDuDegINorgePåDatoForOmsorgsovertakelseVisible
};
