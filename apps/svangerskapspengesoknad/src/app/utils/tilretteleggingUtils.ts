import { isISODateString } from '@navikt/ds-datepicker';
import { SkjemaelementFeil, intlUtils } from '@navikt/fp-common';
import Tilrettelegging, { PeriodeMedVariasjon, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { dagenFør, tiMånederSidenDato } from './dateUtils';
import { hasValue } from './validationUtils';

export const getValgtTilrettelegging = (
    allTilretteleggingOptions: Tilrettelegging[],
    valgtTilrettelegging: string[],
) => {
    const selectedTilrettelegging = allTilretteleggingOptions.filter((o) =>
        valgtTilrettelegging.find((t) => t === o.id),
    );
    return selectedTilrettelegging;
};

export const validateTilrettelagtArbeidFom =
    (intl: IntlShape, sisteDagForSvangerskapspenger: Date, termindato: Date, erBarnetFødt: boolean) =>
    (fom: string): SkjemaelementFeil => {
        if (!hasValue(fom)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.mangler');
        }
        if (!isISODateString(fom)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.gyldigDato');
        }

        if (dayjs(fom).isBefore(tiMånederSidenDato(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.tiMndSidenTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(sisteDagForSvangerskapspenger), 'd')) {
            return erBarnetFødt
                ? intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørFødsel')
                : intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin');
        }
        if (dayjs(fom).isAfter(dagenFør(termindato), 'd')) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidFom.etterTermin');
        }
        return undefined;
    };

export const validateTilrettelagtArbeidType =
    (intl: IntlShape) =>
    (type: Tilretteleggingstype): SkjemaelementFeil => {
        if (!hasValue(type)) {
            return intlUtils(intl, 'valideringsfeil.tilrettelagtArbeidType.mangler');
        }
        return undefined;
    };

export const validateTilretteleggingPeriodetype =
    (intl: IntlShape) =>
    (type: Tilretteleggingstype): SkjemaelementFeil => {
        if (!hasValue(type)) {
            return intlUtils(intl, 'valideringsfeil.tilretteleggingPeriodeType.mangler');
        }
        return undefined;
    };

export const sorterPerioderMedVariasjon = (p1: PeriodeMedVariasjon, p2: PeriodeMedVariasjon) => {
    return dayjs(p1.fom).isBefore(p2.fom, 'day') ? -1 : 1;
};

// export const sorterPerioderMedVariasjon = (
//     p1: PeriodeMedVariasjon,
//     p2: PeriodeMedVariasjon,
//     familiehendelsesdato: string,
// ) => {
//     const p1Tom =
//         p1.tomType === TilOgMedDatoType.TRE_UKER_FØR_TERMIN
//             ? dagenFør3UkerFørFamiliehendelse(familiehendelsesdato)
//             : p1.tom;
//     const p2Tom =
//         p2.tomType === TilOgMedDatoType.TRE_UKER_FØR_TERMIN
//             ? dagenFør3UkerFørFamiliehendelse(familiehendelsesdato)
//             : p2.tom;

//     return dayjs(p1Fom).isBefore(p2Fom, 'day') ? -1 : 1;
// };
