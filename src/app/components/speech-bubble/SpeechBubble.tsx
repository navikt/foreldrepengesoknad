import * as React from 'react';
import { Element } from 'nav-frontend-typografi';

import './speechBubble.less';

interface Props {
    title: string;
    text: string | React.ReactNode;
}

const SpeechBubble: React.StatelessComponent<Props> = ({
    title = null,
    text
}) => (
    <div className={`speechBubble speechBubble--white`}>
        <div className="speechBubble__content">
            {title && (
                <div className="speechBubble__title capitalizeName">
                    <Element className="m_no-margin">{title}</Element>
                </div>
            )}
            <div className="speechBubble__text">{text}</div>
        </div>
    </div>
);
export default SpeechBubble;
