import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ExclamationmarkTriangleFillIcon,
    HeartFillIcon,
    PencilIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    Dialog,
    HStack,
    Heading,
    List,
    Switch,
    Tag,
    ToggleGroup,
    VStack,
} from '@navikt/ds-react';

import { Manedsvisning } from './Manedsvisning';
import { ManedsvisningHendelse } from './types/ManedsvisningHendelse';
import { ManedsvisningPeriode, ManedsvisningPeriodeType } from './types/ManedsvisningPeriode';

const meta = {
    title: 'Manedsvisning',
    component: Manedsvisning,
} satisfies Meta<typeof Manedsvisning>;
export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Mock-data — same scenario som i konseptskissa (mai 2026)
// ---------------------------------------------------------------------------

const PERIODER_MAI_2026: ManedsvisningPeriode[] = [
    { fom: '2026-05-04', tom: '2026-05-08', type: 'MOR', srText: 'Mors periode, 4.–8. mai' },
    { fom: '2026-05-11', tom: '2026-05-12', type: 'MOR', srText: 'Mors periode, 11.–12. mai' },
    { fom: '2026-05-13', tom: '2026-05-13', type: 'FELLES', srText: 'Fellesperiode, 13. mai' },
    { fom: '2026-05-14', tom: '2026-05-14', type: 'FERIE', srText: 'Ferie, 14. mai' },
    {
        fom: '2026-05-15',
        tom: '2026-05-15',
        type: 'FAR',
        srText: 'Fars periode, 15. mai. Mor mangler aktivitet.',
        harAdvarsel: true,
    },
    { fom: '2026-05-18', tom: '2026-05-22', type: 'FAR', srText: 'Fars periode, 18.–22. mai' },
    { fom: '2026-05-25', tom: '2026-05-29', type: 'FAR', srText: 'Fars periode, 25.–29. mai' },
];

const HENDELSER_MAI_2026: ManedsvisningHendelse[] = [
    {
        dato: '2026-05-01',
        label: 'Termin',
        ikon: <HeartFillIcon aria-hidden width={22} height={22} />,
    },
];

export const Standard: Story = {
    args: {
        year: 2026,
        month: 4,
        periods: PERIODER_MAI_2026,
        hendelser: HENDELSER_MAI_2026,
        showWeekNumbers: true,
        hideWeekend: false,
    },
};

export const UtenUkenummer: Story = {
    args: {
        ...Standard.args,
        showWeekNumbers: false,
    },
};

export const HelgSkjult: Story = {
    args: {
        ...Standard.args,
        hideWeekend: true,
    },
};

export const TomMåned: Story = {
    args: {
        year: 2026,
        month: 5,
        periods: [],
        hendelser: [],
    },
};

// ---------------------------------------------------------------------------
// Interaktiv demo
//
// Dette er ting frå malen (manedsvisning.html) som *ikkje* er ein del av sjølve
// Manedsvisning-komponenten, på same måte som månedsnavigering, filter, legend og
// redigeringsverktøy heller ikkje er ein del av `Calendar` – dei bur i UttaksplanKalender,
// som er den som *bruker* Calendar. Her viser vi korfor/korleis Manedsvisning kan brukast i ein
// slik samansett kontekst, uten at komponenten sjølv veit noko om navigering, filter eller modal.
// ---------------------------------------------------------------------------

type DagDetalj = {
    tittel: string;
    dato: string;
    body: string;
    chips: string[];
    advarsel?: string;
};

const byggDagDetaljer = (): Record<string, DagDetalj> => {
    const detaljer: Record<string, DagDetalj> = {
        '2026-05-01': {
            tittel: 'Termin',
            dato: dayjs('2026-05-01').format('dddd D. MMMM YYYY'),
            body: 'Forventet termindato. Termin er en hendelse, ikke en permisjonsperiode.',
            chips: ['Hendelse'],
        },
    };

    const morDager = [4, 5, 6, 7, 8, 11, 12];
    morDager.forEach((dag, i) => {
        const iso = dayjs('2026-05-01').date(dag).format('YYYY-MM-DD');
        detaljer[iso] = {
            tittel: 'Mors periode',
            dato: dayjs(iso).format('dddd D. MMMM YYYY'),
            body: 'Ada er hjemme i foreldrepenger denne dagen. 100 % uttak.',
            chips: ['Mødrekvote', `Dag ${i + 1} av 75`],
        };
    });

    detaljer['2026-05-13'] = {
        tittel: 'Fellesperiode',
        dato: dayjs('2026-05-13').format('dddd D. MMMM YYYY'),
        body: 'Dette er en fellesperiode dere deler. Ada tar 100 % uttak denne dagen.',
        chips: ['Fellesperiode', 'Mor på uttak', '74 dager igjen'],
    };

    detaljer['2026-05-14'] = {
        tittel: 'Ferie Ada',
        dato: dayjs('2026-05-14').format('dddd D. MMMM YYYY'),
        body: 'Ada har lagt inn ferie denne dagen. Ferie påvirker ikke kvoten din.',
        chips: ['Mors ferie', '1 av 25 feriedager'],
    };

    detaljer['2026-05-15'] = {
        tittel: 'Fars periode',
        dato: dayjs('2026-05-15').format('dddd D. MMMM YYYY'),
        body: 'Erlend er hjemme i foreldrepenger. 100 % uttak.',
        chips: ['Fedrekvote', '100 %'],
        advarsel: 'Mor mangler aktivitet, og det må fikses før du kan sende søknaden.',
    };

    const farDager = [18, 19, 20, 21, 22, 25, 26, 27, 28, 29];
    farDager.forEach((dag, i) => {
        const iso = dayjs('2026-05-01').date(dag).format('YYYY-MM-DD');
        detaljer[iso] = {
            tittel: 'Fars periode',
            dato: dayjs(iso).format('dddd D. MMMM YYYY'),
            body: 'Erlend er hjemme i foreldrepenger denne dagen. 100 % uttak.',
            chips: ['Fedrekvote', `Dag ${i + 1} av 75`],
        };
    });

    return detaljer;
};

const DAG_DETALJER = byggDagDetaljer();

const LEGEND: Array<{ type: ManedsvisningPeriodeType; farge: string; tekst: string }> = [
    { type: 'MOR', farge: 'bg-ax-bg-accent-soft', tekst: 'Mors periode' },
    { type: 'FAR', farge: 'bg-ax-bg-success-soft', tekst: 'Fars periode' },
    { type: 'FELLES', farge: 'bg-ax-bg-brand-beige-soft', tekst: 'Fellesperiode' },
    { type: 'FERIE', farge: 'bg-ax-bg-warning-soft', tekst: 'Ferie' },
];

const InteraktivDemo = () => {
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(4);
    const [filter, setFilter] = useState<'ALLE' | 'MOR' | 'FAR'>('ALLE');
    const [skjulHelg, setSkjulHelg] = useState(false);
    const [valgtDag, setValgtDag] = useState<string | undefined>(undefined);

    const periods = useMemo(
        () => (filter === 'ALLE' ? PERIODER_MAI_2026 : PERIODER_MAI_2026.filter((p) => p.type === filter)),
        [filter],
    );

    const tilgjengeligeDager = useMemo(() => Object.keys(DAG_DETALJER).sort((a, b) => a.localeCompare(b)), []);

    const gåTilForrigeMåned = () => {
        const forrige = dayjs().year(year).month(month).subtract(1, 'month');
        setYear(forrige.year());
        setMonth(forrige.month());
    };

    const gåTilNesteMåned = () => {
        const neste = dayjs().year(year).month(month).add(1, 'month');
        setYear(neste.year());
        setMonth(neste.month());
    };

    const naviger = (retning: 1 | -1) => {
        if (!valgtDag) {
            return;
        }
        const index = tilgjengeligeDager.indexOf(valgtDag);
        const nyIndex = index + retning;
        if (nyIndex >= 0 && nyIndex < tilgjengeligeDager.length) {
            setValgtDag(tilgjengeligeDager[nyIndex]);
        }
    };

    const detalj = valgtDag ? DAG_DETALJER[valgtDag] : undefined;
    const index = valgtDag ? tilgjengeligeDager.indexOf(valgtDag) : -1;

    return (
        <VStack gap="space-24">
            <HStack gap="space-24" align="center" justify="space-between" wrap>
                <HStack gap="space-8" align="center">
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        icon={<ChevronLeftIcon aria-hidden />}
                        onClick={gåTilForrigeMåned}
                    >
                        Forrige måned
                    </Button>
                    <Heading size="small" level="2">
                        {dayjs().year(year).month(month).format('MMMM YYYY')}
                    </Heading>
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        icon={<ChevronRightIcon aria-hidden />}
                        onClick={gåTilNesteMåned}
                    >
                        Neste måned
                    </Button>
                </HStack>

                <HStack gap="space-16" align="center" wrap>
                    <ToggleGroup
                        size="small"
                        value={filter}
                        onChange={(value) => setFilter(value as 'ALLE' | 'MOR' | 'FAR')}
                    >
                        <ToggleGroup.Item value="MOR">Min del</ToggleGroup.Item>
                        <ToggleGroup.Item value="ALLE">Begge</ToggleGroup.Item>
                        <ToggleGroup.Item value="FAR">Erlends del</ToggleGroup.Item>
                    </ToggleGroup>
                    <Switch checked={skjulHelg} onChange={(e) => setSkjulHelg(e.target.checked)}>
                        Skjul helg
                    </Switch>
                </HStack>
            </HStack>

            <BodyShort size="small" textColor="subtle">
                Trykk på en dag for å se detaljer.
            </BodyShort>

            <Manedsvisning
                year={year}
                month={month}
                periods={periods}
                hendelser={HENDELSER_MAI_2026}
                hideWeekend={skjulHelg}
                dateClickCallback={(dato) => (DAG_DETALJER[dato] ? setValgtDag(dato) : undefined)}
            />

            <HStack gap="space-20" wrap>
                {LEGEND.map((l) => (
                    <HStack key={l.type} gap="space-8" align="center">
                        <span aria-hidden className={`inline-block h-4 w-4 rounded ${l.farge}`} />
                        <BodyShort size="small">{l.tekst}</BodyShort>
                    </HStack>
                ))}
                <HStack gap="space-8" align="center">
                    <HeartFillIcon aria-hidden width={16} height={16} />
                    <BodyShort size="small">Termin</BodyShort>
                </HStack>
                <HStack gap="space-8" align="center">
                    <ExclamationmarkTriangleFillIcon aria-hidden width={16} height={16} />
                    <BodyShort size="small">Mangler aktivitet</BodyShort>
                </HStack>
            </HStack>

            <Dialog open={!!detalj} onOpenChange={(open) => !open && setValgtDag(undefined)}>
                <Dialog.Popup id="ManedsvisningDagDetaljer">
                    {detalj && (
                        <>
                            <Dialog.Header>
                                <Dialog.Title>{detalj.tittel}</Dialog.Title>
                                <Dialog.Description>{detalj.dato}</Dialog.Description>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack gap="space-16">
                                    <BodyLong>{detalj.body}</BodyLong>
                                    <HStack gap="space-8" wrap>
                                        {detalj.chips.map((c) => (
                                            <Tag key={c} variant="neutral" size="small">
                                                {c}
                                            </Tag>
                                        ))}
                                    </HStack>
                                    {detalj.advarsel && (
                                        <Alert variant="warning" size="small">
                                            {detalj.advarsel}
                                        </Alert>
                                    )}
                                </VStack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <HStack gap="space-8" align="center" justify="space-between" className="w-full">
                                    <HStack gap="space-4">
                                        <Button
                                            type="button"
                                            variant="tertiary"
                                            size="small"
                                            icon={<ChevronLeftIcon aria-hidden />}
                                            disabled={index <= 0}
                                            onClick={() => naviger(-1)}
                                        >
                                            Forrige dag
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="tertiary"
                                            size="small"
                                            icon={<ChevronRightIcon aria-hidden />}
                                            iconPosition="right"
                                            disabled={index === -1 || index >= tilgjengeligeDager.length - 1}
                                            onClick={() => naviger(1)}
                                        >
                                            Neste dag
                                        </Button>
                                    </HStack>
                                    <HStack gap="space-8">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="small"
                                            icon={<TrashIcon aria-hidden />}
                                        >
                                            Slett
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="primary"
                                            size="small"
                                            icon={<PencilIcon aria-hidden />}
                                        >
                                            Endre
                                        </Button>
                                    </HStack>
                                </HStack>
                            </Dialog.Footer>
                        </>
                    )}
                </Dialog.Popup>
            </Dialog>
        </VStack>
    );
};

export const Interaktiv: Story = {
    args: Standard.args,
    render: () => <InteraktivDemo />,
};

// ---------------------------------------------------------------------------
// Dokumentasjon av designutfordringane, henta frå notatfeltet i konseptskissa
// (manedsvisning.html). Dette er ikkje ein del av sjølve komponenten, men er tatt
// med her fordi det forklarer designvala som er gjort i Manedsvisning.
// ---------------------------------------------------------------------------

export const OmDesignet: Story = {
    args: Standard.args,
    render: () => (
        <VStack gap="space-16" maxWidth="640px">
            <Heading size="small" level="2">
                Det vanskelige med månedsvisning
            </Heading>
            <List>
                <List.Item title="Plassen er trang">
                    Hver celle er bare et lite kvadrat. Cards i micro-størrelse kan kun bære farge og dato. Type-label
                    finnes ikke, og brukeren må lære fargene gjennom filter-bruk og bekreftelse i detaljvisningen ved
                    klikk.
                </List.Item>
                <List.Item title="Sammenhengende perioder smelter sammen innenfor en uke">
                    Uke 19 (4. til 8. mai) viser mors periode som én sammenhengende horisontal blokk. Datoer er fortsatt
                    synlige per dag, men border-radius og marginer fjernes mellom naboer.
                </List.Item>
                <List.Item title="Visuelle brudd på tvers av uker">
                    Mors periode fortsetter fra 8. mai (fre) til 11. mai (ma), men siden de er på forskjellige rader er
                    det ikke mulig å smelte dem sammen. Fargen kommuniserer kontinuiteten alene. Helgen bryter alltid en
                    periode visuelt, uansett – helgedager vises alltid nøytralt.
                </List.Item>
                <List.Item title="State i micro">
                    Varselprikk øverst til høyre på fredag 15. mai. Det er minimum invasivt, ikke en border eller annen
                    overlay som ville klemt på den begrensede plassen.
                </List.Item>
                <List.Item title="Termin som markør, ikke card">
                    1. mai erstatter både dato og bakgrunn med en hendelsesmarkør. Termin er en hendelse, ikke en
                    periode, og fortjener egen visuell logikk.
                </List.Item>
                <List.Item title="Tap-mønster">
                    Hver micro card åpner en detaljvisning ved klikk/tap. Det er der hele logikken bor: typenavn,
                    datoperiode, kvote, state-detaljer og CTA-er – men denne logikken bur utanfor
                    Manedsvisning-komponenten, hos den som bruker han (sjå «Interaktiv»-historia).
                </List.Item>
            </List>
        </VStack>
    ),
};
