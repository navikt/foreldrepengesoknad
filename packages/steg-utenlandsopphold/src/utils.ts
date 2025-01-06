import { Utenlandsopphold, UtenlandsoppholdPeriode } from '@navikt/fp-types';

const mapBostedUtlandTilDTO = (utenlandsopphold: UtenlandsoppholdPeriode) => {
    return {
        land: utenlandsopphold.landkode,
        tidsperiode: {
            fom: utenlandsopphold.fom,
            tom: utenlandsopphold.tom,
        },
    };
};

const testEndring = () => {
    return null;
};

export const mapUtenlandsOppholdForInnsending = (
    utenlandsopphold: Utenlandsopphold,
    senereUtenlandsopphold?: UtenlandsoppholdPeriode[],
    tidligereUtenlandsopphold?: UtenlandsoppholdPeriode[],
) => {
    return {
        iNorgeSiste12Mnd: !utenlandsopphold.harBoddUtenforNorgeSiste12Mnd,
        iNorgeNeste12Mnd: !utenlandsopphold.skalBoUtenforNorgeNeste12Mnd,
        tidligereOpphold: (tidligereUtenlandsopphold ?? []).map(mapBostedUtlandTilDTO),
        senereOpphold: (senereUtenlandsopphold ?? []).map(mapBostedUtlandTilDTO),
    };
};
