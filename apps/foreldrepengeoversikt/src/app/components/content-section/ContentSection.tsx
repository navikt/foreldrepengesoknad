import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { Heading, Skeleton, SkeletonProps } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    heading?: string;
    showSkeleton?: boolean;
    skeletonProps?: SkeletonProps;
    className?: string;
}

const ContentSection: FunctionComponent<Props> = ({
    heading,
    children,
    showSkeleton = false,
    skeletonProps,
    className,
}) => {
    if (showSkeleton && skeletonProps) {
        return (
            <div className="mb-8">
                {heading && (
                    <Heading size="medium" level="2" className="mb-2">
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
                <Heading size="medium" level="4" className="mb-2">
                    {heading}
                </Heading>
            )}
            <div className={classNames(className, 'rounded-large bg-white p-4 border-2 border-deepblue-100')}>
                {children}
            </div>
        </section>
    );
};

export default ContentSection;
