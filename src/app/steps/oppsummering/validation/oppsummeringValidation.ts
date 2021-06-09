import { IntlShape } from 'react-intl';

export const validateHarGodkjentOppsummering = (intl: IntlShape) => (value: boolean) => {
    if (value !== true) {
        return intl.formatMessage({ id: 'valideringsfeil.oppsummering.harGodkjentOppsummering.påkrevd' });
    }

    return undefined;
};
