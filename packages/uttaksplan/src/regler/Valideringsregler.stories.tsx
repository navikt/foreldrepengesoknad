import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { BodyLong, Heading, Table, VStack } from '@navikt/ds-react';

import { ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_OMRÅDE } from './validering/arbeidOgUttakDeFørsteSeksUkene';
import { FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_OMRÅDE } from './validering/farMedmorMaksToUkerRundtFødsel';
import { FAR_MEDMOR_RUNDT_FØDSEL_OMRÅDE } from './validering/farMedmorRundtFødsel';
import { SAMTIDIG_UTTAK_OMRÅDE } from './validering/samtidigUttak';
import { Valideringsområde } from './validering/types';

const ALLE_VALIDERINGSREGLER: ReadonlyArray<Valideringsområde<any>> = [
    ARBEID_OG_UTTAK_FØRSTE_SEKS_UKER_OMRÅDE,
    SAMTIDIG_UTTAK_OMRÅDE,
    FAR_MEDMOR_RUNDT_FØDSEL_OMRÅDE,
    FAR_MEDMOR_MAKS_TO_UKER_RUNDT_FØDSEL_OMRÅDE,
];

/**
 * Selvdokumenterende Storybook-side: viser valideringsreglene som kjøres
 * ved submit (lagring) av en periode. Disse reglene kjøres etter at
 * feltvalideringene har passert, og sjekker tverrgående betingelser som
 * ikke kan fanges opp av enkeltfelt alene.
 *
 * Innholdet blir generert direkte fra reglene i `src/regler/validering/`, så siden er
 * alltid i synk med koden.
 */
const Valideringsregler = () => {
    const intl = useIntl();
    return (
        <VStack gap="space-8" className="max-w-4xl p-6">
            <VStack gap="space-4">
                <Heading size="xlarge">Valideringsregler ved lagring av periode</Heading>
                <BodyLong>
                    Når brukeren lagrer en ny eller endret periode i uttaksplanen, blir reglene under sjekket i
                    rekkefølge — etter at feltvalideringene allerede har passert. Første regel som er brutt
                    bestemmer hvilken feilmelding brukeren får. Samme regler gjelder både i listen og i kalenderen.
                </BodyLong>
                <BodyLong>
                    Siden er autogenerert fra regelkatalogen i koden ({' '}
                    <code>packages/uttaksplan/src/regler/validering/</code>). Endrer du regelteksten der, endrer denne siden
                    seg også.
                </BodyLong>
            </VStack>
            {ALLE_VALIDERINGSREGLER.map((gruppe, gruppeIdx) => (
                <VStack key={gruppe.id} gap="space-2">
                    <Heading size="medium">
                        {gruppeIdx + 1}. {gruppe.område}
                    </Heading>
                    <BodyLong className="italic text-ax-text-subtle">{gruppe.beskrivelse}</BodyLong>
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
                            {gruppe.regler.map((regel, idx) => (
                                <Table.Row key={regel.id}>
                                    <Table.DataCell>{idx + 1}</Table.DataCell>
                                    <Table.DataCell className="font-mono text-xs">{regel.id}</Table.DataCell>
                                    <Table.DataCell>{regel.beskrivelse}</Table.DataCell>
                                    <Table.DataCell className="text-ax-text-warning">
                                        «{intl.formatMessage({ id: regel.feilmeldingId })}»
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
    title: 'Uttaksplan/Valideringsregler (dokumentasjon)',
    component: Valideringsregler,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Valideringsregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleRegler: Story = {};
