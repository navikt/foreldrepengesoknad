import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ExclamationmarkTriangleFillIcon,
    ParasolBeachFillIcon,
    PencilIcon,
    PersonFillIcon,
    PersonGroupFillIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
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

import { Ukevisning, finnFørsteDagIIsoUke } from './Ukevisning';
import { UkevisningPeriode, UkevisningPeriodeType } from './types/UkevisningPeriode';

dayjs.extend(isoWeek);

const meta = {
    title: 'Ukevisning',
    component: Ukevisning,
} satisfies Meta<typeof Ukevisning>;
export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Mock-data — same scenario som i konseptskissa (uke 20, 2026 – 11.–17. mai)
// ---------------------------------------------------------------------------

const PERSONIKON = <PersonFillIcon aria-hidden />;
const GRUPPEIKON = <PersonGroupFillIcon aria-hidden />;
const FERIEIKON = <ParasolBeachFillIcon aria-hidden />;

const PERIODER_UKE_20_2026: UkevisningPeriode[] = [
    {
        fom: '2026-05-11',
        tom: '2026-05-12',
        type: 'MOR',
        ikon: PERSONIKON,
        label: 'Mors periode',
        meta: 'Mødrekvote · 100 %',
        srText: 'Mors periode, 11.–12. mai',
    },
    {
        fom: '2026-05-13',
        tom: '2026-05-13',
        type: 'FELLES',
        ikon: GRUPPEIKON,
        label: 'Fellesperiode',
        meta: 'Mor på uttak',
        srText: 'Fellesperiode, 13. mai',
    },
    {
        fom: '2026-05-14',
        tom: '2026-05-14',
        type: 'FERIE',
        ikon: FERIEIKON,
        label: 'Ferie',
        meta: 'Mor',
        srText: 'Ferie, 14. mai',
    },
    {
        fom: '2026-05-15',
        tom: '2026-05-15',
        type: 'FAR',
        ikon: PERSONIKON,
        label: 'Fars periode',
        meta: 'Fedrekvote · 100 %',
        srText: 'Fars periode, 15. mai. Mor mangler aktivitet.',
        advarsel: 'Mor mangler aktivitet',
    },
];

export const Standard: Story = {
    args: {
        year: 2026,
        week: 20,
        periods: PERIODER_UKE_20_2026,
        hideWeekend: false,
    },
};

export const HelgSkjult: Story = {
    args: {
        ...Standard.args,
        hideWeekend: true,
    },
};

export const TomUke: Story = {
    args: {
        year: 2026,
        week: 21,
        periods: [],
    },
};

export const PeriodeInnIHelgen: Story = {
    name: 'Periode som strekker seg inn i helgen',
    args: {
        year: 2026,
        week: 20,
        periods: [
            {
                fom: '2026-05-15',
                tom: '2026-05-17',
                type: 'FAR',
                ikon: PERSONIKON,
                label: 'Fars periode',
                meta: 'Fedrekvote · 100 %',
                srText: 'Fars periode, 15.–17. mai',
            },
        ],
        hideWeekend: false,
    },
};

export const PeriodeInnIHelgenMedHelgSkjult: Story = {
    name: 'Same periode – ingen dødt helg-hale når helg er skjult',
    args: {
        ...PeriodeInnIHelgen.args,
        hideWeekend: true,
    },
};

// ---------------------------------------------------------------------------
// Interaktiv demo
//
// Dette er ting frå malen (uke-visning-filtre.html) som *ikkje* er ein del av sjølve
// Ukevisning-komponenten, på same måte som vekenavigering, eigar-filter og detaljvising heller
// ikkje er ein del av `Manedsvisning` eller `Calendar` – dei bur hos den som *bruker* komponenten.
// Her viser vi korleis Ukevisning kan brukast i ein slik samansett kontekst, utan at komponenten
// sjølv veit noko om navigering, filter eller modal.
// ---------------------------------------------------------------------------

type DagDetalj = {
    tittel: string;
    dato: string;
    body: string;
    chips: string[];
    advarsel?: string;
};

const byggDagDetaljer = (): Record<string, DagDetalj> => {
    const detaljer: Record<string, DagDetalj> = {};

    ['2026-05-11', '2026-05-12'].forEach((iso, i) => {
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

    return detaljer;
};

const DAG_DETALJER = byggDagDetaljer();

const LEGEND: Array<{ type: UkevisningPeriodeType; farge: string; tekst: string }> = [
    { type: 'MOR', farge: 'bg-ax-bg-accent-soft', tekst: 'Mors periode' },
    { type: 'FAR', farge: 'bg-ax-bg-success-soft', tekst: 'Fars periode' },
    { type: 'FELLES', farge: 'bg-ax-bg-brand-beige-soft', tekst: 'Fellesperiode' },
    { type: 'FERIE', farge: 'bg-ax-bg-warning-soft', tekst: 'Ferie' },
];

const InteraktivDemo = () => {
    const [year, setYear] = useState(2026);
    const [week, setWeek] = useState(20);
    const [filter, setFilter] = useState<'ALLE' | 'MOR' | 'FAR'>('ALLE');
    const [skjulHelg, setSkjulHelg] = useState(false);
    const [valgtDag, setValgtDag] = useState<string | undefined>(undefined);

    const periods = useMemo(
        () => (filter === 'ALLE' ? PERIODER_UKE_20_2026 : PERIODER_UKE_20_2026.filter((p) => p.type === filter)),
        [filter],
    );

    const tilgjengeligeDager = useMemo(() => Object.keys(DAG_DETALJER).sort((a, b) => a.localeCompare(b)), []);

    const gåTilForrigeUke = () => {
        const forrige = finnFørsteDagIIsoUke(year, week).subtract(1, 'week');
        setYear(forrige.isoWeekYear());
        setWeek(forrige.isoWeek());
    };

    const gåTilNesteUke = () => {
        const neste = finnFørsteDagIIsoUke(year, week).add(1, 'week');
        setYear(neste.isoWeekYear());
        setWeek(neste.isoWeek());
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
                        onClick={gåTilForrigeUke}
                    >
                        Forrige uke
                    </Button>
                    <Heading size="small" level="2">
                        Uke {week}, {year}
                    </Heading>
                    <Button
                        type="button"
                        variant="tertiary"
                        size="small"
                        icon={<ChevronRightIcon aria-hidden />}
                        onClick={gåTilNesteUke}
                    >
                        Neste uke
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
                Trykk på et kort for å se detaljer.
            </BodyShort>

            <Ukevisning
                year={year}
                week={week}
                periods={periods}
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
                    <ExclamationmarkTriangleFillIcon aria-hidden width={16} height={16} />
                    <BodyShort size="small">Mangler aktivitet</BodyShort>
                </HStack>
            </HStack>

            <Dialog open={!!detalj} onOpenChange={(open) => !open && setValgtDag(undefined)}>
                <Dialog.Popup id="UkevisningDagDetaljer">
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
// (uke-visning-filtre.html). Dette er ikkje ein del av sjølve komponenten, men er tatt med her
// fordi det forklarer designvala som er gjort i Ukevisning.
// ---------------------------------------------------------------------------

export const OmDesignet: Story = {
    args: Standard.args,
    render: () => (
        <VStack gap="space-16" maxWidth="640px">
            <Heading size="small" level="2">
                Det filteret gjør
            </Heading>
            <List>
                <List.Item title="Renere arbeidsuke">
                    Når brukeren planlegger periodene sine, er det de 5 arbeidsdagene som har betydning. Helgen er
                    bare kalenderkontekst, ikke et planleggingsobjekt.
                </List.Item>
                <List.Item title="Mer plass per dag">
                    Med 5 kolonner istedenfor 7 får hvert kort 40 % mer horisontal plass. Type-label og metadata blir
                    mer lesbart, og lange tekster trenger mindre forkorting.
                </List.Item>
                <List.Item title="Perioder som strekker seg inn i helgen">
                    En periode kan teknisk sett vare til og med søndag, men helgedager viser aldri kort – de er alltid
                    nøytrale «Helg»-celler. I 7-dagers visning gir det et lite dødt hale av tomme helgceller etter
                    kortet (se historien «Periode som strekker seg inn i helgen»). I 5-dagers visning forsvinner den
                    døde halen siden helgekolonnene er fjernet helt (se «Same periode – ingen dødt helg-hale»).
                </List.Item>
                <List.Item title="Kontinuitet på tvers av uker kommuniseres kun med farge">
                    Ukevisning viser bare én uke om gangen og vet ikke noe om naboukene. En periode som fortsetter fra
                    fredag i denne uken til mandag i neste uke kan derfor aldri smelte visuelt sammen på tvers av to
                    Ukevisning-instanser – det er kun fargen (og srText) som kommuniserer at det er én sammenhengende
                    periode i FP-betydning. Samme prinsipp gjelder for Manedsvisning på tvers av rader.
                </List.Item>
                <List.Item title="Filteret er bevisst sekundært">
                    Eier-filteret (Min del / Begge / Erlends del) og helg-toggle er ulike dimensjoner. De virker
                    uavhengig av hverandre, og bor begge utenfor selve Ukevisning-komponenten (se «Interaktiv»).
                </List.Item>
                <List.Item title="Statusmelding ved aktivt filter">
                    En subtil melding under uken minner brukeren om at de er i en filtrert visning, slik at de ikke
                    glemmer kontekst og fatter beslutning på halv informasjon.
                </List.Item>
            </List>
        </VStack>
    ),
};
