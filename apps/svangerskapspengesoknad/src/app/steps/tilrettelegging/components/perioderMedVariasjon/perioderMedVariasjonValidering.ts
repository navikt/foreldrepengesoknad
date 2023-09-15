import { isISODateString } from '@navikt/ds-datepicker';
import { formatDate, intlUtils, isDateABeforeDateB } from '@navikt/fp-common';
import { PeriodeMedTilrettelegging } from 'app/types/Tilrettelegging';
import { getTidsperiode, overlapperTidsperioder } from 'app/utils/tidsperiodeUtils';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validatePeriodeFom =
    (intl: IntlShape, index: number, allePerioder: PeriodeMedTilrettelegging[] | undefined) => (fom: string) => {
        const tom = allePerioder && allePerioder.length > 0 ? allePerioder[index].tom : undefined;
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.påkrevd');
        }
        if (hasValue(fom) && !isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.gyldigDato');
        }

        if (hasValue(fom) && tom && isDateABeforeDateB(tom, fom)) {
            return intlUtils(intl, 'valideringsfeil.periode.fom.førTilDato');
        }

        return validateAtPeriodeIkkeOverlapper(fom, tom, allePerioder, index, intl);
    };

export const validatePeriodeTom =
    (
        intl: IntlShape,
        index: number,
        allePerioder: PeriodeMedTilrettelegging[] | undefined,
        treUkerFørFødselEllerTermin: Date
    ) =>
    (tom: string) => {
        const fom = allePerioder && allePerioder.length > 0 ? allePerioder[index].fom : undefined;

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
            !dayjs(tom).isSame(treUkerFørFødselEllerTermin, 'd')
        ) {
            return intlUtils(intl, 'valideringsfeil.periode.tom.sisteMåSluttetreUkerFørFødselEllerTermin', {
                dato: formatDate(treUkerFørFødselEllerTermin),
            });
        }

        return validateAtPeriodeIkkeOverlapper(fom, tom, allePerioder, index, intl);
    };

export const validateAtPeriodeIkkeOverlapper = (
    fom: string | undefined,
    tom: string | undefined,
    allePerioder: PeriodeMedTilrettelegging[] | undefined,
    index: number,
    intl: IntlShape
) => {
    if (hasValue(tom) && hasValue(fom) && allePerioder && allePerioder.length > 0) {
        const andrePerioder = allePerioder.filter((_p, i) => i !== index);
        const overlappendePerioder = andrePerioder.filter(
            (p) =>
                hasValue(p.fom) &&
                hasValue(p.tom) &&
                overlapperTidsperioder(getTidsperiode(fom!, tom!), getTidsperiode(p.fom, p.tom!))
        );
        if (overlappendePerioder.length > 0) {
            return intlUtils(intl, 'valideringsfeil.periode.overlapper', {
                fom: formatDate(overlappendePerioder[0].fom),
                tom: formatDate(overlappendePerioder[0].tom!),
            });
        }
    }
    return undefined;
};
