import dayjs from 'dayjs';

import {
    Periodetype,
    Situasjon,
    StønadskontoType,
    TidsperiodeDate,
    getSisteUttaksdag6UkerEtterFødsel,
} from '@navikt/fp-common';
import { Stønadskonto } from '@navikt/fp-types';

import kontoSkalBesvares from './kontoSkalBesvarer';
import uttakRundtFødselÅrsakSpørsmålSkalBesvares from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

export const farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    konto: StønadskontoType | undefined,
    erMorForSyk: boolean | undefined,
    tidsperiode: TidsperiodeDate,
    situasjon: Situasjon,
) => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(famDato);
    return (
        erFarEllerMedmor &&
        konto === StønadskontoType.Foreldrepenger &&
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
    kontotype: StønadskontoType | undefined,
    søkerErMor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    søkerHarMidlertidigOmsorg: boolean, //TODO: Denne brukes vel ikke lenger og kan fjernes?
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon,
    stønadskontoer: Stønadskonto[],
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
            kontotype as StønadskontoType,
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

    if (
        !erAleneOmOmsorg &&
        (kontotype === StønadskontoType.Fellesperiode || kontotype === StønadskontoType.Foreldrepenger)
    ) {
        if (ønskerFlerbarnsdager || samtidigUttak || (erMorForSyk && kontotype === StønadskontoType.Fellesperiode)) {
            return false;
        }

        return true;
    }

    return false;
};
