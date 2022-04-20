import { ForeldrepengerFørFødselUttaksperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { PeriodeFørFødselFormData, PeriodeFørFødselFormField } from './periodeFørFødselFormConfig';

export const initialValues: PeriodeFørFødselFormData = {
    [PeriodeFørFødselFormField.fom]: undefined,
    [PeriodeFørFødselFormField.tom]: undefined,
    [PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin]: false,
};

export const getPeriodeFørFødselFormInitialValues = (
    periode: ForeldrepengerFørFødselUttaksperiode
): PeriodeFørFødselFormData => {
    return {
        ...initialValues,
        fom: periode.tidsperiode.fom,
        tom: periode.tidsperiode.tom,
        skalIkkeHaUttakFørTermin: periode.skalIkkeHaUttakFørTermin,
    };
};

export const mapPeriodeFørFødselFormToPeriode = (
    values: Partial<PeriodeFørFødselFormData>,
    periode: ForeldrepengerFørFødselUttaksperiode
): Periode => {
    return {
        type: Periodetype.Uttak,
        id: periode.id,
        forelder: periode.forelder,
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        tidsperiode: {
            fom: values.fom!,
            tom: values.tom!,
        },
        skalIkkeHaUttakFørTermin: !!values.skalIkkeHaUttakFørTermin,
    };
};
