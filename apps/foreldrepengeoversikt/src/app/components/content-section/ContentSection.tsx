import { Heading, Skeleton, SkeletonProps } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

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
    showSkeleton?: boolean;
    skeletonProps?: SkeletonProps;
    marginBottom?: 'default' | 'small';
}

const ContentSection: FunctionComponent<Props> = ({
    heading,
    children,
    backgroundColor = 'white',
    cornerStyle = 'rounded',
    padding = 'default',
    showSkeleton = false,
    marginBottom = 'default',
    skeletonProps,
}) => {
    const bem = bemUtils('content-section');

    if (showSkeleton && skeletonProps) {
        return (
            <div className={bem.element('skeleton')}>
                {heading && (
                    <Heading size="medium" level="2" className={bem.element('heading')}>
                        {heading}
                    </Heading>
                )}
                <Skeleton {...skeletonProps} />
            </div>
        );
    }

    return (
        <section>
            {heading && (
                <Heading size="medium" level="2" className={bem.element('heading')}>
                    {heading}
                </Heading>
            )}
            <div
                className={classNames(
                    bem.block,
                    bem.modifier(`bg-${backgroundColor}`),
                    bem.modifier(`padding-${padding}`),
                    bem.modifier(`corner-style-${cornerStyle}`),
                    bem.modifier(`margin-${marginBottom}`)
                )}
            >
                {children}
            </div>
        </section>
    );
};

export default ContentSection;
