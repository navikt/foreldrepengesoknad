import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { BodyLong, Heading, Table, Tag, VStack } from '@navikt/ds-react';

import { INFORMASJONS_ALERT_OMRÅDE } from './alert/informasjonsAlerts';
import { BLOKKERANDE_ALERT_OMRÅDE, KONTEKSTUELL_ALERT_OMRÅDE } from './alert/skjemaAlerts';
import { Alertområde, VISNINGSSTAD_LABELS } from './alert/types';

const ALLE_ALERTREGLER: readonly Alertområde[] = [
    BLOKKERANDE_ALERT_OMRÅDE,
    KONTEKSTUELL_ALERT_OMRÅDE,
    INFORMASJONS_ALERT_OMRÅDE,
];

/**
 * Selvdokumenterende Storybook-side: viser alertreglane i heile
 * uttaksplan-pakken — informasjonsmeldingar (Alert/InlineMessage) som
 * dukkar opp ulike stader: i skjemaet for å leggje til/endre periode,
 * i listevisninga, i kalendervisninga, i redigeringspaneler osb.
 *
 * Blokkerande meldingar erstattar heile skjemaet. Kontekstuelle
 * meldingar dukkar opp som tilleggsinformasjon utan å stoppe
 * brukaren. Kolonnen «Vises» fortel kvar i applikasjonen kvar
 * regel slår inn.
 *
 * Siden er autogenerert frå alertkatalogen i koden
 * (`packages/uttaksplan/src/regler/alert/`), og er alltid i synk med koden.
 */
const Alertregler = () => {
    const intl = useIntl();
    return (
        <VStack gap="space-8" className="max-w-5xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Alertregler i uttaksplanen</Heading>
                <BodyLong>
                    I tillegg til felt- og valideringsreglane har uttaksplanen ei rekkje
                    informasjonsmeldingar som dukkar opp i bestemte situasjonar. Nokre
                    blokkerer skjemaet (brukaren kan ikkje gå vidare), medan andre er
                    kontekstuelle hint som vises i lista, kalenderen eller redigeringspanela.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert frå alertkatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/alert/</code>). Endrar du regelteksten
                    der, endrar denne siden seg også.
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
                                <Table.HeaderCell>Vises</Table.HeaderCell>
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
                                    <Table.DataCell>
                                        <VStack gap="space-1">
                                            {regel.visningsstader.map((stad) => (
                                                <BodyLong key={stad} size="small">
                                                    {VISNINGSSTAD_LABELS[stad]}
                                                </BodyLong>
                                            ))}
                                        </VStack>
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
