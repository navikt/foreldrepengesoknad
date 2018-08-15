import { InjectedIntl } from 'react-intl';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';

const getStillingspercentAsNumber = (
    stillingsprosent: string
): number | undefined => {
    const nbr = parseFloat(stillingsprosent);
    if (isNaN(nbr)) {
        return undefined;
    }
    return nbr;
};

const isStillingsprosentANumber = (stillingsprosent: string): boolean => {
    return (
        stillingsprosent !== undefined &&
        stillingsprosent !== '' &&
        getStillingspercentAsNumber(stillingsprosent) !== undefined
    );
};

const isStillingsprosentMax100Percent = (stillingsprosent: string): boolean => {
    const pst = getStillingspercentAsNumber(stillingsprosent);
    if (pst) {
        return pst <= 100 && pst > 0;
    }
    return false;
};

export const getStillingsprosentRegler = (
    stillingsprosent: string,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.stillingsprosent';
    return [
        {
            test: () => isStillingsprosentANumber(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.ugyldigTall`)
        },
        {
            test: () => isStillingsprosentMax100Percent(stillingsprosent),
            failText: getMessage(intl, `${intlKey}.over100prosent`)
        }
    ];
};
