import { Meta, StoryObj } from '@storybook/react-vite';

import { Kolonne, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { FELT_SYNLIGHET_OMRÅDE } from './synlighet/feltSynlighet';
import { FORELDER_VALG_OMRÅDE } from './synlighet/forelderValg';
import { Synlighetsområde } from './synlighet/types';

const ALLE_SYNLIGHETSREGLER: readonly Synlighetsområde[] = [FORELDER_VALG_OMRÅDE, FELT_SYNLIGHET_OMRÅDE];

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
