import {
    CalendarIcon,
    ExclamationmarkTriangleFillIcon,
    ParasolBeachFillIcon,
    PersonFillIcon,
    PersonGroupFillIcon,
    PlusIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';

import { Button, Heading, VStack } from '@navikt/ds-react';

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
                                    <PersonFillIcon aria-hidden />
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
                                <PersonFillIcon aria-hidden />
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
                                <PersonGroupFillIcon aria-hidden />
                            </CardIconCircle>
                            <div style={{ flex: 1 }}>
                                <CardLabel size="xl">Fellesperiode</CardLabel>
                                <CardDate size="xl">15. mai 2026</CardDate>
                            </div>
                        </div>
                        <CardBody>
                            <strong>16 dagar</strong> er sett av til fellesperiode. Begge foreldre kan bruke desse
                            dagane.
                        </CardBody>
                        <CardChip size="xl" tone="brand-beige">
                            100 % · Foreldrepengar
                        </CardChip>
                        <CardActions>
                            <Button size="small" variant="secondary" icon={<TrashIcon aria-hidden />}>
                                Slett
                            </Button>
                            <Button size="small" variant="secondary">
                                Endre
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
                        <ParasolBeachFillIcon aria-hidden />
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
