import { isISODateString } from '@navikt/ds-datepicker';
import { formatDate, intlUtils, isDateABeforeDateB } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { PeriodeMedVariasjon, TilOgMedDatoType } from 'app/types/Tilrettelegging';
import { getTidsperiode, overlapperTidsperioder } from 'app/utils/tidsperiodeUtils';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validatePeriodeFom =
    (
        intl: IntlShape,
        index: number,
        allePerioder: PeriodeMedVariasjon[] | undefined,
        behovForTilretteleggingFom: string | undefined,
        treUkerFørFødselEllerTermin: Date,
        fødselsdato: Date | undefined,
    ) =>
    (fom: string) => {
        const tom = allePerioder && allePerioder.length > 0 ? allePerioder[index].tom : undefined;
        const tomType = allePerioder && allePerioder.length > 0 ? allePerioder[index].tomType : undefined;
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.påkrevd');
        }
        if (hasValue(fom) && !isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.gyldigDato');
        }

        if (hasValue(fom) && tom && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.førTilDato');
        }

        if (
            hasValue(fom) &&
            hasValue(behovForTilretteleggingFom) &&
            dayjs(fom).isBefore(dayjs(behovForTilretteleggingFom), 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.førBehovForTilretteleggingFom');
        }

        if (hasValue(fom) && dayjs(fom).isSameOrAfter(dayjs(treUkerFørFødselEllerTermin), 'd')) {
            return fødselsdato
                ? intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.fom.etterTreUkerFørTermin');
        }

        return validateAtPeriodeIkkeOverlapper(
            fom,
            tom,
            tomType,
            allePerioder,
            index,
            intl,
            treUkerFørFødselEllerTermin,
        );
    };

export const validatePeriodeTom =
    (
        intl: IntlShape,
        index: number,
        allePerioder: PeriodeMedVariasjon[] | undefined,
        treUkerFørFødselEllerTermin: Date,
        fødselsdato: Date | undefined,
    ) =>
    (tom: string) => {
        const fom = allePerioder && allePerioder.length > 0 ? allePerioder[index].fom : undefined;
        const tomType = allePerioder && allePerioder.length > 0 ? allePerioder[index].tomType : undefined;
        const dagenFørTreUkerFørTermin = dayjs(treUkerFørFødselEllerTermin).subtract(1, 'd').toDate();
        if (!hasValue(tom)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.påkrevd');
        }
        if (hasValue(tom) && !isISODateString(tom)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.gyldigDato');
        }

        if (hasValue(tom) && fom && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.etterTilDato');
        }

        if (
            allePerioder &&
            index === allePerioder.length - 1 &&
            hasValue(tom) &&
            !dayjs(tom).isSame(dagenFørTreUkerFørTermin, 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.sisteMåSluttetreUkerFørFødselEllerTermin', {
                dato: formatDate(dagenFørTreUkerFørTermin),
            });
        }

        if (hasValue(tom) && dayjs(tom).isSameOrAfter(dayjs(treUkerFørFødselEllerTermin), 'd')) {
            return fødselsdato
                ? intlUtils(intl, 'valideringsfeil.periode.tom.etterTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.periode.tom.etterTreUkerFørTermin');
        }

        return validateAtPeriodeIkkeOverlapper(
            fom,
            tom,
            tomType,
            allePerioder,
            index,
            intl,
            treUkerFørFødselEllerTermin,
        );
    };

export const validateAtPeriodeIkkeOverlapper = (
    fom: string | undefined,
    tom: string | undefined,
    tomType: TilOgMedDatoType | undefined,
    allePerioder: PeriodeMedVariasjon[] | undefined,
    index: number,
    intl: IntlShape,
    treUkerFørFødselEllerTermin: Date,
) => {
    if ((hasValue(tom) || hasValue(tomType)) && hasValue(fom) && allePerioder && allePerioder.length > 0) {
        const andrePerioder = allePerioder.filter((_p, i) => i !== index);
        const overlappendePerioder = andrePerioder.filter((p) => {
            let periodeTom = undefined;
            if (hasValue(p.tomType) && p.tomType === TilOgMedDatoType.TRE_UKER_FØR_TERMIN) {
                periodeTom = dateToISOString(treUkerFørFødselEllerTermin);
            }
            if (hasValue(p.tom)) {
                periodeTom = p.tom;
            }
            if (periodeTom) {
                return overlapperTidsperioder(
                    getTidsperiode(fom!, tom || dateToISOString(treUkerFørFødselEllerTermin)),
                    getTidsperiode(p.fom, periodeTom),
                );
            }
            return false;
        });
        if (overlappendePerioder.length > 0) {
            const tilOgMedDato = overlappendePerioder[0].tom
                ? overlappendePerioder[0].tom
                : treUkerFørFødselEllerTermin;
            return intlUtils(intl, 'valideringsfeil.periode.overlapper', {
                fom: formatDate(overlappendePerioder[0].fom),
                tom: formatDate(tilOgMedDato),
            });
        }
    }
    return undefined;
};
