import * as React from 'react';
import { Collapse } from 'react-collapse';
import * as classnames from 'classnames';

export type BottomMargin = 'm' | 's' | 'xs' | 'xxs';

export interface Props {
    /** Default true */
    synlig?: boolean;
    /** Default true */
    animated?: boolean;
    /** Size - default m */
    margin?: BottomMargin;
    render: () => JSX.Element;
}

import './spørsmål.less';

const Spørsmål: React.StatelessComponent<Props> = ({
    synlig = true,
    animated = true,
    margin = 'm',
    render = () => null
}) => {
    const getContent = () => (
        <div className={classnames('sporsmal', `sporsmal--${margin}`)}>
            {render()}
        </div>
    );

    if (animated === true && margin === 'm') {
        return (
            <Collapse isOpened={synlig === true} className="sporsmal__collapse">
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
