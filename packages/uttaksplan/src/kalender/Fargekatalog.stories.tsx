import {
    BabyWrappedFillIcon,
    BandageFillIcon,
    BriefcaseFillIcon,
    CloudFillIcon,
    HeartFillIcon,
    InformationSquareFillIcon,
    ParasolBeachFillIcon,
    PersonPregnantFillIcon,
    TeddyBearFillIcon,
} from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import { CalendarLabel, CalendarPeriodColor } from '@navikt/fp-ui';

import { Kolonne, RegelIdBadge, RegelkatalogSide } from '../regler/RegelkatalogSide';

// ---------------------------------------------------------------------------
// Datamodell — felles for begge visningar
// ---------------------------------------------------------------------------

type FargeEntry = {
    id: string;
    periodetype: string;
    beskrivelse: string;

    kalender: {
        fargekode: CalendarPeriodColor | null;
        ikon?: ReactNode;
        legendLabel: string;
    };

    liste: {
        bakgrunn: string;
        border: string;
        ikon: ReactNode;
        ikonFarge: string;
    } | null;
};

type FargeOmråde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: FargeEntry[];
};

// ---------------------------------------------------------------------------
// Swatchar
// ---------------------------------------------------------------------------

const KalenderSwatch = ({ entry }: { entry: FargeEntry }) => {
    if (entry.kalender.fargekode) {
        return <CalendarLabel color={entry.kalender.fargekode}>{null}</CalendarLabel>;
    }
    if (entry.kalender.ikon) {
        return <div className="flex items-center">{entry.kalender.ikon}</div>;
    }
    return null;
};

const ListeSwatch = ({ entry }: { entry: FargeEntry }) => {
    if (!entry.liste) {
        return <BodyShort size="small" className="text-ax-text-subtle italic">—</BodyShort>;
    }
    return (
        <HStack gap="space-4" align="center">
            <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 ${entry.liste.bakgrunn} ${entry.liste.border}`}
            >
                <span className={entry.liste.ikonFarge}>{entry.liste.ikon}</span>
            </div>
        </HStack>
    );
};

// ---------------------------------------------------------------------------
// Listevisning-ikon (gjenskapar getIkon / getIkonFarge)
// ---------------------------------------------------------------------------

const ikon = (Icon: typeof HeartFillIcon, size = 16) => <Icon width={size} height={size} aria-hidden />;

// ---------------------------------------------------------------------------
// Alle fargar, gruppert etter periodekategori
// ---------------------------------------------------------------------------

const OMRÅDER: FargeOmråde[] = [
    {
        id: 'mor',
        område: 'Mors periodar (blå)',
        beskrivelse:
            'Blå fargar representerer periodar som tilhøyrer mor — mødrekvote, fellesperiode ' +
            'teken av mor, eller foreldrepengar før fødsel.',
        regler: [
            {
                id: 'mor-vanleg',
                periodetype: 'Mors uttak',
                beskrivelse: 'Vanleg uttak — mødrekvote, fellesperiode eller foreldrepengar før fødsel.',
                kalender: { fargekode: 'BLUE', legendLabel: 'MORS_DEL' },
                liste: {
                    bakgrunn: 'bg-ax-accent-100',
                    border: 'border-ax-accent-100',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-accent-500',
                },
            },
            {
                id: 'mor-gradert',
                periodetype: 'Mors uttak (gradert)',
                beskrivelse: 'Gradert uttak — mor jobbar deltid og tek ut foreldrepengar samtidig.',
                kalender: { fargekode: 'BLUESTRIPED', legendLabel: 'MORS_DEL_GRADERT' },
                liste: {
                    bakgrunn: 'bg-ax-accent-100',
                    border: 'border-ax-accent-100',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-accent-500',
                },
            },
            {
                id: 'mor-før-fødsel',
                periodetype: 'Før fødsel / termin',
                beskrivelse: 'Foreldrepengar før fødsel — perioden med FORELDREPENGER_FØR_FØDSEL-konto.',
                kalender: { fargekode: 'BLUE', legendLabel: 'MORS_DEL' },
                liste: {
                    bakgrunn: 'bg-ax-accent-100',
                    border: 'border-ax-accent-100',
                    ikon: ikon(PersonPregnantFillIcon),
                    ikonFarge: 'text-ax-accent-500',
                },
            },
        ],
    },
    {
        id: 'far',
        område: 'Fars / medmors periodar (grøn)',
        beskrivelse:
            'Grøne fargar representerer periodar som tilhøyrer far eller medmor — fedrekvote ' +
            'eller fellesperiode. Stripete = gradert, omriss = aktivitetsfri.',
        regler: [
            {
                id: 'far-vanleg',
                periodetype: 'Fars uttak',
                beskrivelse: 'Vanleg uttak — fedrekvote eller fellesperiode.',
                kalender: { fargekode: 'GREEN', legendLabel: 'FARS_DEL' },
                liste: {
                    bakgrunn: 'bg-ax-success-200',
                    border: 'border-ax-success-200',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
            {
                id: 'far-gradert',
                periodetype: 'Fars uttak (gradert)',
                beskrivelse:
                    'Gradert uttak — far jobbar deltid. Gjeld også aktivitetsfri kvote med gradering ' +
                    '(FARS_DEL_AKTIVITETSFRI_GRADERT — same kalenderfarge, men labelen skil dei).',
                kalender: { fargekode: 'GREENSTRIPED', legendLabel: 'FARS_DEL_GRADERT' },
                liste: {
                    bakgrunn: 'bg-ax-success-200',
                    border: 'border-ax-success-200',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
            {
                id: 'far-aktivitetsfri',
                periodetype: 'Aktivitetsfri kvote',
                beskrivelse:
                    'Aktivitetsfri kvote — inga krav til mors aktivitet. ' +
                    'Berre for FORELDREPENGER-kontoen med morsAktivitet = IKKE_OPPGITT.',
                kalender: { fargekode: 'GREENOUTLINE', legendLabel: 'FARS_DEL_AKTIVITETSFRI' },
                liste: {
                    bakgrunn: 'bg-ax-success-200',
                    border: 'border-ax-success-200',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
        ],
    },
    {
        id: 'samtidig',
        område: 'Samtidig uttak (splitta farge)',
        beskrivelse:
            'Når begge foreldra tek ut foreldrepengar i same periode. Kalenderen viser splitta ' +
            'farge (retning avheng av innlogga brukar), lista viser diagonal gradient.',
        regler: [
            {
                id: 'samtidig-mor',
                periodetype: 'Samtidig uttak (sett frå mor)',
                beskrivelse: 'Kalender: grøn topp, blå botn. Liste: diagonal gradient grøn → blå.',
                kalender: { fargekode: 'LIGHTGREENBLUE', legendLabel: 'SAMTIDIG_UTTAK' },
                liste: {
                    bakgrunn:
                        'bg-[linear-gradient(135deg,var(--ax-success-200)_0%,var(--ax-success-200)_50%,var(--ax-accent-100)_50%,var(--ax-accent-100)_100%)]',
                    border: 'border-ax-success-200',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
            {
                id: 'samtidig-far',
                periodetype: 'Samtidig uttak (sett frå far)',
                beskrivelse: 'Kalender: blå topp, grøn botn. Liste: same gradient (ikkje perspektivavhengig).',
                kalender: { fargekode: 'LIGHTBLUEGREEN', legendLabel: 'SAMTIDIG_UTTAK' },
                liste: {
                    bakgrunn:
                        'bg-[linear-gradient(135deg,var(--ax-success-200)_0%,var(--ax-success-200)_50%,var(--ax-accent-100)_50%,var(--ax-accent-100)_100%)]',
                    border: 'border-ax-success-200',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
        ],
    },
    {
        id: 'utsettelse',
        område: 'Utsettelse (omriss / pause)',
        beskrivelse:
            'Utsetjingsperiodar «pausar» uttaket. Kalenderen skil ferie (blå omriss) frå ' +
            'andre årsaker (beige omriss). Lista brukar same bakgrunn for alle utsetjingar, ' +
            'men ulike ikon per årsak.',
        regler: [
            {
                id: 'utsettelse-ferie',
                periodetype: 'Ferie',
                beskrivelse: 'Lovbestemt ferie — uttaket er pausa medan familien har ferie.',
                kalender: { fargekode: 'BLUEOUTLINE', legendLabel: 'FERIE' },
                liste: {
                    bakgrunn: 'bg-ax-bg-default',
                    border: 'border-ax-accent-500',
                    ikon: ikon(ParasolBeachFillIcon),
                    ikonFarge: 'text-ax-accent-500',
                },
            },
            {
                id: 'utsettelse-arbeid',
                periodetype: 'Utsettelse (arbeid/fri)',
                beskrivelse: 'Utsettelse grunna arbeid eller fri — søkar jobbar i perioden.',
                kalender: { fargekode: 'BEIGEOUTLINE', legendLabel: 'UTSETTELSE' },
                liste: {
                    bakgrunn: 'bg-ax-bg-default',
                    border: 'border-ax-accent-500',
                    ikon: ikon(BriefcaseFillIcon),
                    ikonFarge: 'text-ax-accent-500',
                },
            },
            {
                id: 'utsettelse-sjukdom',
                periodetype: 'Utsettelse (sjukdom/innlegging)',
                beskrivelse: 'Utsettelse grunna sjukdom, innlegging, HV-øving eller NAV-tiltak.',
                kalender: { fargekode: 'BEIGEOUTLINE', legendLabel: 'UTSETTELSE' },
                liste: {
                    bakgrunn: 'bg-ax-bg-default',
                    border: 'border-ax-accent-500',
                    ikon: ikon(BandageFillIcon),
                    ikonFarge: 'text-ax-accent-500',
                },
            },
        ],
    },
    {
        id: 'eøs',
        område: 'EØS-periodar (fylt med svart omriss)',
        beskrivelse:
            'Periodar der den eine forelderen har foreldrepengar frå eit anna EØS-land. ' +
            'Kalenderen viser hovudfarge + svart omriss. Lista brukar blå bakgrunn (accent-400) for begge.',
        regler: [
            {
                id: 'eøs-mor',
                periodetype: 'Mors EØS-periode',
                beskrivelse:
                    'Visast for far/medmor som er innlogga (mora har EØS-foreldrepengar). ' +
                    'Merk: Lista brukar same blå bakgrunn uavhengig av forelder.',
                kalender: { fargekode: 'BLUE_WITH_BLACK_OUTLINE', legendLabel: 'MORS_DEL_EØS' },
                liste: {
                    bakgrunn: 'bg-ax-accent-400',
                    border: 'border-ax-success-400',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
            {
                id: 'eøs-far',
                periodetype: 'Fars EØS-periode',
                beskrivelse:
                    'Visast for mor som er innlogga (far/medmor har EØS-foreldrepengar). ' +
                    'Merk: Lista brukar same blå bakgrunn uavhengig av forelder.',
                kalender: { fargekode: 'GREEN_WITH_BLACK_OUTLINE', legendLabel: 'FARS_DEL_EØS' },
                liste: {
                    bakgrunn: 'bg-ax-accent-400',
                    border: 'border-ax-success-400',
                    ikon: ikon(BabyWrappedFillIcon),
                    ikonFarge: 'text-ax-success-500',
                },
            },
        ],
    },
    {
        id: 'tapte-og-avslag',
        område: 'Tapte dagar, avslag og uten uttak',
        beskrivelse:
            'Mørke og åtvaringsfargar signaliserer problem — tapte dagar (hull), ' +
            'avslåtte periodar, pleiepengefratrekk, eller periodar utan uttak.',
        regler: [
            {
                id: 'tapte-dagar',
                periodetype: 'Tapte dagar',
                beskrivelse: 'Hull i uttaksplanen der dagar kan gå tapt om ikkje planen blir endra.',
                kalender: { fargekode: 'BLACK', legendLabel: 'TAPTE_DAGER' },
                liste: {
                    bakgrunn: 'bg-ax-bg-neutral-moderate-hoverA',
                    border: 'border-ax-bg-neutral-moderate-hoverA',
                    ikon: ikon(InformationSquareFillIcon),
                    ikonFarge: 'text-ax-neutral-800',
                },
            },
            {
                id: 'avslag',
                periodetype: 'Avslått periode',
                beskrivelse: 'Nav har avslått søknaden for denne perioden.',
                kalender: { fargekode: 'BLACKOUTLINE', legendLabel: 'AVSLAG' },
                liste: {
                    bakgrunn: 'bg-ax-bg-default shadow-[inset_0_0_0_2px_var(--ax-bg-neutral-strong)]',
                    border: 'border-ax-bg-neutral-strong',
                    ikon: ikon(InformationSquareFillIcon),
                    ikonFarge: 'text-ax-neutral-800',
                },
            },
            {
                id: 'pleiepenger',
                periodetype: 'Pleiepenger-fratrekk',
                beskrivelse: 'Avslag fordi barnet mottek pleiepenger — foreldrepengar er trekte frå.',
                kalender: { fargekode: 'DARKGRAY', legendLabel: 'PLEIEPENGER' },
                liste: {
                    bakgrunn: 'bg-ax-bg-default shadow-[inset_0_0_0_2px_var(--ax-bg-neutral-strong)]',
                    border: 'border-ax-bg-neutral-strong',
                    ikon: ikon(InformationSquareFillIcon),
                    ikonFarge: 'text-ax-neutral-800',
                },
            },
            {
                id: 'uten-uttak',
                periodetype: 'Periode utan uttak',
                beskrivelse:
                    'Periode der ingen forelder tek ut foreldrepengar. ' +
                    'Finst berre i listevisninga — kalenderen viser ikkje denne periodetypen.',
                kalender: { fargekode: null, legendLabel: '(berre liste)' },
                liste: {
                    bakgrunn: 'bg-ax-warning-200',
                    border: 'border-ax-warning-200',
                    ikon: ikon(CloudFillIcon),
                    ikonFarge: 'text-ax-warning-400',
                },
            },
        ],
    },
    {
        id: 'spesial',
        område: 'Spesialdagar (familiehendelse, barnehage, helg)',
        beskrivelse:
            'Desse er ikkje knytte til uttak, men visast som landemerke. ' +
            'Familiehendelse og barnehagestart finst i begge visningar, helg berre i kalenderen.',
        regler: [
            {
                id: 'familiehendelse',
                periodetype: 'Fødsel / termin / adopsjon',
                beskrivelse:
                    'Familiehendelsesdato — fødselsdato, termindato eller omsorgsovertaking. ' +
                    'Hjarteikon i begge visningar.',
                kalender: {
                    fargekode: null,
                    ikon: (
                        <HeartFillIcon
                            aria-hidden
                            color="var(--ax-bg-brand-magenta-strong)"
                            width={25}
                            height={25}
                        />
                    ),
                    legendLabel: 'FØDSEL / TERMIN / ADOPSJON',
                },
                liste: {
                    bakgrunn: 'bg-ax-danger-100',
                    border: 'border-ax-danger-100',
                    ikon: ikon(HeartFillIcon),
                    ikonFarge: 'text-ax-danger-600',
                },
            },
            {
                id: 'barnehage',
                periodetype: 'Barnehageplass',
                beskrivelse: 'Dato for barnehagestart — markerer slutten på foreldrepengeperioden.',
                kalender: {
                    fargekode: null,
                    ikon: (
                        <TeddyBearFillIcon aria-hidden color="var(--ax-brand-beige-800)" width={25} height={25} />
                    ),
                    legendLabel: 'BARNEHAGEPLASS',
                },
                liste: null,
            },
            {
                id: 'helg',
                periodetype: 'Helg',
                beskrivelse: 'Laurdag og søndag — det blir ikkje telt uttaksdagar i helgene. Berre i kalenderen.',
                kalender: { fargekode: 'GRAY', legendLabel: 'HELG' },
                liste: null,
            },
        ],
    },
    {
        id: 'interaksjon',
        område: 'Interaksjonsfargar (berre kalender)',
        beskrivelse:
            'Desse fargane representerer ikkje ein periodetype, men ein visuell tilstand — ' +
            'valde periodar, dagar utan uttaksdata, eller outline-stilar for fokus/seleksjon. ' +
            'Ingen av desse finst i listevisninga.',
        regler: [
            {
                id: 'none',
                periodetype: 'Ingen periode',
                beskrivelse: 'Dagar utan periode — standard for dagar som ikkje er del av nokon uttaksperiode.',
                kalender: { fargekode: 'NONE', legendLabel: '(ingen)' },
                liste: null,
            },
            {
                id: 'darkblue',
                periodetype: 'Vald periode (redigering)',
                beskrivelse:
                    'Markerer valde periodar i redigeringsmodus — ' +
                    'når brukaren klikkar på ein legend-farge, blir dei aktuelle dagane framheva.',
                kalender: { fargekode: 'DARKBLUE', legendLabel: '(ingen)' },
                liste: null,
            },
            {
                id: 'lightblue',
                periodetype: 'Fokus/seleksjon (blå)',
                beskrivelse:
                    'Brukt i outline-/fokusstil for blå periodar — ' +
                    'ikkje ein eigen periodetype, men del av seleksjonslogikken.',
                kalender: { fargekode: 'LIGHTBLUE', legendLabel: '(ingen)' },
                liste: null,
            },
            {
                id: 'lightgreen',
                periodetype: 'Fokus/seleksjon (grøn)',
                beskrivelse:
                    'Brukt i outline-/fokusstil for grøne periodar — ' +
                    'ikkje ein eigen periodetype, men del av seleksjonslogikken.',
                kalender: { fargekode: 'LIGHTGREEN', legendLabel: '(ingen)' },
                liste: null,
            },
        ],
    },
];

// ---------------------------------------------------------------------------
// Hovudkomponent
// ---------------------------------------------------------------------------

/**
 * Sjølvdokumenterande Storybook-side: viser fargesystemet i uttaksplanen
 * side om side for kalender- og listevisninga.
 *
 * Dokumenterer heile kartlegginga frå periodetype → visuell farge i begge
 * visningar, slik at designarar og PO kan samanlikne og forstå kvifor
 * ein gitt periode ser slik ut i kalenderen vs. i lista.
 *
 * Kjelder:
 * - Kalender: `getKalenderFargeForPeriode()` i `usePerioderForKalendervisning.tsx`
 * - Legend:   `getLegendLabelFromPeriode()` i `uttaksplanLegendUtils.ts`
 * - Liste:    `finnBakgrunnsfarge()`, `getIkon()`, `getBorderFarge()` i `PeriodeListeHeaderUtils.tsx`
 */
const Fargekatalog = () => {
    const kolonner: ReadonlyArray<Kolonne<FargeEntry>> = [
        {
            overskrift: 'Periodetype',
            bredde: '18%',
            render: (entry) => <BodyShort size="small" className="font-semibold">{entry.periodetype}</BodyShort>,
        },
        {
            overskrift: 'Kalender',
            bredde: '8%',
            render: (entry) => <KalenderSwatch entry={entry} />,
        },
        {
            overskrift: 'Kalenderfarge / legend',
            bredde: '22%',
            render: (entry) => (
                <VStack gap="space-4">
                    <RegelIdBadge id={entry.kalender.fargekode ?? '(ikon)'} />
                    <BodyShort size="small" className="text-ax-text-subtle">
                        {entry.kalender.legendLabel}
                    </BodyShort>
                </VStack>
            ),
        },
        {
            overskrift: 'Liste',
            bredde: '8%',
            render: (entry) => <ListeSwatch entry={entry} />,
        },
        {
            overskrift: 'Skildring',
            render: (entry) => <BodyShort size="small">{entry.beskrivelse}</BodyShort>,
        },
    ];

    return (
        <RegelkatalogSide<FargeEntry>
            tittel="Fargekatalog for uttaksplanen"
            intro={
                <>
                    Uttaksplanen har to visningar — <strong>kalender</strong> og <strong>liste</strong> — som brukar{' '}
                    <em>ulike fargesystem</em>. Kalenderen brukar <code className="font-mono">CalendarPeriodColor</code>
                    {' '}(enum → CSS-modul), medan lista brukar Tailwind-klassar direkte. Denne katalogen viser begge
                    side om side, slik at du kan sjå om same periodetype ser likt ut i begge visningar.
                    <br /><br />
                    Hovudmønster: <strong>blå = mor</strong>, <strong>grøn = far / medmor</strong>,{' '}
                    <strong>stripete = gradert</strong>, <strong>omriss = utsettelse / aktivitetsfri</strong>,{' '}
                    <strong>svart/grå = avslag / tapte dagar</strong>.
                </>
            }
            kildesti="kalender/…/usePerioderForKalendervisning.tsx · liste/…/PeriodeListeHeaderUtils.tsx"
            farge="synlighet"
            badge="Fargekart"
            områder={OMRÅDER}
            getRegelId={(entry) => entry.id}
            kolonner={kolonner}
        />
    );
};

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta = {
    title: 'Uttaksplan/Fargekatalog (dokumentasjon)',
    component: Fargekatalog,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Fargekatalog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleFargar: Story = {};
