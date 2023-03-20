import React from 'react';
import './speechBubble.less';
interface Props {
    title: string;
    text: string | React.ReactNode;
}
declare const SpeechBubble: React.FunctionComponent<Props>;
export default SpeechBubble;
