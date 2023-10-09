import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from 'app/utils/wlbUtils';
import { Periodetype } from 'types/Periode';
import { StønadskontoType } from 'types/StønadskontoType';

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
