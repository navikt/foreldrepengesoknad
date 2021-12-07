import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { PeriodeUttakFormData } from 'uttaksplan/components/uttaks-forms/periode-uttak-form/periodeUttakFormConfig';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const aktivitetskravMorSkalBesvares = (
    formValues: PeriodeUttakFormData,
    periodetype: Periodetype,
    kontotype: StønadskontoType,
    søkerErMor: boolean,
    erAleneOmOmsorg: boolean,
    annenForelderKanIkkeOppgis: boolean,
    søkerHarMidlertidigOmsorg: boolean
): boolean => {
    if (
        søkerErMor ||
        erAleneOmOmsorg ||
        periodetype !== Periodetype.Uttak ||
        annenForelderKanIkkeOppgis ||
        søkerHarMidlertidigOmsorg
    ) {
        return false;
    }

    if (
        !erAleneOmOmsorg &&
        (kontotype === StønadskontoType.Fellesperiode || kontotype === StønadskontoType.Foreldrepenger)
    ) {
        if (
            convertYesOrNoOrUndefinedToBoolean(formValues.ønskerFlerbarnsdager) ||
            convertYesOrNoOrUndefinedToBoolean(formValues.samtidigUttak) ||
            (convertYesOrNoOrUndefinedToBoolean(formValues.erMorForSyk) && kontotype === StønadskontoType.Fellesperiode)
        ) {
            return false;
        }

        return true;
    }

    return false;
};
