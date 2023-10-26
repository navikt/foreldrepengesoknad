import { isISODateString } from '@navikt/ds-datepicker';
import { date1YearAgo, date1YearFromNow, formatDate, intlUtils } from '@navikt/fp-common';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import { UtenlandsoppholdInput } from 'app/types/InformasjonOmUtenlandsopphold';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validerDatoOverlapperAndreUtenlandsperioder = (
    utenlandsperioder: UtenlandsoppholdInput[] | undefined,
    dato: string | undefined,
    intl: IntlShape,
    currentOppholdIndex: number,
    isFraOgMedDato: boolean,
): string | undefined => {
    if (!hasValue(dato) || !utenlandsperioder) {
        return undefined;
    }
    const utenlandsperioderMedDatoer = utenlandsperioder.filter((p) => p.fom && p.tom);
    const overlappendePerioderLagtTilFørDennePerioden = utenlandsperioderMedDatoer.filter(
        (tp, index) => dayjs(dato).isBetween(tp.fom, tp.tom, 'day', '[]') && index < currentOppholdIndex,
    );
    if (overlappendePerioderLagtTilFørDennePerioden.length > 0) {
        const fomOrTom = isFraOgMedDato ? 'fraOgMed' : 'tilOgMed';
        return intlUtils(intl, `valideringsfeil.utenlandsopphold.overlapper.${fomOrTom}`, {
            land: getCountryName(overlappendePerioderLagtTilFørDennePerioden[0].land, intl.locale),
            fom: formatDate(overlappendePerioderLagtTilFørDennePerioden[0].fom),
            tom: formatDate(overlappendePerioderLagtTilFørDennePerioden[0].tom),
        });
    }

    return undefined;
};

export const validateBostedUtlandFom =
    (oppgirIFortid: boolean, intl: IntlShape, alleOpphold: UtenlandsoppholdInput[] | undefined, index: number) =>
    (fom: string) => {
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fraOgMedDato.påkrevd');
        }
        if (hasValue(fom) && !isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fraOgMedDato.gyldigDato');
        }

        if (oppgirIFortid && fom && dayjs(fom).isAfter(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.etterDagensDato');
        }

        if (!oppgirIFortid && fom && dayjs(fom).isBefore(dayjs(), 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.førDagensDato');
        }

        if (!oppgirIFortid && hasValue(fom) && dayjs(fom).isAfter(date1YearFromNow, 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.fom.merEnn1ÅrFremITid');
        }

        return validerDatoOverlapperAndreUtenlandsperioder(alleOpphold, fom, intl, index, true);
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
        if (tom && fom && dayjs(fom).isSame(tom, 'day')) {
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
        if (oppgirIFortid && hasValue(tom) && dayjs(tom).isBefore(date1YearAgo, 'day')) {
            return intlUtils(intl, 'valideringsfeil.bostedUtland.tom.merEnn1ÅrSiden');
        }

        return validerDatoOverlapperAndreUtenlandsperioder(alleOpphold, tom, intl, index, false);
    };

export const validateBostedUtlandLand = (intl: IntlShape) => (land: string) => {
    if (!hasValue(land)) {
        return intlUtils(intl, 'valideringsfeil.land.påkrevd');
    }

    return undefined;
};
