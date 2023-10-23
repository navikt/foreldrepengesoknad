import {
    Periodetype,
    StønadskontoType,
    TidsperiodeDate,
    andreAugust2022ReglerGjelder,
    getSisteUttaksdag6UkerEtterFødsel,
} from '@navikt/fp-common';
import dayjs from 'dayjs';

export const graderingSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    erFarMedmor: boolean,
    morErForSyk: boolean | undefined,
    tidsperiode: TidsperiodeDate,
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
