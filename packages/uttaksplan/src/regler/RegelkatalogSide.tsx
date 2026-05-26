import { ReactNode } from 'react';

import { BodyLong, BodyShort, Box, HStack, Heading, Tag, VStack } from '@navikt/ds-react';

/**
 * Felles layout-skall for de selvdokumenterende regelkatalog-sidene i
 * Storybook. Gir alle sidene samme hero, samme områdekort og samme
 * tabellramme — så designere og PO-er kjenner igjen mønsteret på tvers
 * av felt-, synlighets-, kvotetype-, alert- og valideringsreglene.
 */

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
    },
    synlighet: {
        badge: 'bg-ax-bg-info-soft border-ax-border-info text-ax-text-info',
        border: 'border-ax-border-info',
    },
    kvote: {
        badge: 'bg-ax-bg-success-soft border-ax-border-success text-ax-text-success',
        border: 'border-ax-border-success',
    },
    alert: {
        badge: 'bg-ax-bg-warning-soft border-ax-border-warning text-ax-text-warning',
        border: 'border-ax-border-warning',
    },
    validering: {
        badge: 'bg-ax-bg-danger-soft border-ax-border-danger text-ax-text-danger',
        border: 'border-ax-border-danger',
    },
} as const;

export type Katalogfarge = keyof typeof FARGER;

type HeroProps = {
    tittel: string;
    intro: ReactNode;
    kildesti: string;
    farge: Katalogfarge;
    badge: string;
};

const Hero = ({ tittel, intro, kildesti, farge, badge }: HeroProps) => (
    <Box
        background="neutral-soft"
        borderRadius="12"
        padding="space-32"
        className={`border-l-8 ${FARGER[farge].border}`}
    >
        <VStack gap="space-12">
            <HStack gap="space-12" align="center">
                <span
                    className={`rounded-full border px-3 py-1 text-sm font-semibold uppercase tracking-wide ${FARGER[farge].badge}`}
                >
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

export type Kolonne<T> = {
    overskrift: string;
    bredde?: string;
    render: (regel: T) => ReactNode;
};

type OmrådeKortProps<T> = {
    nummer: number;
    tittel: string;
    beskrivelse: string;
    farge: Katalogfarge;
    regler: readonly T[];
    getRegelId: (regel: T) => string;
    kolonner: ReadonlyArray<Kolonne<T>>;
};

const OmrådeKort = <T,>({
    nummer,
    tittel,
    beskrivelse,
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
                                <td className="px-3 py-3 text-sm font-semibold text-ax-text-subtle">
                                    {idx + 1}
                                </td>
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
    regler: readonly T[];
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
                    farge={farge}
                    regler={område.regler}
                    getRegelId={getRegelId}
                    kolonner={kolonner}
                />
            ))}
        </VStack>
    </div>
);

/** Liten badge med monospace-id — brukt i tabellene. */
export const RegelIdBadge = ({ id }: { id: string }) => (
    <code className="inline-block rounded bg-ax-bg-neutral-moderate px-2 py-0.5 font-mono text-xs">
        {id}
    </code>
);

/** Sitert melding-tekst — typisk «Slik ser meldingen ut for brukeren». */
export const MeldingSitat = ({ tekst, tone = 'subtle' }: { tekst: string; tone?: 'subtle' | 'warning' }) => (
    <BodyShort
        size="small"
        className={tone === 'warning' ? 'text-ax-text-warning italic' : 'text-ax-text-subtle italic'}
    >
        «{tekst}»
    </BodyShort>
);
