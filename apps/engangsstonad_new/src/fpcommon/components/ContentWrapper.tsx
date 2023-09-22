import { bemUtils } from '@navikt/fp-common';
import './contentWrapper.less';

interface Props {
    children: React.ReactElement;
}

const ContentWrapper: React.FunctionComponent<Props> = ({ children }) => {
    const bem = bemUtils('content');
    return <div className={bem.block}>{children}</div>;
};

export default ContentWrapper;
