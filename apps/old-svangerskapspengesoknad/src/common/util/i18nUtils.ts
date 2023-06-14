import { IntlShape } from 'react-intl';

type MessageValue = string | number | boolean | Date | null | undefined;

const getMessage = (intl: IntlShape, id: string, value?: { [key: string]: MessageValue }): string =>
    intl.formatMessage({ id }, value);

export default getMessage;
