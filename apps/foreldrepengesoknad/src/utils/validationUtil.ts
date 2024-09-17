import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';
import { SkjemaelementFeil } from 'types/SkjemaelementFeil';

import { isFødselsnummerFormatValid, isSixteenOrOlder } from './validation/fødselsnummer';

dayjs.extend(minMax);

export const dateToday = dayjs().toDate();
export const date21DaysAgo = dayjs().subtract(21, 'days').startOf('day').toDate();
export const attenUkerTreDager = dayjs().add(18, 'week').add(3, 'day').startOf('day').toDate();

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

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

export const validateRequiredField = (value: any, label: string, intl: IntlShape): SkjemaelementFeil => {
    if (!hasValue(value) || (typeof value === 'string' && value.trim() === '')) {
        return intl.formatMessage({ id: 'valideringsfeil.inputfelt.required' }, { inputFeltLabel: label });
    }
    return undefined;
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
    return dayjs.max(dayjs().startOf('day'), uke22Pluss3.startOf('day'))!.isSame(dayjs().startOf('day'));
};

const textGyldigRegex =
    // eslint-disable-next-line no-misleading-character-class, max-len
    /[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*/g;

const textRegex =
    // eslint-disable-next-line no-misleading-character-class, max-len
    /^[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*$/;

export const getIllegalChars = (value: any): string => {
    const kunUgyldigeTegn = value.replace(textGyldigRegex, '');
    const ugyldigStringSet = new Set(kunUgyldigeTegn.split(''));
    return Array.from(ugyldigStringSet).join('');
};

export const getIllegalCharsErrorMessage = (value: any, feltNavn: string, intl: IntlShape): string => {
    const ugyldigeTegn = getIllegalChars(value).replace(/[\t]/g, 'Tabulatortegn');
    return intl.formatMessage(
        { id: 'valideringsfeil.fritekst.kanIkkeInneholdeTegn' },
        {
            feltNavn: feltNavn,
            ugyldigeTegn: ugyldigeTegn,
        },
    );
};

const validateTextHasLegalChars = (value: any): boolean => textRegex.test(value);

export const validateTextInputField = (value: any, feltNavn: string, intl: IntlShape): SkjemaelementFeil => {
    if (!validateTextHasLegalChars(value)) {
        return getIllegalCharsErrorMessage(value, feltNavn, intl);
    }
    return undefined;
};
