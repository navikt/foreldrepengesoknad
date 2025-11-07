import dayjs from 'dayjs';

import { Periodetype, Situasjon, TidsperiodeDate } from '@navikt/fp-common';
import { KontoDto, KontoTypeUttak } from '@navikt/fp-types';

import { getSisteUttaksdag6UkerEtterFødsel } from '../../utils/wlbUtils';
import kontoSkalBesvares from './kontoSkalBesvarer';
import { uttakRundtFødselÅrsakSpørsmålSkalBesvares } from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

export const farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    konto: KontoTypeUttak | undefined,
    erMorForSyk: boolean | undefined,
    tidsperiode: TidsperiodeDate,
    situasjon: Situasjon,
) => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(famDato);
    return (
        erFarEllerMedmor &&
        konto === 'FORELDREPENGER' &&
        erMorForSyk === false &&
        situasjon === 'fødsel' &&
        dayjs(tidsperiode.fom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel, 'day')
    );
};

export const aktivitetskravMorSkalBesvares = (
    ønskerFlerbarnsdager: boolean | undefined,
    samtidigUttak: boolean | undefined,
    erMorForSyk: boolean | undefined,
    periodetype: Periodetype,
    kontotype: KontoTypeUttak | undefined,
    søkerErMor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    søkerHarMidlertidigOmsorg: boolean, //TODO: Denne brukes vel ikke lenger og kan fjernes?
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    stønadskontoer: KontoDto[],
    bareFarMedmorHarRett: boolean,
): boolean => {
    if (
        søkerErMor ||
        erAleneOmOmsorg ||
        periodetype !== Periodetype.Uttak ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg ||
        uttakRundtFødselÅrsakSpørsmålSkalBesvares(
            periodetype,
            kontotype as KontoTypeUttak,
            tidsperiode,
            !søkerErMor,
            erAleneOmOmsorg,
            annenForelderKanIkkeOppgis,
            søkerHarMidlertidigOmsorg,
            familiehendelsesdato,
            termindato,
            situasjon,
            bareFarMedmorHarRett,
        ) ||
        !kontoSkalBesvares(periodetype, tidsperiode, stønadskontoer, familiehendelsesdato, !søkerErMor) ||
        farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk(
            familiehendelsesdato,
            !søkerErMor,
            kontotype,
            erMorForSyk,
            tidsperiode,
            situasjon,
        )
    ) {
        return false;
    }

    if (!erAleneOmOmsorg && (kontotype === 'FELLESPERIODE' || kontotype === 'FORELDREPENGER')) {
        if (ønskerFlerbarnsdager || samtidigUttak || (erMorForSyk && kontotype === 'FELLESPERIODE')) {
            return false;
        }

        return true;
    }

    return false;
};
