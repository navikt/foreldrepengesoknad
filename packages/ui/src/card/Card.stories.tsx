import { CalendarIcon, ExclamationmarkTriangleFillIcon, PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';

import { Button, Heading, VStack } from '@navikt/ds-react';

import { PersonEnkelIkon, PersonGruppeIkon, PersonIkon, SolIkon } from '../icons/PeriodeIkoner';
import { Card } from './Card';
import { CardActions } from './CardActions';
import { CardBadge } from './CardBadge';
import { CardBody } from './CardBody';
import { CardChip } from './CardChip';
import { CardDate } from './CardDate';
import { CardEmptyIndicator } from './CardEmptyIndicator';
import { CardIconCircle } from './CardIconCircle';
import { CardLabel } from './CardLabel';
import { CardTone } from './types';

const meta = {
    title: 'Card',
    component: Card,
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Nokre eksempeltonar for demoen. Sjølve `Card`-familien kjenner berre den generiske
 * `CardTone`-typen (accent/success/brand-beige/warning/danger) – kva desse *tyder* i
 * uttaksplan-samanheng (MOR/FAR/FELLES/FERIE) er opp til forbrukaren å avgjere.
 */
const TONAR: CardTone[] = ['accent', 'success', 'brand-beige', 'warning', 'danger'];

const Ramme = ({ children, breidde = 260 }: { children: ReactNode; breidde?: number }) => (
    <div style={{ width: breidde }}>{children}</div>
);

// ---------------------------------------------------------------------------
// Storleikar

export const Storleikar: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-32">
            <VStack gap="space-8">
                <Heading size="small">Micro – kalender-celle (44×44)</Heading>
                <div style={{ display: 'flex', gap: 8 }}>
                    {TONAR.map((tone, i) => (
                        <div key={tone} style={{ width: 44, height: 44 }}>
                            <Card size="micro" tone={tone}>
                                {15 + i}
                            </Card>
                        </div>
                    ))}
                </div>
            </VStack>

            <VStack gap="space-8">
                <Heading size="small">Small – ukesvisning</Heading>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Ramme breidde={132}>
                        <Card size="small" tone="accent">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <CardIconCircle size="small" tone="accent">
                                    <PersonIkon />
                                </CardIconCircle>
                                <CardDate size="small">15. mai</CardDate>
                            </div>
                            <CardLabel size="small">Mor</CardLabel>
                        </Card>
                    </Ramme>
                </div>
            </VStack>

            <VStack gap="space-8">
                <Heading size="small">Medium – listevisning</Heading>
                <Ramme>
                    <Card size="medium" tone="success">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CardIconCircle size="medium" tone="success">
                                <PersonEnkelIkon />
                            </CardIconCircle>
                            <CardLabel size="medium">Fars periode</CardLabel>
                        </div>
                        <CardDate size="medium">15.–29. mai 2026</CardDate>
                        <CardChip size="medium" tone="success">
                            100 % · Fedrekvote
                        </CardChip>
                    </Card>
                </Ramme>
            </VStack>

            <VStack gap="space-8">
                <Heading size="small">XL – dagsvisning/detalj</Heading>
                <Ramme breidde={420}>
                    <Card size="xl" tone="brand-beige">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                            <CardIconCircle size="xl" tone="brand-beige">
                                <PersonGruppeIkon />
                            </CardIconCircle>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <CardLabel size="xl">Fellesperiode</CardLabel>
                                <CardDate size="xl">15. mai 2026 · Foreldrepengar</CardDate>
                            </div>
                        </div>
                        <CardBody>
                            <strong>16 dagar</strong> er sett av til fellesperiode. Begge foreldre kan bruke desse
                            dagane.
                        </CardBody>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <CardChip size="xl" tone="brand-beige">
                                Foreldrepengar
                            </CardChip>
                            <CardChip size="xl" tone="brand-beige">
                                75 dagar igjen
                            </CardChip>
                        </div>
                        <CardActions>
                            <Button size="small" variant="primary">
                                Endre
                            </Button>
                            <Button size="small" variant="secondary" icon={<TrashIcon aria-hidden />}>
                                Slett
                            </Button>
                        </CardActions>
                    </Card>
                </Ramme>
            </VStack>
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// Tone-kanalen

export const Toner: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">Tone – kva kortet «er» (eig bakgrunnen)</Heading>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {TONAR.map((tone) => (
                    <Ramme key={tone} breidde={160}>
                        <Card size="medium" tone={tone}>
                            <CardLabel size="medium">{tone}</CardLabel>
                            <CardDate size="medium">Soft bakgrunn</CardDate>
                        </Card>
                    </Ramme>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Ramme breidde={160}>
                    <Card size="medium">
                        <CardLabel size="medium">Ingen tone</CardLabel>
                        <CardDate size="medium">Nøytral, tom dag</CardDate>
                    </Card>
                </Ramme>
            </div>
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// State-kanalen (border + badge, uavhengig av tone)

export const Statar: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">State – tilstand lagt oppå bakgrunnen, bytter aldri han</Heading>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent" state="warning">
                        <CardLabel size="medium">Ufullstendig</CardLabel>
                        <CardDate size="medium">15. mai</CardDate>
                        <CardBadge tone="warning" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                            Mangler aktivitet
                        </CardBadge>
                    </Card>
                </Ramme>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent" state="danger">
                        <CardLabel size="medium">Kollisjon</CardLabel>
                        <CardDate size="medium">15. mai</CardDate>
                        <CardBadge tone="danger" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                            Overlappar med søknad
                        </CardBadge>
                    </Card>
                </Ramme>
            </div>
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// Selected-kanalen (invertering: soft/nøytral -> sterk fylling)

export const Valgt: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">Selected – invertering, aldri ein ny farge/border</Heading>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['accent', 'success'] as const).map((tone) => (
                    <div key={tone} style={{ display: 'flex', gap: 8 }}>
                        <Ramme breidde={160}>
                            <Card size="medium" tone={tone}>
                                <CardLabel size="medium">{tone}</CardLabel>
                                <CardDate size="medium">Ikkje valgt</CardDate>
                            </Card>
                        </Ramme>
                        <Ramme breidde={160}>
                            <Card size="medium" tone={tone} selected>
                                <CardLabel size="medium">{tone}</CardLabel>
                                <CardDate size="medium">Valgt</CardDate>
                            </Card>
                        </Ramme>
                    </div>
                ))}
            </div>
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// Spesialtilfelle: tom dag og manglande dekning

export const TomDagOgManglandeDekning: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">Ingen tone enno – nøytral, roleg framtoning</Heading>
            <div style={{ display: 'flex', gap: 8 }}>
                <Ramme breidde={160}>
                    <Card size="medium">
                        <CardEmptyIndicator />
                        <CardLabel size="medium">Ingen periode enno</CardLabel>
                        <CardDate size="medium">
                            <PlusIcon aria-hidden style={{ display: 'inline', verticalAlign: 'middle' }} /> Legg til
                        </CardDate>
                    </Card>
                </Ramme>
                <Ramme breidde={160}>
                    <Card size="medium" hatched>
                        <CardEmptyIndicator tone="danger" />
                        <CardLabel size="medium">Mangler dekning</CardLabel>
                        <CardDate size="medium">15. mai</CardDate>
                    </Card>
                </Ramme>
            </div>
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// Klikkbart kort (button) vs. reint visningskort (div)

export const KlikkbartVsStatisk: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">Rendrar knapp når `onClick` er sett, elles ein div</Heading>
            <div style={{ display: 'flex', gap: 8 }}>
                <Ramme breidde={160}>
                    <Card size="medium" tone="accent" onClick={() => alert('Klikka!')}>
                        <CardLabel size="medium">Klikkbar</CardLabel>
                        <CardDate size="medium">Tab + Enter/Space verkar</CardDate>
                    </Card>
                </Ramme>
                <Ramme breidde={160}>
                    <Card size="medium" tone="accent">
                        <CardLabel size="medium">Berre visning</CardLabel>
                        <CardDate size="medium">Ingen interaksjon</CardDate>
                    </Card>
                </Ramme>
            </div>
        </VStack>
    ),
};

export const Ferie: Story = {
    args: { size: 'small' },
    render: () => (
        <Ramme breidde={160}>
            <Card size="small" tone="warning">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <CardIconCircle size="small" tone="warning">
                        <SolIkon />
                    </CardIconCircle>
                    <CardDate size="small">
                        <CalendarIcon aria-hidden style={{ display: 'inline', verticalAlign: 'middle' }} /> 14. mai
                    </CardDate>
                </div>
                <CardLabel size="small">Ferie</CardLabel>
            </Card>
        </Ramme>
    ),
};

// ---------------------------------------------------------------------------
// XL – dei fire eksakte eksempla frå card-anatomi.html (dagsvisning/detalj-kolonne).
// Rekkefølgja i xl-titles er: <lbl> på eiga linje, så <date> «dato · kvotetype» på
// linja under. Deretter fritekst i body, to chips i xl-meta, og cta-row med knappar.

interface XlKortProps {
    tone: CardTone;
    ikon: ReactNode;
    tittel: string;
    dato: string;
    kvotetype: string;
    body: ReactNode;
    chips: [string, string];
    primærKnapp: string;
    sekundærKnapp: string;
}

const XlKort = ({ tone, ikon, tittel, dato, kvotetype, body, chips, primærKnapp, sekundærKnapp }: XlKortProps) => (
    <Card size="xl" tone={tone}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <CardIconCircle size="xl" tone={tone}>
                {ikon}
            </CardIconCircle>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardLabel size="xl">{tittel}</CardLabel>
                <CardDate size="xl">
                    {dato} · {kvotetype}
                </CardDate>
            </div>
        </div>
        <CardBody>{body}</CardBody>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {chips.map((chip) => (
                <CardChip key={chip} size="xl" tone={tone}>
                    {chip}
                </CardChip>
            ))}
        </div>
        <CardActions>
            <Button size="small" variant="primary">
                {primærKnapp}
            </Button>
            <Button size="small" variant="secondary">
                {sekundærKnapp}
            </Button>
        </CardActions>
    </Card>
);

export const XlDagsvisning: Story = {
    name: 'XL – dagsvisning (eksakte skisser)',
    args: { size: 'xl' },
    render: () => (
        <VStack gap="space-24">
            <Ramme breidde={420}>
                <XlKort
                    tone="accent"
                    ikon={<PersonIkon />}
                    tittel="Mors periode"
                    dato="15. mai 2026"
                    kvotetype="Mødrekvote"
                    body={
                        <>
                            Mor er hjemme i foreldrepenger denne dagen. <strong>100 % uttak.</strong>
                        </>
                    }
                    chips={['Mødrekvote', 'Dag 12 av 75']}
                    primærKnapp="Endre"
                    sekundærKnapp="Slett"
                />
            </Ramme>
            <Ramme breidde={420}>
                <XlKort
                    tone="success"
                    ikon={<PersonEnkelIkon />}
                    tittel="Fars periode"
                    dato="22. mai 2026"
                    kvotetype="Fedrekvote"
                    body={
                        <>
                            Far er hjemme i foreldrepenger denne dagen. <strong>50 % uttak, 50 % jobb.</strong>
                        </>
                    }
                    chips={['Fedrekvote', 'Gradert uttak']}
                    primærKnapp="Endre"
                    sekundærKnapp="Slett"
                />
            </Ramme>
            <Ramme breidde={420}>
                <XlKort
                    tone="brand-beige"
                    ikon={<PersonGruppeIkon />}
                    tittel="Fellesperiode"
                    dato="3. juni 2026"
                    kvotetype="Mor på uttak"
                    body={
                        <>
                            Dette er en fellesperiode dere deler. <strong>Mor tar 100 % uttak</strong> denne dagen.
                        </>
                    }
                    chips={['Fellesperiode', '75 dager igjen']}
                    primærKnapp="Endre"
                    sekundærKnapp="Bytt til far"
                />
            </Ramme>
            <Ramme breidde={420}>
                <XlKort
                    tone="warning"
                    ikon={<SolIkon />}
                    tittel="Ferie"
                    dato="10. juli 2026"
                    kvotetype="Mor"
                    body={
                        <>
                            Mor har lagt inn ferie denne dagen. <strong>Ferie påvirker ikke kvoten din.</strong>
                        </>
                    }
                    chips={['Mors ferie', '2 av 25 feriedager']}
                    primærKnapp="Endre"
                    sekundærKnapp="Slett"
                />
            </Ramme>
        </VStack>
    ),
};
