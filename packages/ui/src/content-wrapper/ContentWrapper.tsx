import { bemUtils } from '@navikt/fp-utils';

import './contentWrapper.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const ContentWrapper: React.FunctionComponent<Props> = ({ children }) => {
    const bem = bemUtils('content');
    return <div className={bem.block}>{children}</div>;
};

export default ContentWrapper;
