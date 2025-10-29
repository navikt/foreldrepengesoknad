import { Periodetype, Situasjon, TidsperiodeDate } from '@navikt/fp-common';
import { KontoTypeUttak_fpoversikt } from '@navikt/fp-types';

import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from '../../utils/wlbUtils';

export const graderingSkalBesvaresPgaWLBUttakRundtFødsel = (
    tidperiode: TidsperiodeDate,
    periodetype: Periodetype,
    konto: KontoTypeUttak_fpoversikt,
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
