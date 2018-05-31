import InjectedIntl = ReactIntl.InjectedIntl;
import MessageValue = ReactIntl.MessageValue;

const getMessage = (
    intl: InjectedIntl,
    id: string,
    value?: { [key: string]: MessageValue }
): string => intl.formatMessage({ id }, value);

export default getMessage;
