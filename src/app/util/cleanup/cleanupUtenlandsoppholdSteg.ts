import visibility from '../../steg/utenlandsopphold/visibility';
import InformasjonOmUtenlandsopphold from '../../types/søknad/InformasjonOmUtenlandsopphold';

const cleanupUtenlandsOppholdSteg = (
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold
): InformasjonOmUtenlandsopphold => {
    if (!visibility.harBoddINorgeSiste12MndContent(informasjonOmUtenlandsopphold)) {
        informasjonOmUtenlandsopphold = {
            ...informasjonOmUtenlandsopphold,
            tidligereOpphold: []
        };
    }

    if (!visibility.skalBoINorgeNeste12MndContent(informasjonOmUtenlandsopphold)) {
        informasjonOmUtenlandsopphold = {
            ...informasjonOmUtenlandsopphold,
            senereOpphold: []
        };
    }

    return informasjonOmUtenlandsopphold;
};

export default cleanupUtenlandsOppholdSteg;
