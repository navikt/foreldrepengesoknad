import Søknad from '../../../types/søknad/Søknad';

export const utenlandsoppholdErGyldig = (søknad: Søknad): boolean => {
    const { informasjonOmUtenlandsopphold } = søknad;
    const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, tidligereOpphold, senereOpphold } = informasjonOmUtenlandsopphold;
    return (
        (iNorgeSiste12Mnd || (iNorgeSiste12Mnd === false && tidligereOpphold.length > 0)) &&
        (iNorgeNeste12Mnd || (iNorgeNeste12Mnd === false && senereOpphold.length > 0))
    );
};
