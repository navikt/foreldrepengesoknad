import { Meta, StoryObj } from '@storybook/react-vite';

import { BodyLong, Heading, Table, VStack } from '@navikt/ds-react';

import { ALLE_SYNLIGHETSREGLER } from './synlighet';

/**
 * Selvdokumenterende Storybook-side: viser synlighetsreglene for skjemaet
 * for å legge til/endre en periode i uttaksplanen — altså reglene som
 * bestemmer hvilke felter, radioknapper og infobokser brukeren ser
 * avhengig av valgene som er gjort så langt.
 *
 * Siden er ment å leses av designere, produkteiere og saksbehandlere —
 * ikke bare utviklere. Innholdet blir generert direkte fra reglene i
 * `src/regler/synlighet/`, så siden er alltid i synk med koden.
 */
const Synlighetsregler = () => {
    return (
        <VStack gap="space-8" className="max-w-4xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Synlighetsregler i uttaksplan-skjemaet</Heading>
                <BodyLong>
                    Skjemaet for å legge til eller endre en periode er progressivt — felter, radioknapper og
                    infobokser dukker opp etter hvert som brukeren gjør valg. Reglene under bestemmer hvilke deler
                    av skjemaet som vises i hvilke situasjoner.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert fra synlighetskatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/synlighet/</code>). Endrer du regelteksten der, endrer
                    denne siden seg også.
                </BodyLong>
            </VStack>
            {ALLE_SYNLIGHETSREGLER.map((område, områdeIdx) => (
                <VStack key={område.id} gap="space-2">
                    <Heading size="medium">
                        {områdeIdx + 1}. {område.område}
                    </Heading>
                    <BodyLong className="italic text-ax-text-subtle">{område.beskrivelse}</BodyLong>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Regel-id</Table.HeaderCell>
                                <Table.HeaderCell>Hva regelen sier</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {område.regler.map((regel, idx) => (
                                <Table.Row key={regel.id}>
                                    <Table.DataCell>{idx + 1}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.id}</Table.DataCell>
                                    <Table.DataCell>{regel.beskrivelse}</Table.DataCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </VStack>
            ))}
        </VStack>
    );
};

const meta = {
    title: 'Uttaksplan/Synlighetsregler (dokumentasjon)',
    component: Synlighetsregler,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Synlighetsregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleSynlighetsregler: Story = {};
