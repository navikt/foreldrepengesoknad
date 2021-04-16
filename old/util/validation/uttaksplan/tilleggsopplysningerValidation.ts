import { maxLengthIsGreaterThanOrEqualToStringLength } from 'app/util/stringUtils';

export const tilleggsopplysningerMaxLength = 1000;

export const tilleggsopplysningerErGyldig = (begrunnelse?: string) =>
    maxLengthIsGreaterThanOrEqualToStringLength(tilleggsopplysningerMaxLength, begrunnelse || '');
