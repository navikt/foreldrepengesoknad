import bemUtils from '../../utils/bemUtils';
import React from 'react';
import SpeechBubble from './SpeechBubble';

import Veileder, { VeilederProps } from '../veileder/Veileder';

import './sidebanner.less';

export interface SidebannerProps {
    dialog?: Dialog;
    veileder?: VeilederProps;
}

interface Dialog {
    title: string;
    text: string | React.ReactNode;
}

const Sidebanner: React.FunctionComponent<SidebannerProps> = ({ dialog, veileder }) => {
    const bem = bemUtils('sidebanner');
    return (
        <div className={bem.block}>
            {dialog && (
                <div className={bem.element('speechbubble')}>
                    <SpeechBubble title={dialog.title} text={dialog.text} />
                </div>
            )}
            <Veileder {...veileder} />
        </div>
    );
};

export default Sidebanner;
