import { IntlShape, useIntl } from 'react-intl';
import { getDateValidators } from './dateFormValidation';
import { getGeneralValidators } from './generalFormValidation';

//TODO Få inn valideringsfunksjonane fra fp-common

export const getFormValidators = (intl: IntlShape) => {
    return {
        ...getGeneralValidators(intl),
        date: getDateValidators(intl),
    };
};

export const useFormValidators = () => {
    const intl = useIntl();
    return getFormValidators(intl);
};
