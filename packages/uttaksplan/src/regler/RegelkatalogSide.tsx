import {
    ExclamationmarkTriangleIcon,
    EyeIcon,
    PencilLineIcon,
    ShieldCheckmarkIcon,
    TokenIcon,
} from '@navikt/aksel-icons';
import { ComponentType, ReactNode } from 'react';

import { BodyLong, BodyShort, Box, HStack, Heading, Link, Tag, VStack } from '@navikt/ds-react';

/**
 * Felles layout-skall for de selvdokumenterende regelkatalog-sidene i
 * Storybook. Gir alle sidene samme hero, samme områdekort og samme
 * tabellramme — så designere og PO-er kjenner igjen mønsteret på tvers
 * av felt-, synlighets-, kvotetype-, alert- og valideringsreglene.
 */
export const RegelkatalogSide = <T,>({
    tittel,
    intro,
    kildesti,
    farge,
    badge,
    områder,
    getRegelId,
    kolonner,
}: RegelkatalogSideProps<T>) => (
    <div className="bg-ax-bg-neutral-soft min-h-screen p-8">
        <VStack gap="space-24" className="mx-auto max-w-6xl">
            <Hero tittel={tittel} intro={intro} kildesti={kildesti} farge={farge} badge={badge} />
            {områder.map((område, idx) => (
                <OmrådeKort
                    key={område.id}
                    nummer={idx + 1}
                    tittel={område.område}
                    beskrivelse={område.beskrivelse}
                    seOgså={område.seOgså}
                    farge={farge}
                    regler={område.regler}
                    getRegelId={getRegelId}
                    kolonner={kolonner}
                />
            ))}
        </VStack>
    </div>
);
/**
 * Visuell identitet per katalogtype — eksplisitte felt så lesaren
 * slepp å gjette kva del av strengen som hører til kvar plass.
 *
 * - `badge`: brukt på det vesle badge-elementet (bakgrunn + ramme + tekst)
 * - `border`: brukt aleine på den fargete venstrekanten av hero-boksen
 */
const FARGER = {
    felt: {
        badge: 'bg-ax-bg-accent-soft border-ax-border-accent text-ax-text-accent',
        border: 'border-ax-border-accent',
        Icon: PencilLineIcon,
    },
    synlighet: {
        badge: 'bg-ax-bg-info-soft border-ax-border-info text-ax-text-info',
        border: 'border-ax-border-info',
        Icon: EyeIcon,
    },
    kvote: {
        badge: 'bg-ax-bg-success-soft border-ax-border-success text-ax-text-success',
        border: 'border-ax-border-success',
        Icon: TokenIcon,
    },
    alert: {
        badge: 'bg-ax-bg-warning-soft border-ax-border-warning text-ax-text-warning',
        border: 'border-ax-border-warning',
        Icon: ExclamationmarkTriangleIcon,
    },
    validering: {
        badge: 'bg-ax-bg-danger-soft border-ax-border-danger text-ax-text-danger',
        border: 'border-ax-border-danger',
        Icon: ShieldCheckmarkIcon,
    },
} as const satisfies Record<
    string,
    { badge: string; border: string; Icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }> }
>;

type Katalogfarge = keyof typeof FARGER;

type HeroProps = {
    tittel: string;
    intro: ReactNode;
    kildesti: string;
    farge: Katalogfarge;
    badge: string;
};

const Hero = ({ tittel, intro, kildesti, farge, badge }: HeroProps) => {
    const { Icon } = FARGER[farge];
    return (
        <Box
            background="neutral-soft"
            borderRadius="12"
            padding="space-32"
            className={`border-l-8 ${FARGER[farge].border}`}
        >
            <VStack gap="space-12">
                <HStack gap="space-12" align="center">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm
                            font-semibold uppercase tracking-wide ${FARGER[farge].badge}`}
                    >
                        <Icon aria-hidden className="h-4 w-4" />
                        {badge}
                    </span>
                    <BodyShort size="small" className="text-ax-text-subtle">
                        Autogenerert fra <code className="font-mono">{kildesti}</code>
                    </BodyShort>
                </HStack>
                <Heading size="xlarge" level="1">
                    {tittel}
                </Heading>
                <BodyLong size="medium" className="max-w-3xl">
                    {intro}
                </BodyLong>
            </VStack>
        </Box>
    );
};

export type Kolonne<T> = {
    overskrift: string;
    bredde?: string;
    render: (regel: T) => ReactNode;
};

type OmrådeKortProps<T> = {
    nummer: number;
    tittel: string;
    beskrivelse: string;
    seOgså?: readonly SeOgsåLenke[];
    farge: Katalogfarge;
    regler: readonly T[];
    getRegelId: (regel: T) => string;
    kolonner: ReadonlyArray<Kolonne<T>>;
};

const OmrådeKort = <T,>({
    nummer,
    tittel,
    beskrivelse,
    seOgså,
    farge,
    regler,
    getRegelId,
    kolonner,
}: OmrådeKortProps<T>) => (
    <Box
        background="default"
        borderRadius="12"
        padding="space-24"
        shadow="dialog"
        className="border border-ax-border-subtle"
    >
        <VStack gap="space-16">
            <HStack gap="space-16" align="start">
                <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-bold ${FARGER[farge].badge}`}
                    aria-hidden
                >
                    {nummer}
                </span>
                <VStack gap="space-4" className="flex-1">
                    <Heading size="medium" level="2">
                        {tittel}
                    </Heading>
                    <BodyLong size="small" className="text-ax-text-subtle">
                        {beskrivelse}
                    </BodyLong>
                    {seOgså && seOgså.length > 0 && (
                        <HStack gap="space-12" align="center" wrap>
                            <BodyShort size="small" className="text-ax-text-subtle font-semibold">
                                Se også:
                            </BodyShort>
                            {seOgså.map((lenke) => (
                                <Link key={lenke.tekst} as="button" type="button" onClick={lenke.onClick}>
                                    {lenke.tekst}
                                </Link>
                            ))}
                        </HStack>
                    )}
                </VStack>
                <Tag variant="neutral-moderate" size="small">
                    {regler.length} {regler.length === 1 ? 'regel' : 'regler'}
                </Tag>
            </HStack>

            <div className="overflow-hidden rounded-lg border border-ax-border-subtle">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-ax-bg-neutral-soft">
                        <tr>
                            <th className="w-12 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ax-text-subtle">
                                #
                            </th>
                            {kolonner.map((k) => (
                                <th
                                    key={k.overskrift}
                                    className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ax-text-subtle"
                                    style={k.bredde ? { width: k.bredde } : undefined}
                                >
                                    {k.overskrift}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {regler.map((regel, idx) => (
                            <tr
                                key={getRegelId(regel)}
                                className="border-t border-ax-border-subtle align-top hover:bg-ax-bg-neutral-soft"
                            >
                                <td className="px-3 py-3 text-sm font-semibold text-ax-text-subtle">{idx + 1}</td>
                                {kolonner.map((k) => (
                                    <td key={k.overskrift} className="px-3 py-3 text-sm">
                                        {k.render(regel)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </VStack>
    </Box>
);

type Område<T> = {
    id: string;
    område: string;
    beskrivelse: string;
    seOgså?: readonly SeOgsåLenke[];
    regler: readonly T[];
};

export type SeOgsåLenke = {
    tekst: string;
    onClick: () => void;
};

export type RegelkatalogSideProps<T> = {
    tittel: string;
    intro: ReactNode;
    kildesti: string;
    farge: Katalogfarge;
    badge: string;
    områder: ReadonlyArray<Område<T>>;
    getRegelId: (regel: T) => string;
    kolonner: ReadonlyArray<Kolonne<T>>;
};

/** Liten badge med monospace-id — brukt i tabellene. Wrapper på punktum. */
export const RegelIdBadge = ({ id }: { id: string }) => (
    <code className="rounded bg-ax-bg-neutral-moderate px-2 py-0.5 font-mono text-xs">
        {id.split('.').map((segment, i, arr) => (
            <span key={`${i}-${segment}`}>
                {segment}
                {i < arr.length - 1 && (
                    <>
                        .<wbr />
                    </>
                )}
            </span>
        ))}
    </code>
);

/** Sitert melding-tekst — typisk «Slik ser meldingen ut for brukeren». */
export const MeldingSitat = ({
    tekst,
    children,
    tone = 'subtle',
}: {
    tekst?: string;
    children?: ReactNode;
    tone?: 'subtle' | 'warning';
}) => (
    <BodyShort
        size="small"
        className={tone === 'warning' ? 'text-ax-text-warning italic' : 'text-ax-text-subtle italic'}
    >
        «{children ?? tekst}»
    </BodyShort>
);
