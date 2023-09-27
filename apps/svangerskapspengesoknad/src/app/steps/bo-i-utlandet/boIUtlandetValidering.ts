import { isISODateString } from '@navikt/ds-datepicker';
import { date1YearAgo, date1YearFromNow, formatDate, intlUtils } from '@navikt/fp-common';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import { UtenlandsoppholdInput } from 'app/types/InformasjonOmUtenlandsopphold';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validerOverlappendeUtenlandsperioder = (
    utenlandsperioder: UtenlandsoppholdInput[] | undefined,
    fom: string | undefined,
    tom: string | undefined,
    intl: IntlShape,
    currentOppholdIndex: number | undefined,
): string | undefined => {
    if (!hasValue(fom) || !hasValue(tom) || !utenlandsperioder) {
        return undefined;
    }
    const utenlandsperioderMedDatoer = utenlandsperioder.filter((p) => p.fom && p.tom);
    const overlappendePerioder = utenlandsperioderMedDatoer.filter(
        (tp, index) =>
            (dayjs(fom).isBetween(tp.fom, tp.tom, 'day', '[]') ||
                dayjs(tom).isBetween(tp.fom, tp.tom, 'day', '[]') ||
                dayjs(tp.fom).isBetween(fom, tom, 'day', '[]') ||
                dayjs(tp.tom).isBetween(fom, tom, 'day', '[]')) &&
            currentOppholdIndex !== index,
    );
    if (overlappendePerioder.length > 0) {
        return intlUtils(intl, 'valideringsfeil.utenlandsopphold.overlapper', {
            land: getCountryName(overlappendePerioder[0].land, intl.locale),
            fom: formatDate(overlappendePerioder[0].fom),
            tom: formatDate(overlappendePerioder[0].tom),
        });
    }

    return undefined;
};

export const validateBostedUtlandFom =
    (
        tom: string | undefined,
        oppgirIFortid: boolean,
        intl: IntlShape,
        alleOpphold: UtenlandsoppholdInput[] | undefined,
        index: number,
    ) =>
    (fom: string) => {
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fraOgMedDato.påkrevd');
        }
        if (hasValue(fom) && !isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fraOgMedDato.gyldigDato');
        }

        if (tom && fom && dayjs(tom).isSame(fom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.sammeSomTom');
        }

        if (tom && dayjs(fom).isAfter(tom, 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.etterTom');
        }

        if (oppgirIFortid && fom && dayjs(fom).isAfter(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.etterDagensDato');
        }

        if (!oppgirIFortid && fom && dayjs(fom).isBefore(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.førDagensDato');
        }

        if (!oppgirIFortid && hasValue(fom) && dayjs(fom).isAfter(date1YearFromNow)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.merEnn1ÅrFremITid');
        }

        return validerOverlappendeUtenlandsperioder(alleOpphold, fom, tom, intl, index);
    };

export const validateBostedUtlandTom =
    (
        fom: string | undefined,
        oppgirIFortid: boolean,
        intl: IntlShape,
        alleOpphold: UtenlandsoppholdInput[] | undefined,
        index: number,
    ) =>
    (tom: string) => {
        if (!hasValue(tom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tilOgMedDato.påkrevd');
        }
        if (hasValue(tom) && !isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tilOgMedDato.gyldigDato');
        }
        if (tom && fom && dayjs(fom).isSame(tom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tom.sammeSomFom');
        }

        if (tom && dayjs(fom).isAfter(tom, 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tom.førFom');
        }

        if (oppgirIFortid && tom && dayjs(tom).isAfter(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tom.etterDagensDato');
        }

        if (!oppgirIFortid && tom && dayjs(tom).isBefore(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tom.førDagensDato');
        }
        if (oppgirIFortid && hasValue(tom) && dayjs(tom).isBefore(date1YearAgo)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tom.merEnn1ÅrSiden');
        }

        return validerOverlappendeUtenlandsperioder(alleOpphold, fom, tom, intl, index);
    };

export const validateBostedUtlandLand = (intl: IntlShape) => (land: string) => {
    if (!hasValue(land)) {
        return intlUtils(intl, 'valideringsfeil.land.påkrevd');
    }

    return undefined;
};
