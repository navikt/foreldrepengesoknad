import { TidsperiodeDate } from '@navikt/fp-common';
import { Situasjon } from 'app/types/Situasjon';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import uttakRundtFødselÅrsakSpørsmålSkalBesvares from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';

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
    situasjon: Situasjon
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
