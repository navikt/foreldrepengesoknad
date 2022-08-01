import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { getSisteUttaksdag6UkerEtterFødsel } from 'app/utils/wlbUtils';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';
import kontoSkalBesvares from './kontoSkalBesvarer';
import uttakRundtFødselÅrsakSpørsmålSkalBesvares from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

export const farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk = (
    famDato: Date,
    erFarEllerMedmor: boolean,
    konto: StønadskontoType | undefined,
    erMorForSyk: boolean | undefined,
    tidsperiode: TidsperiodeDate,
    situasjon: Situasjon
) => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(famDato);
    return (
        erFarEllerMedmor &&
        konto === StønadskontoType.Foreldrepenger &&
        erMorForSyk === false &&
        situasjon === 'fødsel' &&
        dayjs(tidsperiode.fom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel)
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
    søkerHarMidlertidigOmsorg: boolean,
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    erFlerbarnssøknad: boolean,
    termindato: Date | undefined,
    situasjon: Situasjon,
    stønadskontoer: StønadskontoUttak[],
    bareFarMedmorHarRett: boolean
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
            erFlerbarnssøknad,
            erAleneOmOmsorg,
            annenForelderKanIkkeOppgis,
            ønskerFlerbarnsdager,
            søkerHarMidlertidigOmsorg,
            familiehendelsesdato,
            termindato,
            situasjon,
            bareFarMedmorHarRett
        ) ||
        !kontoSkalBesvares(periodetype, tidsperiode, stønadskontoer, familiehendelsesdato, !søkerErMor) ||
        farMedmorBrukerForeldrepengerMedAktivitetskravRundtFødselOgMorIkkeErSyk(
            familiehendelsesdato,
            !søkerErMor,
            kontotype,
            erMorForSyk,
            tidsperiode,
            situasjon
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
