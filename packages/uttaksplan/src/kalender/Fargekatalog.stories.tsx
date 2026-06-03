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
// Mock-fabrikker — minimale perioder som trigger de ulike kodebanene
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
// Spesifikasjon — hver rad definerer mock-input, resten blir utledet
// ---------------------------------------------------------------------------

type FargeSpec = {
    id: string;
    periodetype: string;
    beskrivelse: string;
    /** Mock-periode for kalender (getKalenderFargeForPeriode + getLegendLabelFromPeriode) */
    kalenderPeriode?: UttaksplanperiodeMedKunTapteDager;
    kalenderErFarEllerMedmor?: boolean;
    /** Statisk kalender-verdi for ting som ikke kan utledes (ikon-markører, interaksjonsfarger) */
    kalenderStatisk?: { fargekode: CalendarPeriodColor | null; ikon?: ReactNode; legendLabel: string };
    /** Mock-perioder for liste (finnBakgrunnsfarge + getBorderFarge + getIkon) */
    listePerioder?: Uttaksplanperiode[];
    listeErFamiliehendelse?: boolean;
    listeFamiliehendelsedato?: string;
    listeHarMorsAktivitetIkkeErValgt?: boolean;
};

// ---------------------------------------------------------------------------
// Utledning — slår opp i produksjonskoden for å finne farger
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
// Alle farger, gruppert etter periodekategori
// Fargene er *dynamisk utledet* fra produksjonskoden via beregnEntry().
// Bare interaksjonsfarger og spesialdager (barnehage, helg) er statiske.
// ---------------------------------------------------------------------------

const OMRÅDER: FargeOmråde[] = [
    {
        id: 'mor',
        område: 'Mors perioder (blå)',
        beskrivelse:
            'Blå farger representerer perioder som tilhører mor — mødrekvote, fellesperiode ' +
            'tatt av mor, eller foreldrepenger før fødsel.',
        regler: [
            beregnEntry({
                id: 'mor-vanlig',
                periodetype: 'Mors uttak',
                beskrivelse: 'Vanlig uttak — mødrekvote, fellesperiode eller foreldrepenger før fødsel.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE' }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE' })],
            }),
            beregnEntry({
                id: 'mor-gradert',
                periodetype: 'Mors uttak (gradert)',
                beskrivelse: 'Gradert uttak — mor jobber deltid og tar ut foreldrepenger samtidig.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE', gradering: { arbeidstidprosent: 50 } }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE', gradering: { arbeidstidprosent: 50 } })],
            }),
            beregnEntry({
                id: 'mor-før-fødsel',
                periodetype: 'Før fødsel / termin',
                beskrivelse: 'Foreldrepenger før fødsel — perioden med FORELDREPENGER_FØR_FØDSEL-konto.',
                kalenderPeriode: lagPeriode({ kontoType: 'FORELDREPENGER_FØR_FØDSEL' }),
                listePerioder: [lagPeriode({ kontoType: 'FORELDREPENGER_FØR_FØDSEL' })],
                listeFamiliehendelsedato: '2025-12-01',
            }),
        ],
    },
    {
        id: 'far',
        område: 'Fars / medmors perioder (grønn)',
        beskrivelse:
            'Grønne farger representerer perioder som tilhører far eller medmor — fedrekvote ' +
            'eller fellesperiode. Stripete = gradert, omriss = aktivitetsfri.',
        regler: [
            beregnEntry({
                id: 'far-vanlig',
                periodetype: 'Fars uttak',
                beskrivelse: 'Vanlig uttak — fedrekvote eller fellesperiode.',
                kalenderPeriode: lagPeriode({ forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE' }),
                kalenderErFarEllerMedmor: true,
                listePerioder: [lagPeriode({ forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE' })],
            }),
            beregnEntry({
                id: 'far-gradert',
                periodetype: 'Fars uttak (gradert)',
                beskrivelse:
                    'Gradert uttak — far jobber deltid. Gjelder også aktivitetsfri kvote med gradering ' +
                    '(FARS_DEL_AKTIVITETSFRI_GRADERT — samme kalenderfarge, men labelen skiller dem).',
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
                    'Aktivitetsfri kvote — ingen krav til mors aktivitet. ' +
                    'Bare for FORELDREPENGER-kontoen med morsAktivitet = IKKE_OPPGITT.',
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
        område: 'Samtidig uttak (splittet farge)',
        beskrivelse:
            'Når begge foreldrene tar ut foreldrepenger i samme periode. Kalenderen viser splittet ' +
            'farge (retning avhenger av innlogget bruker), listen viser diagonal gradient.',
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
                    periodetype: 'Samtidig uttak (sett fra mor)',
                    beskrivelse: 'Kalender: grønn topp, blå bunn. Liste: diagonal gradient grønn → blå.',
                    kalenderPeriode: morSamtidig,
                    kalenderErFarEllerMedmor: false,
                    listePerioder,
                }),
                beregnEntry({
                    id: 'samtidig-far',
                    periodetype: 'Samtidig uttak (sett fra far)',
                    beskrivelse:
                        'Kalender: blå topp, grønn bunn. Liste: samme gradient (ikke perspektivavhengig).',
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
            'Utsettelsesperioder «pauser» uttaket. Kalenderen skiller ferie (blå omriss) fra ' +
            'andre årsaker (beige omriss). Listen bruker samme bakgrunn for alle utsettelser, ' +
            'men ulike ikoner per årsak.',
        regler: [
            beregnEntry({
                id: 'utsettelse-ferie',
                periodetype: 'Ferie',
                beskrivelse: 'Lovbestemt ferie — uttaket er pauset mens familien har ferie.',
                kalenderPeriode: lagPeriode({ utsettelseÅrsak: 'LOVBESTEMT_FERIE' }),
                listePerioder: [lagPeriode({ utsettelseÅrsak: 'LOVBESTEMT_FERIE' })],
            }),
            beregnEntry({
                id: 'utsettelse-arbeid',
                periodetype: 'Utsettelse (arbeid/fri)',
                beskrivelse: 'Utsettelse grunnet arbeid eller fri — søker jobber i perioden.',
                kalenderPeriode: lagPeriode({ utsettelseÅrsak: 'ARBEID' }),
                listePerioder: [lagPeriode({ utsettelseÅrsak: 'ARBEID' })],
            }),
            beregnEntry({
                id: 'utsettelse-sykdom',
                periodetype: 'Utsettelse (sykdom/innlegging)',
                beskrivelse: 'Utsettelse grunnet sykdom, innlegging, HV-øvelse eller NAV-tiltak.',
                kalenderPeriode: lagPeriode({ utsettelseÅrsak: 'SØKER_SYKDOM' }),
                listePerioder: [lagPeriode({ utsettelseÅrsak: 'SØKER_SYKDOM' })],
            }),
        ],
    },
    {
        id: 'eøs',
        område: 'EØS-perioder (fylt med svart omriss)',
        beskrivelse:
            'Perioder der den ene forelderen har foreldrepenger fra et annet EØS-land. ' +
            'Kalenderen viser hovedfarge + svart omriss. Listen bruker blå bakgrunn (accent-400) for begge.',
        regler: [
            beregnEntry({
                id: 'eøs-mor',
                periodetype: 'Mors EØS-periode',
                beskrivelse:
                    'Vises for far/medmor som er innlogget (mor har EØS-foreldrepenger). ' +
                    'Merk: Listen bruker samme blå bakgrunn uavhengig av forelder.',
                kalenderPeriode: lagEøs(),
                kalenderErFarEllerMedmor: true,
                listePerioder: [lagEøs()],
            }),
            beregnEntry({
                id: 'eøs-far',
                periodetype: 'Fars EØS-periode',
                beskrivelse:
                    'Vises for mor som er innlogget (far/medmor har EØS-foreldrepenger). ' +
                    'Merk: Listen bruker samme blå bakgrunn uavhengig av forelder.',
                kalenderPeriode: lagEøs(),
                kalenderErFarEllerMedmor: false,
                listePerioder: [lagEøs()],
            }),
        ],
    },
    {
        id: 'tapte-og-avslag',
        område: 'Tapte dager, avslag og uten uttak',
        beskrivelse:
            'Mørke og advarselsfarger signaliserer problemer — tapte dager (hull), ' +
            'avslåtte perioder, pleiepengefratrekk, eller perioder uten uttak.',
        regler: [
            beregnEntry({
                id: 'tapte-dager',
                periodetype: 'Tapte dager',
                beskrivelse: 'Hull i uttaksplanen der dager kan gå tapt om ikke planen blir endret.',
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
                beskrivelse: 'Avslag fordi barnet mottar pleiepenger — foreldrepenger er trukket fra.',
                kalenderPeriode: lagPeriode({ kontoType: 'MØDREKVOTE', resultat: PLEIEPENGE_AVSLAG }),
                listePerioder: [lagPeriode({ kontoType: 'MØDREKVOTE', resultat: PLEIEPENGE_AVSLAG })],
            }),
            beregnEntry({
                id: 'uten-uttak',
                periodetype: 'Periode uten uttak',
                beskrivelse:
                    'Periode der ingen forelder tar ut foreldrepenger. ' +
                    'Finnes bare i listevisningen — kalenderen viser ikke denne periodetypen.',
                kalenderStatisk: { fargekode: null, legendLabel: '(bare liste)' },
                listePerioder: [UTEN_UTTAK],
            }),
            beregnEntry({
                id: 'mors-aktivitet-mangler',
                periodetype: 'Mors aktivitet ikke valgt',
                beskrivelse:
                    'Bare liste: far/medmors fellesperiode der mors aktivitet ikke er oppgitt. ' +
                    'Rød bakgrunn (danger-200) signaliserer at perioden trenger redigering.',
                kalenderStatisk: { fargekode: null, legendLabel: '(bare liste)' },
                listePerioder: [
                    lagPeriode({ forelder: 'FAR_MEDMOR', kontoType: 'FELLESPERIODE' }),
                ],
                listeHarMorsAktivitetIkkeErValgt: true,
            }),
        ],
    },
    {
        id: 'spesial',
        område: 'Spesialdager (familiehendelse, barnehage, helg)',
        beskrivelse:
            'Disse er ikke knyttet til uttak, men vises som landemerker. ' +
            'Familiehendelse og barnehagestart finnes i begge visninger, helg bare i kalenderen.',
        regler: [
            beregnEntry({
                id: 'familiehendelse',
                periodetype: 'Fødsel / termin / adopsjon',
                beskrivelse:
                    'Familiehendelsesdato — fødselsdato, termindato eller omsorgsovertakelse. ' +
                    'Hjerteikon i begge visninger.',
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
                    'Lørdag og søndag — det telles ikke uttaksdager i helgene. Bare i kalenderen.',
                kalenderStatisk: { fargekode: 'GRAY', legendLabel: 'HELG' },
            }),
        ],
    },
    {
        id: 'interaksjon',
        område: 'Interaksjonsfarger (bare kalender)',
        beskrivelse:
            'Disse fargene representerer ikke en periodetype, men en visuell tilstand — ' +
            'valgte perioder, dager uten uttaksdata, eller outline-stiler for fokus/seleksjon. ' +
            'Ingen av disse finnes i listevisningen.',
        regler: [
            beregnEntry({
                id: 'none',
                periodetype: 'Ingen periode',
                beskrivelse:
                    'Dager uten periode — standard for dager som ikke er del av noen uttaksperiode.',
                kalenderStatisk: { fargekode: 'NONE', legendLabel: '(ingen)' },
            }),
            beregnEntry({
                id: 'darkblue',
                periodetype: 'Vald periode (redigering)',
                beskrivelse:
                    'Markerer valgte perioder i redigeringsmodus — ' +
                    'når brukeren klikker på en legend-farge, blir de aktuelle dagene framhevet. ' +
                    'NB: CalendarLabel rendrer ikke denne fargen (returnerer null) — ' +
                    'fargen (--ax-bg-accent-strong-pressed) vises bare på kalenderdager.',
                kalenderStatisk: { fargekode: 'DARKBLUE', legendLabel: '(ingen)' },
            }),
            beregnEntry({
                id: 'lightblue',
                periodetype: 'Fokus/seleksjon (blå)',
                beskrivelse:
                    'Brukt i outline-/fokusstil for blå perioder — ' +
                    'ikke en egen periodetype, men del av seleksjonslogikken.',
                kalenderStatisk: { fargekode: 'LIGHTBLUE', legendLabel: '(ingen)' },
            }),
            beregnEntry({
                id: 'lightgreen',
                periodetype: 'Fokus/seleksjon (grøn)',
                beskrivelse:
                    'Brukt i outline-/fokusstil for grønne perioder — ' +
                    'ikke en egen periodetype, men del av seleksjonslogikken.',
                kalenderStatisk: { fargekode: 'LIGHTGREEN', legendLabel: '(ingen)' },
            }),
        ],
    },
];

// ---------------------------------------------------------------------------
// Hovedkomponent
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Swatcher
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
// Hovedkomponent
// ---------------------------------------------------------------------------

/**
 * Selvdokumenterende Storybook-side: viser fargesystemet i uttaksplanen
 * side om side for kalender- og listevisningen.
 *
 * Fargene er **dynamisk utledet** fra produksjonskoden — samme funksjoner
 * som appen bruker (getKalenderFargeForPeriode, finnBakgrunnsfarge, getIkon
 * osv.) blir kalt med mock-perioder. Endringer i produksjonskoden blir
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
            overskrift: 'Beskrivelse',
            render: (entry) => <BodyShort size="small">{entry.beskrivelse}</BodyShort>,
        },
    ];

    return (
        <RegelkatalogSide<FargeEntry>
            tittel="Fargekatalog for uttaksplanen"
            intro={
                <>
                    Uttaksplanen har to visninger — <strong>kalender</strong> og <strong>liste</strong> — som bruker{' '}
                    <em>ulike fargesystemer</em>. Kalenderen bruker{' '}
                    <code className="font-mono">CalendarPeriodColor</code> (enum → CSS-modul), mens listen bruker
                    Tailwind-klasser direkte. Denne katalogen viser begge side om side, slik at du kan se om samme
                    periodetype ser likt ut i begge visninger.
                    <br />
                    <br />
                    <strong>NB:</strong> Fargene i denne oversikten er <em>dynamisk utledet</em> fra produksjonskoden
                    (samme funksjoner som appen bruker). Endringer i{' '}
                    <code className="font-mono">getKalenderFargeForPeriode</code>,{' '}
                    <code className="font-mono">finnBakgrunnsfarge</code>,{' '}
                    <code className="font-mono">getIkon</code> osv. blir automatisk reflektert her.
                    <br />
                    <br />
                    Hovedmønster: <strong>blå = mor</strong>, <strong>grønn = far / medmor</strong>,{' '}
                    <strong>stripete = gradert</strong>, <strong>omriss = utsettelse / aktivitetsfri</strong>,{' '}
                    <strong>svart/grå = avslag / tapte dager</strong>.
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

export const AlleFarger: Story = {};
