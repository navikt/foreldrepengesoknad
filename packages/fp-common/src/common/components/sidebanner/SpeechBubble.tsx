import { Heading } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '../../utils/bemUtils';

import './speechBubble.less';

interface Props {
    title: string;
    text: string | React.ReactNode;
}

const SpeechBubble: React.FunctionComponent<Props> = ({ title = null, text }) => {
    const bem = bemUtils('speechBubble');

    return (
        <div className={`${bem.block} ${bem.modifier('white')}`}>
            <div className={bem.element('content')}>
                {title && (
                    <div className={`${bem.element('title')} capitalizeName`}>
                        <Heading size="small" as="p" style={{ margin: '0' }}>
                            {title}
                        </Heading>
                    </div>
                )}
                <div className={bem.element('text')}>{text}</div>
            </div>
        </div>
    );
};
export default SpeechBubble;
