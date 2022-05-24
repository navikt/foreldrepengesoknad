import { TidsperiodeDate } from '@navikt/fp-common';
import { erFarMedmorSinWLBPeriodeRundtFødsel } from 'app/utils/wlbUtils';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const graderingSkalBesvaresPgaWLBUttakRundtFødsel = (
    tidperiode: TidsperiodeDate,
    periodetype: Periodetype,
    konto: StønadskontoType,
    erSamtidigUttak: boolean,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date
): boolean => {
    return (
        erFarMedmorSinWLBPeriodeRundtFødsel(tidperiode, familiehendelsesdato, periodetype, konto, erFarEllerMedmor) &&
        erSamtidigUttak
    );
};
