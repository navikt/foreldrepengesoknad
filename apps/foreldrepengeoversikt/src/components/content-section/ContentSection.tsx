import classNames from 'classnames';

import { Heading, Skeleton, SkeletonProps } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    heading?: string;
    showSkeleton?: boolean;
    skeletonProps?: SkeletonProps;
    className?: string;
}

export const ContentSection = ({ heading, children, showSkeleton = false, skeletonProps, className }: Props) => {
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
            <div className={classNames(className, 'rounded-lg bg-ax-bg-default p-4 border-2 border-ax-brand-blue-200')}>
                {children}
            </div>
        </section>
    );
};
