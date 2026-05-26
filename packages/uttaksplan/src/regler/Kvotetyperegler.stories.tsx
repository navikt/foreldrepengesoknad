import { Meta, StoryObj } from '@storybook/react-vite';
import { linkTo } from '@storybook/addon-links';

import { Tag } from '@navikt/ds-react';

import { Kolonne, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { FAR_MEDMOR_KVOTE_REGLER, MOR_KVOTE_REGLER } from './kvotetype/kvoteRegler';
import { Kvoteområde } from './kvotetype/types';

/**
 * Selvdokumenterende Storybook-side: viser hvilke kvotetyper (stønadskontoer)
 * som er gyldige å velge for hver forelder i skjemaet for å legge til eller
 * endre en periode.
 */
const Kvotetyperegler = () => (
    <RegelkatalogSide
        tittel="Kvotetyperegler i uttaksplan-skjemaet"
        badge="Kvotetyper"
        farge="kvote"
        kildesti="packages/uttaksplan/src/regler/kvotetype/"
        intro={INTRO}
        områder={ALLE_KVOTE_OMRÅDER}
        getRegelId={(r) => r.id}
        kolonner={kolonner}
    />
);

const meta = {
    title: 'Uttaksplan/Kvotetyperegler (dokumentasjon)',
    component: Kvotetyperegler,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Kvotetyperegler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleKvotetyperegler: Story = {};

const MOR_KVOTE_OMRÅDE: Kvoteområde = {
    id: 'morKvoter',
    område: 'Hvilke kvotetyper er gyldige å velge for mor?',
    beskrivelse:
        'Når mor er valgt som forelder for en periode, må kvotetypen (stønadskonto) være gyldig. ' +
        'Reglene under bestemmer hvilke kvoter mor får tilbudt i nedtrekkslisten.',
    seOgså: [
        {
            tekst: 'Når vises Mor som alternativ i «Hvem gjelder perioden»? (Synlighetsregler)',
            onClick: linkTo('Uttaksplan/Synlighetsregler (dokumentasjon)', 'AlleSynlighetsregler'),
        },
    ],
    regler: MOR_KVOTE_REGLER,
};

const FAR_MEDMOR_KVOTE_OMRÅDE: Kvoteområde = {
    id: 'farMedmorKvoter',
    område: 'Hvilke kvotetyper er gyldige å velge for far/medmor?',
    beskrivelse:
        'Når far/medmor er valgt som forelder for en periode, må kvotetypen (stønadskonto) være gyldig. ' +
        'Reglene under bestemmer hvilke kvoter far/medmor får tilbudt i nedtrekkslisten.',
    seOgså: [
        {
            tekst: 'Når vises Far/medmor som alternativ i «Hvem gjelder perioden»? (Synlighetsregler)',
            onClick: linkTo('Uttaksplan/Synlighetsregler (dokumentasjon)', 'AlleSynlighetsregler'),
        },
    ],
    regler: FAR_MEDMOR_KVOTE_REGLER,
};

const ALLE_KVOTE_OMRÅDER: readonly Kvoteområde[] = [MOR_KVOTE_OMRÅDE, FAR_MEDMOR_KVOTE_OMRÅDE];

const INTRO =
    'Når en bruker legger til eller endrer en periode, må han eller hun velge en kvotetype (stønadskonto) — ' +
    'mødrekvote, fedrekvote, fellesperiode, foreldrepenger osv. Reglene under bestemmer hvilke kvotetyper som ' +
    'er gyldige for hver forelder gitt familiesituasjonen, rettighetstypen og hvilke datoer som er valgt.';

type Kvoteregel = Kvoteområde['regler'][number];

const kolonner: ReadonlyArray<Kolonne<Kvoteregel>> = [
    {
        overskrift: 'Regel-id',
        bredde: '24%',
        render: (r) => <RegelIdBadge id={r.id} />,
    },
    {
        overskrift: 'Kvotetype',
        bredde: '18%',
        render: (r) => (
            <Tag variant="success-moderate" size="small">
                {r.kontotype}
            </Tag>
        ),
    },
    {
        overskrift: 'Når kvoten er gyldig',
        render: (r) => r.beskrivelse,
    },
];
