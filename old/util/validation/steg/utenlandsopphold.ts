import InformasjonOmUtenlandsopphold from 'app/types/søknad/InformasjonOmUtenlandsopphold';

export const utenlandsoppholdErGyldig = (informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold): boolean => {
    const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, tidligereOpphold, senereOpphold } = informasjonOmUtenlandsopphold;
    return (
        (iNorgeSiste12Mnd || (iNorgeSiste12Mnd === false && tidligereOpphold.length > 0)) &&
        (iNorgeNeste12Mnd || (iNorgeNeste12Mnd === false && senereOpphold.length > 0))
    );
};
