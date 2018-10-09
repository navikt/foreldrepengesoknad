import Søknad from '../../../types/søknad/Søknad';

export const utenlandsoppholdErGyldig = (søknad: Søknad): boolean => {
    const {
        iNorgeSiste12Mnd,
        iNorgeNeste12Mnd,
        tidligereOpphold,
        senereOpphold,
        fødselINorge
    } = søknad.informasjonOmUtenlandsopphold;
    return (
        (iNorgeSiste12Mnd === true || (iNorgeSiste12Mnd === false && tidligereOpphold.length > 0)) &&
        (iNorgeNeste12Mnd === true || (iNorgeNeste12Mnd === false && senereOpphold.length > 0)) &&
        fødselINorge !== undefined
    );
};
