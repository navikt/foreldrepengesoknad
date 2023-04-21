import bemUtils from '../../utils/bemUtils';
import React from 'react';
import './sidebanner.less';
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';

export interface SidebannerProps {
    dialog?: Dialog;
}

interface Dialog {
    title: string;
    text: string | React.ReactNode;
}

const Sidebanner: React.FunctionComponent<SidebannerProps> = ({ dialog }) => {
    const bem = bemUtils('sidebanner');
    return (
        <div className={bem.block}>
            {dialog && (
                <div className={bem.element('speechbubble')}>
                    <GuidePanel poster>
                        <Heading size="small" level="2">
                            {dialog.title}
                        </Heading>
                        <BodyShort>{dialog.text}</BodyShort>
                    </GuidePanel>
                </div>
            )}
        </div>
    );
};

export default Sidebanner;
