import dayjs from 'dayjs';

import { Periodetype, TidsperiodeDate } from '@navikt/fp-common';
import { KontoTypeUttak } from '@navikt/fp-types';

import { andreAugust2022ReglerGjelder } from '../../utils/dateUtils';
import { getSisteUttaksdag6UkerEtterFødsel } from '../../utils/wlbUtils';

export const graderingSkalBesvares = (
    periodetype: Periodetype,
    konto: KontoTypeUttak,
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
        konto === 'FORELDREPENGER' &&
        morErForSyk === false &&
        dayjs(tidsperiode.fom).isSameOrBefore(sisteUttaksdagInnenSeksUkerEtterFødsel, 'day');
    if (
        periodetype === Periodetype.Uttak &&
        konto !== 'FORELDREPENGER_FØR_FØDSEL' &&
        !farMedmorSøkerDeFørsteSeksUkeneFørWLBOgMorErIkkeSyk &&
        !bareFarHarRettSøkerAktivitetsKravKontoDeFørsteSeksUkeneOgMorErIkkeSyk
    ) {
        return true;
    }
    return false;
};
