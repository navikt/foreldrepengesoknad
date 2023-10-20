import { IntlShape } from 'react-intl';

const intlUtils = (
    intl: IntlShape,
    id: string,
    value?: Record<string, string | number | boolean | null | undefined | Date>,
): string => intl.formatMessage({ id }, value);

export const typedIntlHelper = <Keys extends string>(intl: IntlShape) => {
    return {
        intlText: (id: Keys, values?: any): string => {
            return intl.formatMessage({ id }, values);
        },
        intlHtml: (id: Keys, values?: any): React.ReactNode => {
            return intl.formatMessage({ id }, values);
        },
    };
};
export const intlHasKey = (intl: IntlShape, key: string) => {
    return intl.messages[key] !== undefined;
};

export default intlUtils;
