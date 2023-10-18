import dayjs from 'dayjs';
import { PeriodeFørFødselFormData, PeriodeFørFødselFormField } from './periodeFørFødselFormConfig';
import {
    ForeldrepengerFørFødselUttaksperiode,
    Periode,
    Periodetype,
    StønadskontoType,
    Uttaksdagen,
    uttaksConstants,
} from '@navikt/fp-common';

export const initialValues: PeriodeFørFødselFormData = {
    [PeriodeFørFødselFormField.fom]: undefined,
    [PeriodeFørFødselFormField.tom]: undefined,
    [PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin]: false,
};

export const getPeriodeFørFødselFormInitialValues = (
    periode: ForeldrepengerFørFødselUttaksperiode,
    familiehendelsesdato: Date,
): PeriodeFørFødselFormData => {
    const sisteUttaksagFørFødsel = Uttaksdagen(dayjs(familiehendelsesdato).toDate()).forrige();
    const førsteUttaksdag3UkerFørFødsel = Uttaksdagen(sisteUttaksagFørFødsel).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1,
    );
    const fom = periode.tidsperiode.fom !== undefined ? periode.tidsperiode.fom : førsteUttaksdag3UkerFørFødsel;
    const tom = periode.tidsperiode.tom !== undefined ? periode.tidsperiode.tom : sisteUttaksagFørFødsel;
    return {
        ...initialValues,
        fom,
        tom,
        skalIkkeHaUttakFørTermin: periode.skalIkkeHaUttakFørTermin,
    };
};

export const mapPeriodeFørFødselFormToPeriode = (
    values: Partial<PeriodeFørFødselFormData>,
    periode: ForeldrepengerFørFødselUttaksperiode,
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
