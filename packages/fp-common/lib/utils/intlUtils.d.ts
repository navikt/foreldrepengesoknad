import { IntlShape } from 'react-intl';
declare const intlHelper: (intl: IntlShape, id: string, value?: Record<string, string | number | boolean | null | undefined | Date>) => string;
export declare function typedIntlHelper<Keys extends string>(intl: IntlShape): {
    intlText: (id: Keys, values?: any) => string;
    intlHtml: (id: Keys, values?: any) => React.ReactNode;
};
export default intlHelper;
