import { IntlShape } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { BostedUtlandSubformData, initialBostedUtlandFormData } from './bostedUtlandSubformTypes';
import { date1YearAgo, date1YearFromNow, formatDate, intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { BostedUtland } from 'app/types/BostedUtland';
import { hasValue } from 'app/utils/validationUtils';

export const mapBostedUtland = (formValues: Partial<BostedUtlandSubformData>, id: number): BostedUtland => {
    return {
        id: id,
        landkode: formValues.land!,
        fom: formValues.fom!,
        tom: formValues.tom!,
    };
};

export const validerOverlappendeUtenlandsperioder = (
    utenlandsperioder: BostedUtland[],
    fom: string | undefined,
    tom: string | undefined,
    intl: IntlShape,
    currentOppholdId: number | undefined
): string | undefined => {
    if (!hasValue(fom) || !hasValue(tom)) {
        return undefined;
    }
    const overlappendePerioder = utenlandsperioder.filter(
        (tp) =>
            (dayjs(fom).isBetween(tp.fom, tp.tom, 'day', '[]') ||
                dayjs(tom).isBetween(tp.fom, tp.tom, 'day', '[]') ||
                dayjs(tp.fom).isBetween(fom, tom, 'day', '[]') ||
                dayjs(tp.tom).isBetween(fom, tom, 'day', '[]')) &&
            currentOppholdId !== tp.id
    );
    if (overlappendePerioder.length > 0) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.overlapper', {
            land: getCountryName(overlappendePerioder[0].landkode, intl.locale),
            fom: formatDate(overlappendePerioder[0].fom),
            tom: formatDate(overlappendePerioder[0].tom),
        });
    }

    return undefined;
};

export const validateBostedUtlandFom =
    (tom: string | undefined, oppgirIFortid: boolean, intl: IntlShape) => (fom: string) => {
        if (tom && fom && dayjs(tom).isSame(fom)) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.fom.sammeSomTom');
        }

        if (tom && dayjs(fom).isAfter(tom, 'day')) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.fom.etterTom');
        }

        if (oppgirIFortid && fom && dayjs(fom).isAfter(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.fom.etterDagensDato');
        }

        if (!oppgirIFortid && fom && dayjs(fom).isBefore(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.fom.førDagensDato');
        }

        if (!oppgirIFortid && hasValue(fom) && dayjs(fom).isAfter(date1YearFromNow)) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.fom.merEnn1ÅrFremITid');
        }

        return undefined;
    };

export const validateBostedUtlandTom =
    (fom: string | undefined, oppgirIFortid: boolean, intl: IntlShape) => (tom: string) => {
        if (tom && fom && dayjs(fom).isSame(tom)) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.tom.sammeSomFom');
        }

        if (tom && dayjs(fom).isAfter(tom, 'day')) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.tom.førFom');
        }

        if (oppgirIFortid && tom && dayjs(tom).isAfter(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.tom.etterDagensDato');
        }

        if (!oppgirIFortid && tom && dayjs(tom).isBefore(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.tom.førDagensDato');
        }
        if (oppgirIFortid && hasValue(tom) && dayjs(tom).isBefore(date1YearAgo)) {
            return intlUtils(intl, 'valideringsfeil.utenlandsopphold.tom.merEnn1ÅrSiden');
        }

        return undefined;
    };

export const getInitialOppholdFormData = (selectedOpphold: BostedUtland | undefined) => {
    if (selectedOpphold === undefined) {
        return { ...initialBostedUtlandFormData };
    }
    return {
        ...initialBostedUtlandFormData,
        fom: selectedOpphold.fom,
        tom: selectedOpphold.tom,
        land: selectedOpphold.landkode,
    };
};
