import dayjs from 'dayjs';
import { Uttaksdagen } from './Uttaksdagen';
import uttaksConstants from 'app/constants';
import { DatepickerLimitations } from 'nav-datovelger';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

function sisteMuligePermisjonsdag(familiehendelsedato: Date): Date {
    const startDato = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(
        dayjs(startDato).add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'years').toDate()
    ).denneEllerNeste();
}

const konverterMinOgMaxDatoerTilString = (minDate: Date, maxDate: Date) => ({
    minDate: dateToISOString(minDate),
    maxDate: dateToISOString(maxDate),
});

const defaultPermisjonsperiodeAvgrensning = (familiehendelsesdato: Date): DatepickerLimitations => {
    const minDato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoFørTermin = (familiehendelsesdato: string): DatepickerLimitations => {
    const maksDato = Uttaksdagen(dayjs(familiehendelsesdato).toDate()).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoFørTerminForeldrepengerFørFødselKonto = (familiehendelsesdato: string): DatepickerLimitations => {
    const maksDato = Uttaksdagen(dayjs(familiehendelsesdato).toDate()).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const ekstrauttakFørFødsel = (familiehendelsesdato: string): DatepickerLimitations => {
    const sisteDagFørFødsel = Uttaksdagen(dayjs(familiehendelsesdato).toDate()).forrige();
    const minDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1
    );
    const maksDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1
    );
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonAleneomsorgFarMedmor = (
    datoForAleneomsorg: string,
    familiehendelsesdato: string
): DatepickerLimitations => {
    const minDato = Uttaksdagen(dayjs(datoForAleneomsorg).toDate()).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(dayjs(familiehendelsesdato).toDate());
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonAdopsjon = (familiehendelsesdato: string): DatepickerLimitations => {
    return defaultPermisjonsperiodeAvgrensning(dayjs(familiehendelsesdato).toDate());
};

const morsSisteUttaksdag = (familiehendelsesdato: string): DatepickerLimitations => {
    return defaultPermisjonsperiodeAvgrensning(dayjs(familiehendelsesdato).toDate());
};

const startdatoPermisjonFarMedmor = (familiehendelsesdato: string): DatepickerLimitations => {
    return defaultPermisjonsperiodeAvgrensning(dayjs(familiehendelsesdato).toDate());
};

export const uttaksplanDatoavgrensninger = {
    startdatoFørTermin,
    morsSisteUttaksdag,
    startdatoPermisjonFarMedmor,
    startdatoPermisjonAdopsjon,
    startdatoPermisjonAleneomsorgFarMedmor,
    startdatoFørTerminForeldrepengerFørFødselKonto,
    ekstrauttakFørFødsel,
};
