import * as React from 'react';
import { Collapse } from 'react-collapse';
import * as classnames from 'classnames';

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
import { collapseSpringConfig } from '../../util/animasjon';

const Spørsmål: React.StatelessComponent<Props> = ({
    synlig = true,
    animert = true,
    margin = 'm',
    render = () => null
}) => {
    const getContent = () =>
        render ? (
            <div className={classnames('sporsmal', `sporsmal--${margin}`)}>
                {render()}
            </div>
        ) : null;

    if (animert === true && margin === 'm') {
        return (
            <Collapse
                springConfig={collapseSpringConfig}
                isOpened={synlig === true}
                className={classnames('sporsmal__collapse', {
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
