import { usynligeCharsRegex } from 'app/validation/fieldValidations';
import { FagsakStatus } from '../types/søknad/Sak';

export const removeSpacesFromString = (value: string) => {
    return value.replace(/\s/g, '');
};

export const maxLengthIsGreaterThanOrEqualToStringLength = (maxLength: number, value: string) => {
    return value.length <= maxLength;
};

export const getIntlKeyForStatus = (status: FagsakStatus): string => {
    switch (status) {
        case FagsakStatus.OPPRETTET:
        case FagsakStatus.UNDER_BEHANDLING:
            return 'velkommen.sak.status.underBehandling';
        case FagsakStatus.LOPENDE:
        case FagsakStatus.AVSLUTTET:
            return 'velkommen.sak.status.ferdigBehandlet';
    }
};

export const replaceInvisibleCharsWithSpace = (inputString: string): string  => {
    return inputString.replace(usynligeCharsRegex, '\u0020');
};
