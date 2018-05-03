import * as React from 'react';
import SpeechBubble from '../speech-bubble/SpeechBubble';

import './simpleIllustration.less';
import Veileder, { VeilederProps } from '../veileder/Veileder';

interface Props {
    dialog?: Dialog;
    veileder?: VeilederProps;
}

interface Dialog {
    title: string;
    text: string | React.ReactNode;
}

const SimpleIllustration: React.StatelessComponent<Props> = ({
    dialog,
    veileder
}) => {
    return (
        <div className="simpleIllustration">
            {dialog && (
                <div className="simpleIllustration__speechbubble">
                    <SpeechBubble title={dialog.title} text={dialog.text} />
                </div>
            )}
            <Veileder {...veileder} />
        </div>
    );
};

export default SimpleIllustration;
