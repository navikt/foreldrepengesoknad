import { Periodetype, Situasjon, StønadskontoType, TidsperiodeDate } from '@navikt/fp-common';

import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from '../../utils/wlbUtils';

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
