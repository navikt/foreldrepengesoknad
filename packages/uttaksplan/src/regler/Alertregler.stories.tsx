import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { BodyLong, Heading, Table, Tag, VStack } from '@navikt/ds-react';

import { INFORMASJONS_ALERT_OMRÅDE } from './alert/informasjonsAlerts';
import { BLOKKERENDE_ALERT_OMRÅDE, KONTEKSTUELL_ALERT_OMRÅDE } from './alert/skjemaAlerts';
import { Alertområde, VISNINGSSTED_LABELS } from './alert/types';

const ALLE_ALERTREGLER: readonly Alertområde[] = [
    BLOKKERENDE_ALERT_OMRÅDE,
    KONTEKSTUELL_ALERT_OMRÅDE,
    INFORMASJONS_ALERT_OMRÅDE,
];

/**
 * Selvdokumenterende Storybook-side: viser alertreglene i hele
 * uttaksplan-pakken — informasjonsmeldinger (Alert/InlineMessage) som
 * dukker opp ulike steder: i skjemaet for å legge til/endre periode,
 * i listevisningen, i kalendervisningen, i redigeringspaneler osv.
 *
 * Blokkerende meldinger erstatter hele skjemaet. Kontekstuelle
 * meldinger dukker opp som tilleggsinformasjon uten å stoppe
 * brukeren. Kolonnen «Vises» forteller hvor i applikasjonen hver
 * regel slår inn.
 *
 * Siden er autogenerert fra alertkatalogen i koden
 * (`packages/uttaksplan/src/regler/alert/`), og er alltid i synk med koden.
 */
const Alertregler = () => {
    const intl = useIntl();
    return (
        <VStack gap="space-8" className="max-w-5xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Alertregler i uttaksplanen</Heading>
                <BodyLong>
                    I tillegg til felt- og valideringsreglene har uttaksplanen en rekke
                    informasjonsmeldinger som dukker opp i bestemte situasjoner. Noen
                    blokkerer skjemaet (brukeren kan ikke gå videre), mens andre er
                    kontekstuelle hint som vises i listen, kalenderen eller redigeringspanelene.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert fra alertkatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/alert/</code>). Endrer du regelteksten
                    der, endrer denne siden seg også.
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
                                <Table.HeaderCell>Hva regelen sier</Table.HeaderCell>
                                <Table.HeaderCell>Melding(er) til brukeren</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {område.regler.map((regel, idx) => (
                                <Table.Row key={regel.id}>
                                    <Table.DataCell>{idx + 1}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.id}</Table.DataCell>
                                    <Table.DataCell>
                                        <Tag
                                            variant={regel.type === 'blokkerende' ? 'warning' : 'info'}
                                            size="small"
                                        >
                                            {regel.type}
                                        </Tag>
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <VStack gap="space-1">
                                            {regel.visningssteder.map((sted) => (
                                                <BodyLong key={sted} size="small">
                                                    {VISNINGSSTED_LABELS[sted]}
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
