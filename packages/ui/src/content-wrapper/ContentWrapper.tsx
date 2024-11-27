import { bemUtils } from '@navikt/fp-utils';

import './contentWrapper.css';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

export const ContentWrapper = ({ children }: Props) => {
    const bem = bemUtils('content');
    return <div className={bem.block}>{children}</div>;
};
