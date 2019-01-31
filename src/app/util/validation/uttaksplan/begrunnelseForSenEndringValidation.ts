import { maxLengthIsGreaterThanOrEqualToStringLength } from 'app/util/stringUtils';

export const begrunnelseSenEndringMaxLength = 1000;

export const begrunnelseForSenEndringErGyldig = (begrunnelse?: string) =>
    maxLengthIsGreaterThanOrEqualToStringLength(begrunnelseSenEndringMaxLength, begrunnelse || '');
