import { HeartFillIcon, TeddyBearFillIcon } from '@navikt/aksel-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';

import { BodyShort, VStack } from '@navikt/ds-react';
import {
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriodeResultat_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { CalendarLabel, CalendarPeriodColor } from '@navikt/fp-ui';

import {
    finnBakgrunnsfarge,
    getBorderFarge,
    getIkon,
} from '../liste/periode-liste-item/periode-liste-header/PeriodeListeHeaderUtils';
import { Kolonne, RegelIdBadge, RegelkatalogSide } from '../regler/RegelkatalogSide';
import {
    FamiliehendelseDato,
    PerioderUtenUttakHull,
    TapteDagerHull,
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
} from '../types/UttaksplanPeriode';
import { getLegendLabelFromPeriode } from './legend/uttaksplanLegendUtils';
import { getKalenderFargeForPeriode } from './utils/usePerioderForKalendervisning';

// ---------------------------------------------------------------------------
// Mock-fabrikkar — minimale periodar som triggar dei ulike kodebanane
// ---------------------------------------------------------------------------

const FOM = '2025-06-01';
const TOM = '2025-06-14';
const HISTORISK_DATO = '2025-01-01';

const lagPeriode = (o: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: FOM,
    tom: TOM,
    flerbarnsdager: false,
    forelder: 'MOR',
    ...o,
});

const lagEøs = (
    o: Partial<UttakPeriodeAnnenpartEøs_fpoversikt> = {},
): UttakPeriodeAnnenpartEøs_fpoversikt => ({
    fom: FOM,
    tom: TOM,
    kontoType: 'FELLESPERIODE',
    trekkdager: 15,
    ...o,
});

const TAPTE: TapteDagerHull = { type: 'TAPTE_DAGER', fom: FOM, tom: TOM, forelder: 'MOR' };
const UTEN_UTTAK: PerioderUtenUttakHull = { type: 'PERIODE_UTEN_UTTAK', fom: FOM, tom: TOM };
const FAMHENDELSE: FamiliehendelseDato = { type: 'FAMILIEHENDELSE', fom: FOM, tom: TOM };

const AVSLAG: UttakPeriodeResultat_fpoversikt = {
    innvilget: false,
    trekkerDager: false,
    trekkerMinsterett: false,
    årsak: 'ANNET',
};
const PLEIEPENGE_AVSLAG: UttakPeriodeResultat_fpoversikt = {
    innvilget: false,
    trekkerDager: false,
    trekkerMinsterett: false,
    årsak: 'AVSLAG_FRATREKK_PLEIEPENGER',
};

// ---------------------------------------------------------------------------
// Spesifikasjon — kvar rad definerer mock-input, resten blir utleia
// ---------------------------------------------------------------------------

type FargeSpec = {
    id: string;
    periodetype: string;
    beskrivelse: string;
    /** Mock-periode for kalender (getKalenderFargeForPeriode + getLegendLabelFromPeriode) */
    kalenderPeriode?: UttaksplanperiodeMedKunTapteDager;
    kalenderErFarEllerMedmor?: boolean;
    /** Statisk kalender-verdi for ting som ikkje kan avleiast (ikon-markørar, interaksjonsfargar) */
    kalenderStatisk?: { fargekode: CalendarPeriodColor | null; ikon?: ReactNode; legendLabel: string };
    /** Mock-periodar for liste (finnBakgrunnsfarge + getBorderFarge + getIkon) */
    listePerioder?: Uttaksplanperiode[];
    listeErFamiliehendelse?: boolean;
    listeFamiliehendelsedato?: string;
    listeHarMorsAktivitetIkkeErValgt?: boolean;
};

// ---------------------------------------------------------------------------
// Avleiing — slår opp i produksjonskoden for å finne fargar
// ---------------------------------------------------------------------------

type FargeEntry = {
    id: string;
    periodetype: string;
    beskrivelse: string;
    kalender: { fargekode: CalendarPeriodColor | null; ikon?: ReactNode; legendLabel: string };
    liste: { bakgrunn: string; border: string; ikonElement: ReactNode } | null;
};

const beregnEntry = (s: FargeSpec): FargeEntry => ({
    id: s.id,
    periodetype: s.periodetype,
    beskrivelse: s.beskrivelse,
    kalender: s.kalenderPeriode
        ? {
              fargekode: getKalenderFargeForPeriode(
                  s.kalenderPeriode,
                  s.kalenderErFarEllerMedmor ?? false,
                  [s.kalenderPeriode],
              ),
              legendLabel:
                  getLegendLabelFromPeriode(s.kalenderPeriode, s.kalenderErFarEllerMedmor ?? false) ?? '(ingen)',
          }
        : s.kalenderStatisk ?? { fargekode: null, legendLabel: '—' },
    liste: s.listePerioder
        ? {
              bakgrunn: finnBakgrunnsfarge(
                  s.listePerioder,
                  s.listeHarMorsAktivitetIkkeErValgt ?? false,
                  s.listeErFamiliehendelse,
              ),
              border: getBorderFarge(s.listePerioder),
              ikonElement: getIkon(s.listePerioder, s.listeFamiliehendelsedato ?? HISTORISK_DATO),
          }
        : null,
});

type FargeOmråde = { id: string; område: string; beskrivelse: string; regler: FargeEntry[] };

// ---------------------------------------------------------------------------
// Alle fargar, gruppert etter periodekategori
// Fargane er *dynamisk utleia* frå produksjonskoden via beregnEntry().
// Berre interaksjonsfargar og spesialdagar (barnehage, helg) er statiske.
// ---------------------------------------------------------------------------

const OMRÅDER: FargeOmråde[] = [
    {
        id: 'mor',
        område: 'Mors periodar (blå)',
        beskrivelse:
            'Blå fargar representerer periodar som tilhøyrer mor — mødrekvote, fellesperiode ' +
            'teken av mor, eller foreldrepengar før fødsel.',
        regler: [
            beregnEntry({
                id: 'mor-vanleg',
                periodetype: 'Mors uttak',
                beskrivelse: 'Vanleg uttak — mødrekvote, fellesperiode eller foreldrepengar før fødsel.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE' }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE' })],
            }),
            beregnEntry({
                id: 'mor-gradert',
                periodetype: 'Mors uttak (gradert)',
                beskrivelse: 'Gradert uttak — mor jobbar deltid og tek ut foreldrepengar samtidig.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE', gradering: { arbeidstidprosent: 50 } }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE', gradering: { arbeidstidprosent: 50 } })],
            }),
            beregnEntry({
                id: 'mor-før-fødsel',
                periodetype: 'Før fødsel / termin',
                beskrivelse: 'Foreldrepengar før fødsel — perioden med FORELDREPENGER_FØR_FØDSEL-konto.',
                kalenderPeriode: lagPeriode({ kontoType: 'FORELDREPENGER_FØR_FØDSEL' }),
                listePerioder: [lagPeriode({ kontoType: 'FORELDREPENGER_FØR_FØDSEL' })],
                listeFamiliehendelsedato: '2025-12-01',
            }),
        ],
    },
    {
        id: 'far',
        område: 'Fars / medmors periodar (grøn)',
        beskrivelse:
            'Grøne fargar representerer periodar som tilhøyrer far eller medmor — fedrekvote ' +
            'eller fellesperiode. Stripete = gradert, omriss = aktivitetsfri.',
        regler: [
            beregnEntry({
                id: 'far-vanleg',
                periodetype: 'Fars uttak',
                beskrivelse: 'Vanleg uttak — fedrekvote eller fellesperiode.',
                kalenderPeriode: lagPeriode({ forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE' }),
                kalenderErFarEllerMedmor: true,
                listePerioder: [lagPeriode({ forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE' })],
            }),
            beregnEntry({
                id: 'far-gradert',
                periodetype: 'Fars uttak (gradert)',
                beskrivelse:
                    'Gradert uttak — far jobbar deltid. Gjeld også aktivitetsfri kvote med gradering ' +
                    '(FARS_DEL_AKTIVITETSFRI_GRADERT — same kalenderfarge, men labelen skil dei).',
                kalenderPeriode: lagPeriode({
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    gradering: { arbeidstidprosent: 50 },
                }),
                kalenderErFarEllerMedmor: true,
                listePerioder: [
                    lagPeriode({
                        forelder: 'FAR_MEDMOR',
                        kontoType: 'FEDREKVOTE',
                        gradering: { arbeidstidprosent: 50 },
                    }),
                ],
            }),
            beregnEntry({
                id: 'far-aktivitetsfri',
                periodetype: 'Aktivitetsfri kvote',
                beskrivelse:
                    'Aktivitetsfri kvote — inga krav til mors aktivitet. ' +
                    'Berre for FORELDREPENGER-kontoen med morsAktivitet = IKKE_OPPGITT.',
                kalenderPeriode: lagPeriode({
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FORELDREPENGER',
                    morsAktivitet: 'IKKE_OPPGITT',
                }),
                kalenderErFarEllerMedmor: true,
                listePerioder: [
                    lagPeriode({
                        forelder: 'FAR_MEDMOR',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'IKKE_OPPGITT',
                    }),
                ],
            }),
        ],
    },
    {
        id: 'samtidig',
        område: 'Samtidig uttak (splitta farge)',
        beskrivelse:
            'Når begge foreldra tek ut foreldrepengar i same periode. Kalenderen viser splitta ' +
            'farge (retning avheng av innlogga brukar), lista viser diagonal gradient.',
        regler: (() => {
            const morSamtidig = lagPeriode({ kontoType: 'FELLESPERIODE', samtidigUttak: 50 });
            const farSamtidig = lagPeriode({
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                samtidigUttak: 50,
            });
            const listePerioder: Uttaksplanperiode[] = [morSamtidig, farSamtidig];
            return [
                beregnEntry({
                    id: 'samtidig-mor',
                    periodetype: 'Samtidig uttak (sett frå mor)',
                    beskrivelse: 'Kalender: grøn topp, blå botn. Liste: diagonal gradient grøn → blå.',
                    kalenderPeriode: morSamtidig,
                    kalenderErFarEllerMedmor: false,
                    listePerioder,
                }),
                beregnEntry({
                    id: 'samtidig-far',
                    periodetype: 'Samtidig uttak (sett frå far)',
                    beskrivelse:
                        'Kalender: blå topp, grøn botn. Liste: same gradient (ikkje perspektivavhengig).',
                    kalenderPeriode: farSamtidig,
                    kalenderErFarEllerMedmor: true,
                    listePerioder,
                }),
            ];
        })(),
    },
    {
        id: 'utsettelse',
        område: 'Utsettelse (omriss / pause)',
        beskrivelse:
            'Utsetjingsperiodar «pausar» uttaket. Kalenderen skil ferie (blå omriss) frå ' +
            'andre årsaker (beige omriss). Lista brukar same bakgrunn for alle utsetjingar, ' +
            'men ulike ikon per årsak.',
        regler: [
            beregnEntry({
                id: 'utsettelse-ferie',
                periodetype: 'Ferie',
                beskrivelse: 'Lovbestemt ferie — uttaket er pausa medan familien har ferie.',
                kalenderPeriode: lagPeriode({ utsettelseÅrsak: 'LOVBESTEMT_FERIE' }),
                listePerioder: [lagPeriode({ utsettelseÅrsak: 'LOVBESTEMT_FERIE' })],
            }),
            beregnEntry({
                id: 'utsettelse-arbeid',
                periodetype: 'Utsettelse (arbeid/fri)',
                beskrivelse: 'Utsettelse grunna arbeid eller fri — søkar jobbar i perioden.',
                kalenderPeriode: lagPeriode({ utsettelseÅrsak: 'ARBEID' }),
                listePerioder: [lagPeriode({ utsettelseÅrsak: 'ARBEID' })],
            }),
            beregnEntry({
                id: 'utsettelse-sjukdom',
                periodetype: 'Utsettelse (sjukdom/innlegging)',
                beskrivelse: 'Utsettelse grunna sjukdom, innlegging, HV-øving eller NAV-tiltak.',
                kalenderPeriode: lagPeriode({ utsettelseÅrsak: 'SØKER_SYKDOM' }),
                listePerioder: [lagPeriode({ utsettelseÅrsak: 'SØKER_SYKDOM' })],
            }),
        ],
    },
    {
        id: 'eøs',
        område: 'EØS-periodar (fylt med svart omriss)',
        beskrivelse:
            'Periodar der den eine forelderen har foreldrepengar frå eit anna EØS-land. ' +
            'Kalenderen viser hovudfarge + svart omriss. Lista brukar blå bakgrunn (accent-400) for begge.',
        regler: [
            beregnEntry({
                id: 'eøs-mor',
                periodetype: 'Mors EØS-periode',
                beskrivelse:
                    'Visast for far/medmor som er innlogga (mora har EØS-foreldrepengar). ' +
                    'Merk: Lista brukar same blå bakgrunn uavhengig av forelder.',
                kalenderPeriode: lagEøs(),
                kalenderErFarEllerMedmor: true,
                listePerioder: [lagEøs()],
            }),
            beregnEntry({
                id: 'eøs-far',
                periodetype: 'Fars EØS-periode',
                beskrivelse:
                    'Visast for mor som er innlogga (far/medmor har EØS-foreldrepengar). ' +
                    'Merk: Lista brukar same blå bakgrunn uavhengig av forelder.',
                kalenderPeriode: lagEøs(),
                kalenderErFarEllerMedmor: false,
                listePerioder: [lagEøs()],
            }),
        ],
    },
    {
        id: 'tapte-og-avslag',
        område: 'Tapte dagar, avslag og uten uttak',
        beskrivelse:
            'Mørke og åtvaringsfargar signaliserer problem — tapte dagar (hull), ' +
            'avslåtte periodar, pleiepengefratrekk, eller periodar utan uttak.',
        regler: [
            beregnEntry({
                id: 'tapte-dagar',
                periodetype: 'Tapte dagar',
                beskrivelse: 'Hull i uttaksplanen der dagar kan gå tapt om ikkje planen blir endra.',
                kalenderPeriode: TAPTE,
                listePerioder: [TAPTE],
            }),
            beregnEntry({
                id: 'avslag',
                periodetype: 'Avslått periode',
                beskrivelse: 'Nav har avslått søknaden for denne perioden.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE', resultat: AVSLAG }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE', resultat: AVSLAG })],
            }),
            beregnEntry({
                id: 'pleiepenger',
                periodetype: 'Pleiepenger-fratrekk',
                beskrivelse: 'Avslag fordi barnet mottek pleiepenger — foreldrepengar er trekte frå.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE', resultat: PLEIEPENGE_AVSLAG }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE', resultat: PLEIEPENGE_AVSLAG })],
            }),
            beregnEntry({
                id: 'uten-uttak',
                periodetype: 'Periode utan uttak',
                beskrivelse:
                    'Periode der ingen forelder tek ut foreldrepengar. ' +
                    'Finst berre i listevisninga — kalenderen viser ikkje denne periodetypen.',
                kalenderStatisk: { fargekode: null, legendLabel: '(berre liste)' },
                listePerioder: [UTEN_UTTAK],
            }),
            beregnEntry({
                id: 'mors-aktivitet-mangler',
                periodetype: 'Mors aktivitet ikkje vald',
                beskrivelse:
                    'Berre liste: far/medmors fellesperiode der mors aktivitet ikkje er oppgjeve. ' +
                    'Raud bakgrunn (danger-200) signaliserer at perioden treng redigering.',
                kalenderStatisk: { fargekode: null, legendLabel: '(berre liste)' },
                listePerioder: [
                    lagPeriode({ forelder: 'FAR_MEDMOR', kontoType: 'FELLESPERIODE' }),
                ],
                listeHarMorsAktivitetIkkeErValgt: true,
            }),
        ],
    },
    {
        id: 'spesial',
        område: 'Spesialdagar (familiehendelse, barnehage, helg)',
        beskrivelse:
            'Desse er ikkje knytte til uttak, men visast som landemerke. ' +
            'Familiehendelse og barnehagestart finst i begge visningar, helg berre i kalenderen.',
        regler: [
            beregnEntry({
                id: 'familiehendelse',
                periodetype: 'Fødsel / termin / adopsjon',
                beskrivelse:
                    'Familiehendelsesdato — fødselsdato, termindato eller omsorgsovertaking. ' +
                    'Hjarteikon i begge visningar.',
                kalenderStatisk: {
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
                listePerioder: [FAMHENDELSE],
                listeErFamiliehendelse: true,
            }),
            beregnEntry({
                id: 'barnehage',
                periodetype: 'Barnehageplass',
                beskrivelse: 'Dato for barnehagestart — markerer slutten på foreldrepengeperioden.',
                kalenderStatisk: {
                    fargekode: null,
                    ikon: (
                        <TeddyBearFillIcon
                            aria-hidden
                            color="var(--ax-brand-beige-800)"
                            width={25}
                            height={25}
                        />
                    ),
                    legendLabel: 'BARNEHAGEPLASS',
                },
            }),
            beregnEntry({
                id: 'helg',
                periodetype: 'Helg',
                beskrivelse:
                    'Laurdag og søndag — det blir ikkje telt uttaksdagar i helgene. Berre i kalenderen.',
                kalenderStatisk: { fargekode: 'GRAY', legendLabel: 'HELG' },
            }),
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
            beregnEntry({
                id: 'none',
                periodetype: 'Ingen periode',
                beskrivelse:
                    'Dagar utan periode — standard for dagar som ikkje er del av nokon uttaksperiode.',
                kalenderStatisk: { fargekode: 'NONE', legendLabel: '(ingen)' },
            }),
            beregnEntry({
                id: 'darkblue',
                periodetype: 'Vald periode (redigering)',
                beskrivelse:
                    'Markerer valde periodar i redigeringsmodus — ' +
                    'når brukaren klikkar på ein legend-farge, blir dei aktuelle dagane framheva. ' +
                    'NB: CalendarLabel rendrar ikkje denne fargen (returnerer null) — ' +
                    'fargen (--ax-bg-accent-strong-pressed) visast berre på kalenderdagar.',
                kalenderStatisk: { fargekode: 'DARKBLUE', legendLabel: '(ingen)' },
            }),
            beregnEntry({
                id: 'lightblue',
                periodetype: 'Fokus/seleksjon (blå)',
                beskrivelse:
                    'Brukt i outline-/fokusstil for blå periodar — ' +
                    'ikkje ein eigen periodetype, men del av seleksjonslogikken.',
                kalenderStatisk: { fargekode: 'LIGHTBLUE', legendLabel: '(ingen)' },
            }),
            beregnEntry({
                id: 'lightgreen',
                periodetype: 'Fokus/seleksjon (grøn)',
                beskrivelse:
                    'Brukt i outline-/fokusstil for grøne periodar — ' +
                    'ikkje ein eigen periodetype, men del av seleksjonslogikken.',
                kalenderStatisk: { fargekode: 'LIGHTGREEN', legendLabel: '(ingen)' },
            }),
        ],
    },
];

// ---------------------------------------------------------------------------
// Hovudkomponent
// ---------------------------------------------------------------------------

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
        return (
            <BodyShort size="small" className="text-ax-text-subtle italic">
                —
            </BodyShort>
        );
    }
    return (
        <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 ${entry.liste.bakgrunn} ${entry.liste.border}`}
        >
            {entry.liste.ikonElement}
        </div>
    );
};

// ---------------------------------------------------------------------------
// Hovudkomponent
// ---------------------------------------------------------------------------

/**
 * Sjølvdokumenterande Storybook-side: viser fargesystemet i uttaksplanen
 * side om side for kalender- og listevisninga.
 *
 * Fargane er **dynamisk utleia** frå produksjonskoden — same funksjonar
 * som appen brukar (getKalenderFargeForPeriode, finnBakgrunnsfarge, getIkon
 * osv.) blir kalla med mock-periodar. Endringar i produksjonskoden blir
 * automatisk reflektert her.
 */
const Fargekatalog = () => {
    const kolonner: ReadonlyArray<Kolonne<FargeEntry>> = [
        {
            overskrift: 'Periodetype',
            bredde: '18%',
            render: (entry) => (
                <BodyShort size="small" className="font-semibold">
                    {entry.periodetype}
                </BodyShort>
            ),
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
                    <em>ulike fargesystem</em>. Kalenderen brukar{' '}
                    <code className="font-mono">CalendarPeriodColor</code> (enum → CSS-modul), medan lista brukar
                    Tailwind-klassar direkte. Denne katalogen viser begge side om side, slik at du kan sjå om same
                    periodetype ser likt ut i begge visningar.
                    <br />
                    <br />
                    <strong>NB:</strong> Fargane i denne oversikta er <em>dynamisk utleia</em> frå produksjonskoden
                    (same funksjonar som appen brukar). Endringar i{' '}
                    <code className="font-mono">getKalenderFargeForPeriode</code>,{' '}
                    <code className="font-mono">finnBakgrunnsfarge</code>,{' '}
                    <code className="font-mono">getIkon</code> osv. blir automatisk reflektert her.
                    <br />
                    <br />
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
