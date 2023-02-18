import React from 'react';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';

import './ekspanderbartInnhold.less';

interface Props {
    children: React.ReactNode;
    erApen?: boolean;
    ariaLive?: 'assertive' | 'polite' | 'off';
    animert?: boolean;
}

const EkspanderbartInnhold: React.FunctionComponent<Props> = ({
    children,
    animert = true,
    erApen = false,
    ariaLive = 'off',
}) => {
    const content = <div aria-live={ariaLive}>{erApen ? <div>{children}</div> : <div />}</div>;
    if (!animert) {
        return content;
    }

    return (
        <Collapse
            isOpened={erApen}
            className={classnames('ekspanderbartInnhold', {
                'ekspanderbartInnhold--apen': erApen,
            })}
        >
            {content}
        </Collapse>
    );
};

export default EkspanderbartInnhold;
