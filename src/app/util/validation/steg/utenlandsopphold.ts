import Søknad from '../../../types/søknad/Søknad';

export const utenlandsoppholdErGyldig = (søknad: Søknad): boolean => {
    const { informasjonOmUtenlandsopphold } = søknad;
    return (
        informasjonOmUtenlandsopphold.iNorgeSiste12Mnd === true ||
        (informasjonOmUtenlandsopphold.iNorgeSiste12Mnd === false &&
            informasjonOmUtenlandsopphold.tidligereOpphold.length > 0) ||
        (informasjonOmUtenlandsopphold.iNorgeNeste12Mnd === true ||
            (informasjonOmUtenlandsopphold.iNorgeNeste12Mnd === false &&
                informasjonOmUtenlandsopphold.senereOpphold.length > 0))
    );
};
