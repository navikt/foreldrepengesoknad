import * as React from 'react';
import { Collapse } from 'react-collapse';
import * as classNames from 'classnames';

export type BottomMargin = 'm' | 's' | 'xs' | 'xxs' | 'none';

export interface Props {
    /** Default true */
    synlig?: boolean;
    /** Default true */
    animert?: boolean;
    /** Size - default m */
    margin?: BottomMargin;
    render: () => JSX.Element | undefined;
}

import './spørsmål.less';
import { collapseSpringConfig } from 'common/util/animationUtils';

const Spørsmål: React.StatelessComponent<Props> = ({
    synlig = true,
    animert = true,
    margin = 'm',
    render = () => null
}) => {
    const getContent = () =>
        render ? (
            <div className={classNames('sporsmal', `sporsmal--${margin}`)}>
                {render()}
            </div>
        ) : null;

    if (animert === true && margin === 'm') {
        return (
            <Collapse
                springConfig={collapseSpringConfig}
                isOpened={synlig === true}
                className={classNames('sporsmal__collapse', {
                    'sporsmal__collapse--skjult': !synlig
                })}>
                {synlig ? getContent() : <div />}
            </Collapse>
        );
    }
    if (!synlig) {
        return null;
    }
    return getContent();
};

export default Spørsmål;
