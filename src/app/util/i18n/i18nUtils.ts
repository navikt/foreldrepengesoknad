import InjectedIntl = ReactIntl.InjectedIntl;
import MessageValue = ReactIntl.MessageValue;

export const getMessage = (
    intl: InjectedIntl,
    id: string,
    value?: { [key: string]: MessageValue }
): string => intl.formatMessage({ id }, value);
