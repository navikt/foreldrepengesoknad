import dayjs from 'dayjs';

const textRegex =
    // eslint-disable-next-line no-misleading-character-class
    /^[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*$/;
const textGyldigRegex =
    // eslint-disable-next-line no-misleading-character-class
    /[\u034f0-9a-zA-ZÁáĄąÂâĀāĂăßČčĆćÇçĎďĐđÐðĔĕÉéĘęĖėÈèËëÊêĒēĢģİiĮįÍíÎîÏïĪīĶķŁłŊŋŇňŃńŅņÑñÞþŠšŚśŞşŤťŦŧŢţŲųŪūÚúŮůÝýŽžŹźŻżÕõÔôÓóÖöÜüÄäŒœÆæØøÅå .'\-/\n\r%§\\!?@_()+:;,="&\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]*/g;

export const isEmpty = (text?: string | number | boolean | dayjs.Dayjs | null) =>
    text === null || text === undefined || text.toString().trim().length === 0;

export type FormValidationResult = string | null;

export const isRequired =
    (i18nText: string) =>
    (value?: string | number | boolean): FormValidationResult =>
        isEmpty(value) ? i18nText : null;

export const isEqualValue =
    (i18nText: string, value: string) =>
    (fieldValue?: string | number): FormValidationResult =>
        fieldValue !== value ? i18nText : null;

export const hasMinLength =
    (i18nText: string, length: number) =>
    (text: string): FormValidationResult =>
        isEmpty(text) || text.toString().trim().length >= length ? null : i18nText;
export const hasMaxLength =
    (i18nText: string, length: number) =>
    (text: string | number): FormValidationResult =>
        isEmpty(text) || text.toString().trim().length <= length ? null : i18nText;

const getIllegalChars = (value: string): string => {
    const kunUgyldigeTegn = value.replace(textGyldigRegex, '');
    const ugyldigStringSet = new Set(kunUgyldigeTegn.split(''));
    return Array.from(ugyldigStringSet).join('');
};
export const hasLegalChars =
    (getI18nText: (illigalChars: string) => string | null) =>
    (value: string): FormValidationResult =>
        textRegex.test(value) ? null : getI18nText(getIllegalChars(value));
