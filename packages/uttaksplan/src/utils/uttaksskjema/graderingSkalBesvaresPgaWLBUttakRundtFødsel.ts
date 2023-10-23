import {
    Periodetype,
    Situasjon,
    StønadskontoType,
    TidsperiodeDate,
    erFarMedmorSinWLBTidsperiodeRundtFødsel,
} from '@navikt/fp-common';

export const graderingSkalBesvaresPgaWLBUttakRundtFødsel = (
    tidperiode: TidsperiodeDate,
    periodetype: Periodetype,
    konto: StønadskontoType,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
): boolean => {
    return erFarMedmorSinWLBTidsperiodeRundtFødsel(
        tidperiode,
        familiehendelsesdato,
        periodetype,
        konto,
        erFarEllerMedmor,
        termindato,
        situasjon,
    );
};
