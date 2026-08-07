import { linkTo } from '@storybook/addon-links';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Kolonne, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import {
    VIS_AKTIVITETSKRAV_FELT,
    VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER,
    VIS_FAR_MEDMOR_OVERFØRING,
    VIS_FLERBARNSDAGER_SPØRSMÅL,
    VIS_INFO_FEDREKVOTE_RUNDT_FØDSEL,
    VIS_KOMBINERE_ARBEID_OG_UTTAK_FAR_MEDMOR,
    VIS_KOMBINERE_ARBEID_OG_UTTAK_MOR,
    VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK,
    VIS_MOR_OVERFØRING,
    VIS_SAMTIDIG_UTTAK_FELTER,
} from './synlighet/feltSynlighet';
import {
    VIS_BEGGE_RADIO,
    VIS_FAR_MEDMOR_RADIO,
    VIS_FORELDER_VALG,
    VIS_KONTO_FAR_MEDMOR_RADIOGRUPPE,
    VIS_KONTO_MOR_RADIOGRUPPE,
    VIS_MOR_RADIO,
} from './synlighet/forelderValg';
import {
    VIS_LEGG_TIL_FERIE_VALG,
    VIS_LEGG_TIL_OPPHOLD_VALG,
    VIS_LEGG_TIL_PAUSE_VALG,
    VIS_LEGG_TIL_PERIODE_VALG,
    VIS_LEGG_TIL_UTSETTELSE_VALG,
} from './synlighet/hvaVilDuGjøreValg';
import {
    SKAL_VISE_FERIEKNAPP,
    SKAL_VISE_LEGG_TIL_KNAPPETEKST,
    SKAL_VISE_PAUSEKNAPP,
    SKAL_VISE_UTSETTELSESKNAPP,
} from './synlighet/knapperIRedigeringspanel';
import { Synlighetsområde } from './synlighet/types';

/**
 * Selvdokumenterende Storybook-side: viser synlighetsreglene for skjemaet
 * for å legge til/endre en periode i uttaksplanen — altså reglene som
 * bestemmer hvilke felter, radioknapper og infobokser brukeren ser
 * avhengig av valgene som er gjort så langt.
 */
const Synlighetsregler = () => (
    <RegelkatalogSide
        tittel="Synlighetsregler i uttaksplan-skjemaet"
        badge="Synlighet"
        farge="synlighet"
        kildesti="packages/uttaksplan/src/regler/synlighet/"
        intro={INTRO}
        områder={ALLE_SYNLIGHETSREGLER}
        getRegelId={(r) => r.id}
        kolonner={kolonner}
    />
);

const meta = {
    title: 'Uttaksplan/Synlighetsregler (dokumentasjon)',
    component: Synlighetsregler,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Synlighetsregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleSynlighetsregler: Story = {};

const FORELDER_VALG_OMRÅDE: Synlighetsområde = {
    id: 'forelderValg',
    område: 'Hvilke alternativ vises i «Hvem gjelder perioden»-radiogruppen?',
    beskrivelse:
        'Når brukeren legger til eller endrer en periode, må det velges hvilken forelder perioden gjelder. ' +
        'Reglene under bestemmer hvilke alternativ (Mor, Far/medmor, Begge) som er tilgjengelige. Finnes det ' +
        'bare ett tilgjengelig alternativ — typisk når bare én forelder har rett — skjules hele spørsmålet, og ' +
        'forelderverdien settes automatisk (se forelderValg.visForelderValg).',
    seOgså: [
        {
            tekst: 'Hvilke kvotetyper er gyldige for mor? (Kvotetyperegler)',
            onClick: linkTo('Uttaksplan/Kvotetyperegler (dokumentasjon)', 'AlleKvotetyperegler'),
        },
        {
            tekst: 'Hvilke kvotetyper er gyldige for far/medmor? (Kvotetyperegler)',
            onClick: linkTo('Uttaksplan/Kvotetyperegler (dokumentasjon)', 'AlleKvotetyperegler'),
        },
    ],
    regler: [
        VIS_FORELDER_VALG,
        VIS_MOR_RADIO,
        VIS_FAR_MEDMOR_RADIO,
        VIS_BEGGE_RADIO,
        VIS_KONTO_MOR_RADIOGRUPPE,
        VIS_KONTO_FAR_MEDMOR_RADIOGRUPPE,
    ],
};

const FELT_SYNLIGHET_OMRÅDE: Synlighetsområde = {
    id: 'feltSynlighet',
    område: 'Hvilke felter, infobokser og oppfølgingsspørsmål vises i skjemaet?',
    beskrivelse:
        'Avhengig av hvilken forelder, kvotetype og rettighet brukeren har, blir ulike felter relevante. ' +
        'Reglene under er det som bestemmer hva som vises etter forelderen er valgt.',
    regler: [
        VIS_FLERBARNSDAGER_SPØRSMÅL,
        VIS_MOR_OVERFØRING,
        VIS_FAR_MEDMOR_OVERFØRING,
        VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK,
        VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER,
        VIS_AKTIVITETSKRAV_FELT,
        VIS_SAMTIDIG_UTTAK_FELTER,
        VIS_KOMBINERE_ARBEID_OG_UTTAK_MOR,
        VIS_KOMBINERE_ARBEID_OG_UTTAK_FAR_MEDMOR,
        VIS_INFO_FEDREKVOTE_RUNDT_FØDSEL,
    ],
};

const HVA_VIL_DU_GJØRE_VALG_OMRÅDE: Synlighetsområde = {
    id: 'hvaVilDuGjøreValg',
    område: 'Hvilke alternativ vises i «Hva vil du gjøre»-radiogruppen (listevisning)?',
    beskrivelse:
        'I listevisningens «Legg til / endre periode»-panel velger brukeren datoer først. Reglene under ' +
        'bestemmer hvilke alternativ (Ferie, Utsettelse, Pause, Periode uten foreldrepenger, Periode med ' +
        'foreldrepenger) som vises for det valgte tidsrommet — slik at brukeren bare ser de gyldige valgene.',
    seOgså: [
        {
            tekst: 'Tilsvarende «Legg til»-knapper i kalendervisningen',
            onClick: linkTo('Uttaksplan/Synlighetsregler (dokumentasjon)', 'AlleSynlighetsregler'),
        },
    ],
    regler: [
        VIS_LEGG_TIL_FERIE_VALG,
        VIS_LEGG_TIL_UTSETTELSE_VALG,
        VIS_LEGG_TIL_PAUSE_VALG,
        VIS_LEGG_TIL_OPPHOLD_VALG,
        VIS_LEGG_TIL_PERIODE_VALG,
    ],
};

const KNAPPER_I_REDIGERINGSPANEL_OMRÅDE: Synlighetsområde = {
    id: 'knapperIRedigeringspanel',
    område: 'Hvilke «Legg til»-knapper vises i redigeringspanelet?',
    beskrivelse:
        'Når brukeren har markert én eller flere dager i kalenderen, viser redigeringspanelet ulike ' +
        'handlingsknapper avhengig av søker, rettighet, familiesituasjon og hvor periodene ligger i ' +
        'forhold til familiehendelsesdatoen. Reglene under bestemmer hvilke knapper som faktisk vises.',
    regler: [SKAL_VISE_UTSETTELSESKNAPP, SKAL_VISE_PAUSEKNAPP, SKAL_VISE_FERIEKNAPP, SKAL_VISE_LEGG_TIL_KNAPPETEKST],
};

const ALLE_SYNLIGHETSREGLER: readonly Synlighetsområde[] = [
    FORELDER_VALG_OMRÅDE,
    FELT_SYNLIGHET_OMRÅDE,
    HVA_VIL_DU_GJØRE_VALG_OMRÅDE,
    KNAPPER_I_REDIGERINGSPANEL_OMRÅDE,
];

const INTRO =
    'Skjemaet for å legge til eller endre en periode er progressivt — felter, radioknapper og infobokser ' +
    'dukker opp etter hvert som brukeren gjør valg. Reglene under bestemmer hvilke deler av skjemaet som vises ' +
    'i hvilke situasjoner.';

type Synlighetsregel = Synlighetsområde['regler'][number];

const kolonner: ReadonlyArray<Kolonne<Synlighetsregel>> = [
    {
        overskrift: 'Regel-id',
        bredde: '30%',
        render: (r) => <RegelIdBadge id={r.id} />,
    },
    {
        overskrift: 'Hva regelen sier',
        render: (r) => r.beskrivelse,
    },
];
