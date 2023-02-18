import { IntlShape } from 'react-intl';

export const intlHasKey = (intl: IntlShape, key: string) => {
    return intl.messages[key] !== undefined;
};
