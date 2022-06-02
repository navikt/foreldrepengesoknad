import { TidsperiodeDate } from '@navikt/fp-common';
import { erFarMedmorSinWLBTidsperiodeRundtFødsel } from 'app/utils/wlbUtils';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const graderingSkalBesvaresPgaWLBUttakRundtFødsel = (
    tidperiode: TidsperiodeDate,
    periodetype: Periodetype,
    konto: StønadskontoType,
    erSamtidigUttak: boolean,
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    termindato: Date | undefined
): boolean => {
    return (
        erFarMedmorSinWLBTidsperiodeRundtFødsel(
            tidperiode,
            familiehendelsesdato,
            periodetype,
            konto,
            erFarEllerMedmor,
            termindato
        ) && erSamtidigUttak
    );
};
