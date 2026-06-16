import classNames from 'classnames';

import { Heading, Skeleton, SkeletonProps } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    heading?: string;
    showSkeleton?: boolean;
    skeletonProps?: SkeletonProps;
    // La en seksjon levere en egendefinert skeleton som ligner det faktiske
    // innholdet (f.eks. tidslinjen), i stedet for en enkelt grå blob.
    skeleton?: React.ReactNode;
    className?: string;
}

export const ContentSection = ({
    heading,
    children,
    showSkeleton = false,
    skeletonProps,
    skeleton,
    className,
}: Props) => {
    const skeletonInnhold = skeleton ?? (skeletonProps ? <Skeleton {...skeletonProps} /> : null);

    // Skeleton- og innholdstilstanden deler nøyaktig samme ytre struktur (samme
    // bordede boks, marger og overskriftsnivå). Da bytter vi kun ut det indre
    // innholdet når dataene er klare, slik at vi ikke får et layout shift (CLS)
    // fra ulik ramme/padding/marg mellom de to tilstandene.
    return (
        <section>
            {heading && (
                <Heading size="medium" level="2" className="mb-2">
                    {heading}
                </Heading>
            )}
            <div className={classNames(className, 'bg-ax-bg-default border-ax-brand-blue-200 rounded-lg border-2 p-4')}>
                {showSkeleton && skeletonInnhold ? skeletonInnhold : children}
            </div>
        </section>
    );
};
