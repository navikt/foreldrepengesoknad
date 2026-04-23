import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';
import { SkjemaelementFeil } from 'types/SkjemaelementFeil';

import { getIllegalChars, textRegex } from '@navikt/fp-validation';

import { isFødselsnummerFormatValid, isSixteenOrOlder } from './validation/fødselsnummer';

dayjs.extend(minMax);

export const dateToday = dayjs();
export const date21DaysAgo = dayjs().subtract(21, 'days').startOf('day');
export const attenUkerTreDager = dayjs().add(18, 'week').add(3, 'day').startOf('day');

export const validateFødselsnummer =
    (intl: IntlShape, søkersFødselsnummer: string, label: string, erUtenlandskFnr?: boolean) =>
    (fnr: string): string | undefined => {
        if (erUtenlandskFnr) {
            if (fnr === undefined || fnr.trim() === '') {
                return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.required' });
            }

            if (fnr.length > 50) {
                return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.fødselsnummerForLangt' });
            }

            return validateTextInputField(fnr, label, intl);
        }

        if (fnr === søkersFødselsnummer) {
            return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.ugyldigEgetFødselsnummer' });
        }

        const validFnrResult = isFødselsnummerFormatValid(fnr);

        if (!erUtenlandskFnr && !isSixteenOrOlder(fnr, validFnrResult) && validFnrResult === 'fnr') {
            return intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.underSeksten' });
        }

        return validFnrResult === 'fnr' || validFnrResult === 'dnr' || validFnrResult === 'hnr'
            ? undefined
            : intl.formatMessage({ id: 'valideringsfeil.fødselsnummer.ugyldigFødselsnummer' });
    };

export const erMindreEnn3UkerSiden = (dato: string) => {
    const terminDato = dayjs(dato);
    const datoFor3UkerSiden = dayjs().startOf('day').subtract(21, 'days');
    return dayjs.max(terminDato, datoFor3UkerSiden) === terminDato;
};

const ukerAaTrekkeFraTerminDato = 18;
const ekstraDagerAaTrekkeFraTerminDato = 3;
const dagerForTerminbekreftelse = ukerAaTrekkeFraTerminDato * 7 + ekstraDagerAaTrekkeFraTerminDato;

export const erIUke22Pluss3 = (dato: string) => {
    const terminDato = dayjs(dato);
    const uke22Pluss3 = terminDato.subtract(dagerForTerminbekreftelse, 'days');
    return dayjs.max(dayjs().startOf('day'), uke22Pluss3.startOf('day')).isSame(dayjs().startOf('day'));
};

export const validateTextInputField = (value: string, feltNavn: string, intl: IntlShape): SkjemaelementFeil => {
    if (!textRegex.test(value)) {
        const ugyldigeTegn = getIllegalChars(value).replaceAll('\t', 'Tabulatortegn');
        return intl.formatMessage(
            { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
            { feltNavn, ugyldigeTegn },
        );
    }
    return undefined;
};
