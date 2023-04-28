import { useIntl } from 'react-intl';

import './labeltekst.less';

type MessageValue = string | number | boolean | Date | null | undefined;

interface Props {
    children?: React.ReactNode;
    intlId?: string;
    intlValue?: { [key: string]: MessageValue };
}

const Labeltekst: React.FunctionComponent<Props> = ({ children, intlId, intlValue }) => {
    const intl = useIntl();
    return <span className="labeltext">{intlId ? intl.formatMessage({ id: intlId }, intlValue) : children}</span>;
};

export default Labeltekst;
