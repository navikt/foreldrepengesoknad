import { Meta, StoryObj } from '@storybook/react-vite';
import { IntlProvider, useIntl } from 'react-intl';

import { BodyLong, Heading, Table, VStack } from '@navikt/ds-react';

import messages from '../intl/messages/nb_NO.json';
import { ALLE_FELTREGLER } from './felt';

/**
 * Selvdokumenterende Storybook-side: viser feltreglene som kjøres direkte
 * på input-feltene i skjemaet for å legge til/endre en periode i uttaksplanen.
 *
 * I motsetning til `Valideringsregler.stories.tsx`, som beskriver reglene som
 * kjøres når brukeren lagrer hele perioden, viser denne siden reglene som
 * gir feedback mens brukeren fyller ut feltene.
 *
 * Siden er ment å leses av designere, produkteiere og saksbehandlere — ikke
 * bare utviklere. Innholdet blir generert direkte fra reglene i
 * `src/regler/felt/`, så siden er alltid i synk med koden.
 */
const Feltregler = () => {
    const intl = useIntl();
    return (
        <VStack gap="space-8" className="max-w-4xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Feltregler i uttaksplanen</Heading>
                <BodyLong>
                    Når brukeren fyller ut skjemaet for å legge til eller endre en periode, kjører hvert felt sine
                    egne regler. Disse reglene gir tilbakemelding på det enkelte feltet (f.eks. «Stillingsprosent
                    må være mindre enn 100 %»), i tillegg til de overordnede valideringsreglene som kjøres ved
                    lagring.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert fra regelkatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/felt/</code>). Endrer du regelteksten der, endrer denne
                    siden seg også.
                </BodyLong>
            </VStack>
            {ALLE_FELTREGLER.map((område, områdeIdx) => (
                <VStack key={område.id} gap="space-2">
                    <Heading size="medium">
                        {områdeIdx + 1}. {område.feltnavn}
                    </Heading>
                    <BodyLong className="italic text-ax-text-subtle">{område.beskrivelse}</BodyLong>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Regel-id</Table.HeaderCell>
                                <Table.HeaderCell>Hva regelen sier</Table.HeaderCell>
                                <Table.HeaderCell>Feilmelding til brukeren</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {område.regler.map((regel, idx) => (
                                <Table.Row key={regel.id}>
                                    <Table.DataCell>{idx + 1}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.id}</Table.DataCell>
                                    <Table.DataCell>{regel.beskrivelse}</Table.DataCell>
                                    <Table.DataCell>
                                        {intl.formatMessage({ id: regel.feilmeldingId })}
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
    title: 'Uttaksplan/Feltregler (dokumentasjon)',
    component: Feltregler,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <IntlProvider locale="nb" messages={messages}>
                <Story />
            </IntlProvider>
        ),
    ],
} satisfies Meta<typeof Feltregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleFeltregler: Story = {};
