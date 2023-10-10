import bemUtils from '../../utils/bemUtils';
import React from 'react';
import './sidebanner.less';
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import Block from '../block/Block';

export interface SidebannerProps {
    dialog?: Dialog;
}

interface Dialog {
    title: string;
    text?: string | React.ReactNode;
    textRich?: React.ReactNode;
}

const Sidebanner: React.FunctionComponent<SidebannerProps> = ({ dialog }) => {
    const bem = bemUtils('sidebanner');
    return (
        <div className={bem.block}>
            {dialog && (
                <div className={bem.element('speechbubble')}>
                    <Block padBottom="l">
                        <GuidePanel poster>
                            <Heading size="small" level="2">
                                {dialog.title}
                            </Heading>
                            {dialog.textRich}
                            {dialog.text && <BodyShort>{dialog.text}</BodyShort>}
                        </GuidePanel>
                    </Block>
                </div>
            )}
        </div>
    );
};

export default Sidebanner;
