import { isISODateString } from '@navikt/ds-datepicker';
import { SkjemaelementFeil, hasValue, intlUtils } from '@navikt/fp-common';
import Tilrettelegging, { Tilretteleggingstype } from 'app/types/Tilrettelegging';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { dagenFør, tiMånederSidenDato } from './dateUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { mapArbeidsforholdToVelgArbeidOptions } from 'app/steps/velgArbeidsforhold/velgArbeidFormUtils';
import { Søker } from 'app/types/Søker';

export const mapTilrettelegging = (
    tilrettelegging: Tilrettelegging[],
    valgtTilrettelegging: string[],
    søker: Søker,
    arbeidsforhold: Arbeidsforhold[],
    termindato: Date,
) => {
    const allTilretteleggingOptions = mapArbeidsforholdToVelgArbeidOptions(
        tilrettelegging,
        søker.harJobbetSomFrilans,
        søker.harJobbetSomSelvstendigNæringsdrivende,
        søker.frilansInformasjon,
        søker.selvstendigNæringsdrivendeInformasjon,
        arbeidsforhold,
        termindato,
    );
    const selectedTilrettelegging = allTilretteleggingOptions.filter((o) =>
        valgtTilrettelegging.find((t) => t === o.id),
    );
    return selectedTilrettelegging;
};

export const validateTilrettelagtArbeidFom =
    (intl: IntlShape, termindato: Date) =>
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
