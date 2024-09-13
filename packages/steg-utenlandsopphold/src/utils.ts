import {
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdSenere,
    UtenlandsoppholdTidligere,
} from '@navikt/fp-types';

const mapBostedUtlandTilDTO = (utenlandsopphold: UtenlandsoppholdPeriode) => {
    return {
        land: utenlandsopphold.landkode,
        tidsperiode: {
            fom: utenlandsopphold.fom,
            tom: utenlandsopphold.tom,
        },
    };
};

export const mapUtenlandsOppholdForInnsending = (
    utenlandsopphold: Utenlandsopphold,
    senereUtenlandsopphold?: UtenlandsoppholdSenere,
    tidligereUtenlandsopphold?: UtenlandsoppholdTidligere,
) => {
    return {
        iNorgeSiste12Mnd: !utenlandsopphold.harBoddUtenforNorgeSiste12Mnd,
        iNorgeNeste12Mnd: !utenlandsopphold.skalBoUtenforNorgeNeste12Mnd,
        tidligereOpphold: (tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd ?? []).map(mapBostedUtlandTilDTO),
        senereOpphold: (senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd ?? []).map(mapBostedUtlandTilDTO),
    };
};
