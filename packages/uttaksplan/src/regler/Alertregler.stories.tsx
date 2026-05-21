import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { BodyLong, Heading, Table, Tag, VStack } from '@navikt/ds-react';

import { ALLE_ALERTREGLER } from './alert';

/**
 * Selvdokumenterende Storybook-side: viser alertreglene i skjemaet for
 * å legge til/endre en periode i uttaksplanen — altså reglene som
 * bestemmer hvilke informasjonsmeldinger (Alert/InlineMessage) brukeren
 * ser i ulike situasjoner.
 *
 * Blokkerande meldingar erstattar heile skjemaet, medan kontekstuelle
 * meldingar dukkar opp som tilleggsinformasjon inne i skjemaet.
 *
 * Siden er autogenerert frå regelkatalogen i koden
 * (`packages/uttaksplan/src/regler/alert/`), og er alltid i synk med koden.
 */
const Alertregler = () => {
    const intl = useIntl();
    return (
        <VStack gap="space-8" className="max-w-4xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Alertregler i uttaksplan-skjemaet</Heading>
                <BodyLong>
                    I tillegg til felt- og valideringsreglane har skjemaet informasjonsmeldingar som dukkar opp i
                    bestemte situasjonar. Nokre av dei blokkerer heile skjemaet (brukaren kan ikkje gå vidare),
                    medan andre er kontekstuelle hint som vises inne i skjemaet.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert frå alertkatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/alert/</code>). Endrar du regelteksten der, endrar denne
                    siden seg også.
                </BodyLong>
            </VStack>
            {ALLE_ALERTREGLER.map((område, områdeIdx) => (
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
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Kva regelen seier</Table.HeaderCell>
                                <Table.HeaderCell>Melding(ar) til brukaren</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {område.regler.map((regel, idx) => (
                                <Table.Row key={regel.id}>
                                    <Table.DataCell>{idx + 1}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.id}</Table.DataCell>
                                    <Table.DataCell>
                                        <Tag
                                            variant={regel.type === 'blokkerande' ? 'warning' : 'info'}
                                            size="small"
                                        >
                                            {regel.type}
                                        </Tag>
                                    </Table.DataCell>
                                    <Table.DataCell>{regel.beskrivelse}</Table.DataCell>
                                    <Table.DataCell>
                                        <VStack gap="space-1">
                                            {regel.meldingIder.map((id) => (
                                                <BodyLong key={id} size="small" className="text-ax-text-subtle">
                                                    «{intl.formatMessage({ id })}»
                                                </BodyLong>
                                            ))}
                                        </VStack>
                                    </Table.DataCell>
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
    title: 'Uttaksplan/Alertregler (dokumentasjon)',
    component: Alertregler,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Alertregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleAlertregler: Story = {};
