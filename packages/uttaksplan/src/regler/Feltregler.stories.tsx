import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { Kolonne, MeldingSitat, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { Feltregelområde } from './types';
import { HVA_VIL_DU_GJØRE_OMRÅDE } from './felt/hvaVilDuGjøre';
import { SAMTIDIG_UTTAKSPROSENT_OMRÅDE } from './felt/samtidigUttaksprosent';
import { STILLINGSPROSENT_OMRÅDE } from './felt/stillingsprosent';

const ALLE_FELTREGLER: readonly Feltregelområde[] = [
    STILLINGSPROSENT_OMRÅDE,
    SAMTIDIG_UTTAKSPROSENT_OMRÅDE,
    HVA_VIL_DU_GJØRE_OMRÅDE,
];

const INTRO =
    'Når brukeren fyller ut skjemaet for å legge til eller endre en periode, kjører hvert felt sine egne regler. ' +
    'Disse reglene gir tilbakemelding på det enkelte feltet (f.eks. «Stillingsprosent må være mindre enn 100 %»), ' +
    'i tillegg til de overordnede valideringsreglene som kjøres ved lagring.';

/**
 * Selvdokumenterende Storybook-side: viser feltreglene som kjøres direkte
 * på input-feltene i skjemaet for å legge til/endre en periode i uttaksplanen.
 *
 * I motsetning til `Valideringsregler.stories.tsx`, som beskriver reglene som
 * kjøres når brukeren lagrer hele perioden, viser denne siden reglene som
 * gir feedback mens brukeren fyller ut feltene.
 */
const Feltregler = () => {
    const intl = useIntl();
    const kolonner: ReadonlyArray<Kolonne<Feltregelområde['regler'][number]>> = [
        {
            overskrift: 'Regel-id',
            bredde: '24%',
            render: (r) => <RegelIdBadge id={r.id} />,
        },
        {
            overskrift: 'Hva regelen sier',
            render: (r) => r.beskrivelse,
        },
        {
            overskrift: 'Feilmelding til brukeren',
            bredde: '32%',
            render: (r) => <MeldingSitat tekst={intl.formatMessage({ id: r.feilmeldingId })} />,
        },
    ];

    return (
        <RegelkatalogSide
            tittel="Feltregler i uttaksplanen"
            badge="Feltregler"
            farge="felt"
            kildesti="packages/uttaksplan/src/regler/felt/"
            intro={INTRO}
            områder={ALLE_FELTREGLER}
            getRegelId={(r) => r.id}
            kolonner={kolonner}
        />
    );
};

const meta = {
    title: 'Uttaksplan/Feltregler (dokumentasjon)',
    component: Feltregler,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Feltregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleFeltregler: Story = {};
