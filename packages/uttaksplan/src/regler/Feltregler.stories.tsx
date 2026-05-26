import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { Kolonne, MeldingSitat, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { lagHvaVilDuGjøreRegler } from './felt/hvaVilDuGjøre';
import { lagSamtidigUttaksprosentRegler } from './felt/samtidigUttaksprosent';
import { lagStillingsprosentRegler } from './felt/stillingsprosent';
import { Feltregelområde } from './types';

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
            render: (r) => <MeldingSitat tekst={r.feilmelding} />,
        },
    ];

    const alleFeltregler: readonly Feltregelområde[] = [
        {
            id: 'stillingsprosent',
            område: 'Stillingsprosent',
            beskrivelse:
                'Hvor stor andel brukeren skal jobbe når arbeid kombineres med uttak. Reglene sikrer at verdien er ' +
                'et gyldig tall mellom 0 og 100 %, og at summen med samtidig uttak ikke overstiger 100 %.',
            regler: lagStillingsprosentRegler(intl),
        },
        {
            id: 'samtidigUttaksprosent',
            område: 'Samtidig uttaksprosent',
            beskrivelse:
                'Hvor stor andel av kvoten brukeren tar ut samtidig med den andre forelderen. Reglene sikrer at ' +
                'verdien er et gyldig tall mellom 0 og 100 %, og at summen med stillingsprosent ikke overstiger 100 %.',
            regler: lagSamtidigUttaksprosentRegler(intl),
        },
        {
            id: 'hvaVilDuGjøre',
            område: 'Hva vil du gjøre?',
            beskrivelse:
                'Når brukeren velger hva som skal legges til i uttaksplanen (ferie, utsettelse, pause, opphold eller ' +
                'periode), sjekker vi at valget er gyldig i forhold til når perioden ligger og hvilke rettigheter ' +
                'brukeren har.',
            regler: lagHvaVilDuGjøreRegler(intl),
        },
    ];

    return (
        <RegelkatalogSide
            tittel="Feltregler i uttaksplanen"
            badge="Feltregler"
            farge="felt"
            kildesti="packages/uttaksplan/src/regler/felt/"
            intro={INTRO}
            områder={alleFeltregler}
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

const INTRO =
    'Når brukeren fyller ut skjemaet for å legge til eller endre en periode, kjører hvert felt sine egne regler. ' +
    'Disse reglene gir tilbakemelding på det enkelte feltet (f.eks. «Stillingsprosent må være mindre enn 100 %»), ' +
    'i tillegg til de overordnede valideringsreglene som kjøres ved lagring.';
