import { ExclamationmarkTriangleFillIcon, PlusIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons';
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

/**
 * Demo-container for `small`/`medium`/`xl`-kort. Kortet sjølv er responsivt (fyller
 * kontaineren sin, jf. `w-full`-klassane i `Card.tsx`) – denne wrapperen set difor berre ei
 * maks-breidde (`breidde`), ikkje ei fast breidde. Prosentbreidda gjer at kortet automatisk
 * krympar/veks når du endrar breidda på Storybook-panelet/nettlesarvindauget, i staden for å
 * ha ei hardkoda piksel-breidde som ser fastbreidde ut uansett vindaugsstorleik.
 */
const Ramme = ({ children, breidde = 260 }: { children: ReactNode; breidde?: number }) => (
    <div style={{ width: '100%', maxWidth: breidde, minWidth: 100 }}>{children}</div>
);

// ---------------------------------------------------------------------------
// Type × storleik – heile «Størrelser»-matrisa frå card-anatomi.html: éin rad per
// type (Mor/Far/Felles/Ferie), éin kolonne per storleik (micro/small/medium/xl).
// Farge-tonen er konstant på tvers av storleikane for same type, slik at kortet er
// att kjennbart same om det ligg i ei månedscelle eller i dagsvisninga.

interface TypeRadData {
    namn: string;
    tone: CardTone;
    ikon: ReactNode;
    microDag: number;
    smallDato: string;
    smallLbl: string;
    mediumLbl: string;
    mediumDato: string;
    mediumChip: string;
    xl: Omit<XlKortProps, 'tone' | 'ikon'>;
}

const TYPE_DATA: TypeRadData[] = [
    {
        namn: 'Mors periode',
        tone: 'accent',
        ikon: <PersonIkon />,
        microDag: 15,
        smallDato: '15. mai',
        smallLbl: 'Foreldrepenger',
        mediumLbl: 'Mors periode',
        mediumDato: '15. mai 2026',
        mediumChip: '100 % · Mødrekvote',
        xl: {
            tittel: 'Mors periode',
            dato: '15. mai 2026',
            kvotetype: 'Mødrekvote',
            body: (
                <>
                    Mor er hjemme i foreldrepenger denne dagen. <strong>100 % uttak.</strong>
                </>
            ),
            chips: ['Mødrekvote', 'Dag 12 av 75'],
            primærKnapp: 'Endre',
            sekundærKnapp: 'Slett',
        },
    },
    {
        namn: 'Fars periode',
        tone: 'success',
        ikon: <PersonEnkelIkon />,
        microDag: 22,
        smallDato: '22. mai',
        smallLbl: 'Foreldrepenger',
        mediumLbl: 'Fars periode',
        mediumDato: '22. mai 2026',
        mediumChip: '50 % · Fedrekvote',
        xl: {
            tittel: 'Fars periode',
            dato: '22. mai 2026',
            kvotetype: 'Fedrekvote',
            body: (
                <>
                    Far er hjemme i foreldrepenger denne dagen. <strong>50 % uttak, 50 % jobb.</strong>
                </>
            ),
            chips: ['Fedrekvote', 'Gradert uttak'],
            primærKnapp: 'Endre',
            sekundærKnapp: 'Slett',
        },
    },
    {
        namn: 'Fellesperiode',
        tone: 'brand-beige',
        ikon: <PersonGruppeIkon />,
        microDag: 3,
        smallDato: '3. jun',
        smallLbl: 'Fellesperiode',
        mediumLbl: 'Fellesperiode',
        mediumDato: '3. juni 2026',
        mediumChip: 'Mor tar uttak',
        xl: {
            tittel: 'Fellesperiode',
            dato: '3. juni 2026',
            kvotetype: 'Mor på uttak',
            body: (
                <>
                    Dette er en fellesperiode dere deler. <strong>Mor tar 100 % uttak</strong> denne dagen.
                </>
            ),
            chips: ['Fellesperiode', '75 dager igjen'],
            primærKnapp: 'Endre',
            sekundærKnapp: 'Bytt til far',
        },
    },
    {
        namn: 'Ferie',
        tone: 'warning',
        ikon: <SolIkon />,
        microDag: 10,
        smallDato: '10. jul',
        smallLbl: 'Ferie',
        mediumLbl: 'Ferie',
        mediumDato: '10. juli 2026',
        mediumChip: 'Mor',
        xl: {
            tittel: 'Ferie',
            dato: '10. juli 2026',
            kvotetype: 'Mor',
            body: (
                <>
                    Mor har lagt inn ferie denne dagen. <strong>Ferie påvirker ikke kvoten din.</strong>
                </>
            ),
            chips: ['Mors ferie', '2 av 25 feriedager'],
            primærKnapp: 'Endre',
            sekundærKnapp: 'Slett',
        },
    },
];

const MatrixCelle = ({ children, breidde }: { children: ReactNode; breidde: number }) => (
    <div style={{ width: breidde, flexShrink: 0 }}>{children}</div>
);

export const TyperOgStorleikar: Story = {
    name: 'Størrelser (type × storleik)',
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-40">
            {TYPE_DATA.map((data) => (
                <VStack gap="space-8" key={data.namn}>
                    <Heading size="small">{data.namn}</Heading>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <MatrixCelle breidde={44}>
                            <div style={{ width: 44, height: 44 }}>
                                <Card size="micro" tone={data.tone}>
                                    {data.microDag}
                                </Card>
                            </div>
                        </MatrixCelle>

                        <MatrixCelle breidde={132}>
                            <Card size="small" tone={data.tone}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <CardIconCircle size="small" tone={data.tone}>
                                        {data.ikon}
                                    </CardIconCircle>
                                    <CardDate size="small">{data.smallDato}</CardDate>
                                </div>
                                <CardLabel size="small">{data.smallLbl}</CardLabel>
                            </Card>
                        </MatrixCelle>

                        <MatrixCelle breidde={260}>
                            <Card size="medium" tone={data.tone}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <CardIconCircle size="medium" tone={data.tone}>
                                        {data.ikon}
                                    </CardIconCircle>
                                    <CardLabel size="medium">{data.mediumLbl}</CardLabel>
                                </div>
                                <CardDate size="medium">{data.mediumDato}</CardDate>
                                <CardChip size="medium" tone={data.tone}>
                                    {data.mediumChip}
                                </CardChip>
                            </Card>
                        </MatrixCelle>

                        <MatrixCelle breidde={420}>
                            <XlKort tone={data.tone} ikon={data.ikon} {...data.xl} />
                        </MatrixCelle>
                    </div>
                </VStack>
            ))}
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// Responsivitet – same kort ved fleire faste kontainer-breidder, side om side, for å
// vise (utan at du treng endre nettlesarvindauget) at small/medium/xl fyller kontaineren
// sin og krympar/veks med han. Micro er ikkje med her – han er meint å ha ei fast
// 44×44-storleik (kalender-cella).

const BREIDDER = [140, 220, 340] as const;

export const Responsivitet: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-32">
            <VStack gap="space-8">
                <Heading size="small">Small – same kort ved 140px, 220px og 340px kontainer-breidde</Heading>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {BREIDDER.map((breidde) => (
                        <div key={breidde} style={{ width: breidde, border: '1px dashed #ccc', padding: 4 }}>
                            <Card size="small" tone="accent">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                    <CardIconCircle size="small" tone="accent">
                                        <PersonIkon />
                                    </CardIconCircle>
                                    <CardDate size="small">15. mai</CardDate>
                                </div>
                                <CardLabel size="small">Mødrekvote</CardLabel>
                            </Card>
                        </div>
                    ))}
                </div>
            </VStack>

            <VStack gap="space-8">
                <Heading size="small">Medium – same kort ved 140px, 220px og 340px kontainer-breidde</Heading>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {BREIDDER.map((breidde) => (
                        <div key={breidde} style={{ width: breidde, border: '1px dashed #ccc', padding: 4 }}>
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
                        </div>
                    ))}
                </div>
                <p style={{ fontSize: 12, color: '#666' }}>
                    Kortet er kappa på maks 260px (jf. anatomien), så ved 340px-kontaineren ser du at det stoggar der i
                    staden for å halde fram å vekse.
                </p>
            </VStack>

            <VStack gap="space-8">
                <Heading size="small">XL – same kort ved 340px, 420px og 520px kontainer-breidde</Heading>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {[340, 420, 520].map((breidde) => (
                        <div key={breidde} style={{ width: breidde, border: '1px dashed #ccc', padding: 4 }}>
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
                        </div>
                    ))}
                </div>
            </VStack>
        </VStack>
    ),
};

// ---------------------------------------------------------------------------
// Dei tre visuelle kanalane samla – jf. «Tre visuelle kanaler» i card-anatomi.html:
// tone (bakgrunn), state (border + badge) og selected (invertering). Kanalane er
// uavhengige av kvarandre og kan derfor kombinerast fritt utan å kollidere.

export const TreVisuelleKanaler: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">Tre uavhengige kanalar</Heading>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <VStack gap="space-4">
                    <Ramme breidde={200}>
                        <Card size="medium" tone="accent">
                            <CardLabel size="medium">Mors periode</CardLabel>
                            <CardDate size="medium">15. mai 2026</CardDate>
                        </Card>
                    </Ramme>
                    <Heading size="xsmall">Type → bakgrunn</Heading>
                    <p style={{ fontSize: 12, color: '#666', maxWidth: 200 }}>
                        Kven kortet tilhøyrer. Soft type-farge fyller flata, konstant på tvers av storleikar.
                    </p>
                </VStack>
                <VStack gap="space-4">
                    <Ramme breidde={200}>
                        <Card size="medium" tone="accent" state="warning">
                            <CardLabel size="medium">Mors periode</CardLabel>
                            <CardDate size="medium">15. mai 2026</CardDate>
                            <CardBadge tone="warning" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                                Ufullstendig
                            </CardBadge>
                        </Card>
                    </Ramme>
                    <Heading size="xsmall">State → border + badge</Heading>
                    <p style={{ fontSize: 12, color: '#666', maxWidth: 200 }}>
                        Status (ufullstendig, mangler dekning, overlapp). Legg seg oppå utan å bytte bakgrunnen.
                    </p>
                </VStack>
                <VStack gap="space-4">
                    <Ramme breidde={200}>
                        <Card size="medium" tone="accent" selected>
                            <CardLabel size="medium">Mors periode</CardLabel>
                            <CardDate size="medium">15. mai 2026</CardDate>
                        </Card>
                    </Ramme>
                    <Heading size="xsmall">Valgt → invertering</Heading>
                    <p style={{ fontSize: 12, color: '#666', maxWidth: 200 }}>
                        Markert i kalenderen. Flippar til sterk type-farge med kvit tekst i staden for enno ein farge
                        eller border.
                    </p>
                </VStack>
            </div>

            <Heading size="small">Kanalane kolliderer aldri – dei kan kombinerast fritt</Heading>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent">
                        <CardLabel size="medium">Berre tone</CardLabel>
                        <CardDate size="medium">15. mai 2026</CardDate>
                    </Card>
                </Ramme>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent" state="warning">
                        <CardLabel size="medium">Tone + state</CardLabel>
                        <CardDate size="medium">15. mai 2026</CardDate>
                        <CardBadge tone="warning" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                            Ufullstendig
                        </CardBadge>
                    </Card>
                </Ramme>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent" state="warning" selected>
                        <CardLabel size="medium">Tone + state + valgt</CardLabel>
                        <CardDate size="medium">15. mai 2026</CardDate>
                        <CardBadge tone="warning" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                            Ufullstendig
                        </CardBadge>
                    </Card>
                </Ramme>
            </div>
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
// State-kanalen (border + badge, uavhengig av tone) – dei fire variantane frå
// «States»-seksjonen i card-anatomi.html: Ingen plan, Ufullstendig, Mangler dekning, Overlapp.
// State legg seg oppå bakgrunnen som ein border + badge og bytter aldri ut typen sin farge.
// To av dei fire (Ingen plan, Mangler dekning) har ingen type enno, så dei brukar nøytral/
// skravert bakgrunn i staden for ein type-farge.

export const States: Story = {
    args: { size: 'medium' },
    render: () => (
        <VStack gap="space-8">
            <Heading size="small">State – tilstand lagt oppå bakgrunnen, bytter aldri han</Heading>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Ramme breidde={200}>
                    <Card size="medium">
                        <CardEmptyIndicator />
                        <CardLabel size="medium">Ingen plan</CardLabel>
                        <CardDate size="medium">
                            <PlusIcon aria-hidden style={{ display: 'inline', verticalAlign: 'middle' }} /> Legg til
                        </CardDate>
                    </Card>
                </Ramme>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent" state="warning">
                        <CardLabel size="medium">Mors periode</CardLabel>
                        <CardDate size="medium">15. mai 2026</CardDate>
                        <CardBadge tone="warning" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                            Ufullstendig
                        </CardBadge>
                    </Card>
                </Ramme>
                <Ramme breidde={200}>
                    <Card size="medium" hatched>
                        <CardEmptyIndicator tone="danger" />
                        <CardLabel size="medium">Udekket dag</CardLabel>
                        <CardDate size="medium">15. mai 2026</CardDate>
                        <CardBadge tone="danger" icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>
                            Taper dager
                        </CardBadge>
                    </Card>
                </Ramme>
                <Ramme breidde={200}>
                    <Card size="medium" tone="accent" state="danger">
                        <CardLabel size="medium">Mors periode</CardLabel>
                        <CardDate size="medium">15. mai 2026</CardDate>
                        <CardBadge tone="danger" icon={<XMarkOctagonFillIcon aria-hidden />}>
                            Overlapp
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
