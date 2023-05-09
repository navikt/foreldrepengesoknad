import dayjs from 'dayjs';
import { Uttaksdagen } from './Uttaksdagen';
import uttaksConstants from 'app/constants';
import { andreAugust2022ReglerGjelder, dateToISOString } from 'app/utils/dateUtils';
import { Situasjon } from 'app/types/Situasjon';
import { getFørsteUttaksdag2UkerFørFødsel } from 'app/utils/wlbUtils';
import { DatepickerLimitations } from '@navikt/ds-datepicker';

function sisteMuligePermisjonsdag(familiehendelsedato: Date): Date {
    const startDato = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(
        dayjs.utc(startDato).add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'years').toDate()
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
    console.log('.................');
    console.log('familiehendelsesdato', familiehendelsesdato);
    const maksDato = Uttaksdagen(dayjs.utc(familiehendelsesdato).toDate()).forrige();
    console.log('maxdato', maksDato);
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    console.log('minDato', minDato);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoFørTerminForeldrepengerFørFødselKonto = (familiehendelsesdato: string): DatepickerLimitations => {
    const maksDato = Uttaksdagen(dayjs.utc(familiehendelsesdato).toDate()).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const ekstrauttakFørFødsel = (familiehendelsesdato: string): DatepickerLimitations => {
    const sisteDagFørFødsel = Uttaksdagen(dayjs.utc(familiehendelsesdato).toDate()).forrige();
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
    const minDato = Uttaksdagen(dayjs.utc(datoForAleneomsorg).toDate()).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(dayjs.utc(familiehendelsesdato).toDate());
    return {
        ...konverterMinOgMaxDatoerTilString(minDato, maksDato),
        weekendsNotSelectable: true,
    };
};

const startdatoPermisjonAdopsjon = (familiehendelsesdato: string): DatepickerLimitations => {
    return defaultPermisjonsperiodeAvgrensning(dayjs.utc(familiehendelsesdato).toDate());
};

const morsSisteUttaksdag = (familiehendelsesdato: string): DatepickerLimitations => {
    return defaultPermisjonsperiodeAvgrensning(dayjs.utc(familiehendelsesdato).toDate());
};

const startdatoPermisjonFarMedmor = (
    familiehendelsesdato: Date,
    termindato: Date | undefined,
    situasjon: Situasjon
): DatepickerLimitations => {
    const defaultAvgrensning = defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
    if (situasjon === 'fødsel' && andreAugust2022ReglerGjelder(familiehendelsesdato)) {
        return {
            ...defaultAvgrensning,
            minDate: dateToISOString(getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato)),
        };
    }
    return defaultAvgrensning;
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
