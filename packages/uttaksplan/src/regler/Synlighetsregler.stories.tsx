import { Meta, StoryObj } from '@storybook/react-vite';

import { Kolonne, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { FELT_SYNLIGHET_REGLER } from './synlighet/feltSynlighet';
import { FORELDER_VALG_REGLER } from './synlighet/forelderValg';
import { KNAPPER_I_REDIGERINGSPANEL_REGLER } from './synlighet/knapperIRedigeringspanel';
import { Synlighetsområde } from './synlighet/types';

const FORELDER_VALG_OMRÅDE: Synlighetsområde = {
    id: 'forelderValg',
    område: 'Hvilke alternativ vises i «Hvem gjelder perioden»-radiogruppen?',
    beskrivelse:
        'Når brukeren legger til eller endrer en periode, må det velges hvilken forelder perioden gjelder. ' +
        'Reglene under bestemmer hvilke alternativ (Mor, Far/medmor, Begge) som er tilgjengelige.',
    regler: FORELDER_VALG_REGLER,
};

const FELT_SYNLIGHET_OMRÅDE: Synlighetsområde = {
    id: 'feltSynlighet',
    område: 'Hvilke felter, infobokser og oppfølgingsspørsmål vises i skjemaet?',
    beskrivelse:
        'Avhengig av hvilken forelder, kvotetype og rettighet brukeren har, blir ulike felter relevante. ' +
        'Reglene under er det som bestemmer hva som vises etter forelderen er valgt.',
    regler: FELT_SYNLIGHET_REGLER,
};

const KNAPPER_I_REDIGERINGSPANEL_OMRÅDE: Synlighetsområde = {
    id: 'knapperIRedigeringspanel',
    område: 'Hvilke «Legg til»-knapper vises i redigeringspanelet?',
    beskrivelse:
        'Når brukeren har markert én eller flere dager i kalenderen, viser redigeringspanelet ulike ' +
        'handlingsknapper avhengig av søker, rettighet, familiesituasjon og hvor periodene ligger i ' +
        'forhold til familiehendelsesdatoen. Reglene under bestemmer hvilke knapper som faktisk vises.',
    regler: KNAPPER_I_REDIGERINGSPANEL_REGLER,
};

const ALLE_SYNLIGHETSREGLER: readonly Synlighetsområde[] = [
    FORELDER_VALG_OMRÅDE,
    FELT_SYNLIGHET_OMRÅDE,
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
