import { Meta, StoryObj } from '@storybook/react-vite';

import { BodyLong, Heading, Table, VStack } from '@navikt/ds-react';

import { FAR_MEDMOR_KVOTE_OMRÅDE, MOR_KVOTE_OMRÅDE } from './kvotetype/kvoteRegler';
import { Kvoteområde } from './kvotetype/types';

const ALLE_KVOTE_OMRÅDER: readonly Kvoteområde[] = [MOR_KVOTE_OMRÅDE, FAR_MEDMOR_KVOTE_OMRÅDE];

/**
 * Selvdokumenterende Storybook-side: viser hvilke kvotetyper (stønadskontoer)
 * som er gyldige å velge for hver forelder i skjemaet for å legge til eller
 * endre en periode. Reglene tar hensyn til familiesituasjon, rettighetstype,
 * og hvor i tid den valgte perioden ligger i forhold til familiehendelsesdatoen.
 *
 * Siden er ment å leses av designere, produkteiere og saksbehandlere — ikke
 * bare utviklere. Innholdet blir generert direkte fra reglene i
 * `src/regler/kvotetype/`, så siden er alltid i synk med koden.
 */
const Kvotetyperegler = () => {
    return (
        <VStack gap="space-8" className="max-w-5xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Kvotetyperegler i uttaksplan-skjemaet</Heading>
                <BodyLong>
                    Når en bruker legger til eller endrer en periode, må han eller hun velge en kvotetype
                    (stønadskonto) — mødrekvote, fedrekvote, fellesperiode, foreldrepenger osv. Reglene under
                    bestemmer hvilke kvotetyper som er gyldige for hver forelder gitt familiesituasjonen,
                    rettighetstypen og hvilke datoer som er valgt.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert fra kvotekatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/kvotetype/</code>). Endrer du regelteksten der,
                    endrer denne siden seg også.
                </BodyLong>
            </VStack>
            {ALLE_KVOTE_OMRÅDER.map((område, områdeIdx) => (
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
                                <Table.HeaderCell>Kvotetype</Table.HeaderCell>
                                <Table.HeaderCell>Når kvoten er gyldig</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {område.regler.map((regel, idx) => (
                                <Table.Row key={regel.id}>
                                    <Table.DataCell>{idx + 1}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.id}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.kontotype}</Table.DataCell>
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
    title: 'Uttaksplan/Kvotetyperegler (dokumentasjon)',
    component: Kvotetyperegler,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Kvotetyperegler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleKvotetyperegler: Story = {};
