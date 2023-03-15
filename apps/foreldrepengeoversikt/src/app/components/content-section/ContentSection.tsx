import { Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import './content-section.css';

type BackgroundColor = 'white' | 'yellow';
type Padding = 'default' | 'none' | 'large';
type CornerStyle = 'rounded' | 'square';

interface Props {
    backgroundColor?: BackgroundColor;
    children: React.ReactNode;
    cornerStyle?: CornerStyle;
    heading?: string;
    padding?: Padding;
}

const ContentSection: FunctionComponent<Props> = ({
    heading,
    children,
    backgroundColor = 'white',
    cornerStyle = 'rounded',
    padding = 'default',
}) => {
    const bem = bemUtils('content-section');

    return (
        <section
            className={classNames(
                bem.block,
                bem.modifier(`bg-${backgroundColor}`),
                bem.modifier(`padding-${padding}`),
                bem.modifier(`corner-style-${cornerStyle}`)
            )}
        >
            {heading && (
                <Heading size="medium" level="2" className={bem.element('heading')}>
                    {heading}
                </Heading>
            )}
            {children}
        </section>
    );
};

export default ContentSection;
