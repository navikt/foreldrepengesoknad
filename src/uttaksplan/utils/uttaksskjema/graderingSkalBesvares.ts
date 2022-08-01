import { TidsperiodeDate } from '@navikt/fp-common';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { getSisteUttaksdag6UkerEtterFødsel } from 'app/utils/wlbUtils';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const graderingSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    erFarMedmor: boolean,
    morErForSyk: boolean | undefined,
    tidsperiode: TidsperiodeDate
): boolean => {
    const farMedmorSøkerDeFørsteSeksUkeneFørWLBOgMorErIkkeSyk =
        !andreAugust2022ReglerGjelder(familiehendelsesdato) && erFarMedmor && morErForSyk === false;

    const sisteUttaksdagInnenSeksUkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);
    const bareFarHarRettSøkerAktivitetsKravKontoDeFørsteSeksUkeneOgMorErIkkeSyk =
        erFarMedmor &&
        konto === StønadskontoType.Foreldrepenger &&
        morErForSyk === false &&
        dayjs(tidsperiode.fom).isSameOrBefore(sisteUttaksdagInnenSeksUkerEtterFødsel, 'day');
    if (
        periodetype === Periodetype.Uttak &&
        konto !== StønadskontoType.ForeldrepengerFørFødsel &&
        !farMedmorSøkerDeFørsteSeksUkeneFørWLBOgMorErIkkeSyk &&
        !bareFarHarRettSøkerAktivitetsKravKontoDeFørsteSeksUkeneOgMorErIkkeSyk
    ) {
        return true;
    }
    return false;
};
