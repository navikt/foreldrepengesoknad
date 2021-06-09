import { IntlShape } from 'react-intl';

export const validateHarForståttRettigheterOgPlikter = (intl: IntlShape) => (value: boolean) => {
    if (value !== true) {
        return intl.formatMessage({ id: 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd' });
    }

    return undefined;
};
