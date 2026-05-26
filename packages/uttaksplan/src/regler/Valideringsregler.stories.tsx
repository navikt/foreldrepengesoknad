import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { Kolonne, MeldingSitat, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { lagArbeidOgUttakFørsteSeksUkerOmråde } from './validering/arbeidOgUttakDeFørsteSeksUkene';
import { lagFarMedmorMaksToUkerRundtFødselOmråde } from './validering/farMedmorMaksToUkerRundtFødsel';
import { lagFarMedmorRundtFødselOmråde } from './validering/farMedmorRundtFødsel';
import { lagSamtidigUttakOmråde } from './validering/samtidigUttak';

/**
 * Selvdokumenterende Storybook-side: viser valideringsreglene som kjøres
 * ved submit (lagring) av en periode. Disse reglene kjøres etter at
 * feltvalideringene har passert, og sjekker tverrgående betingelser som
 * ikke kan fanges opp av enkeltfelt alene.
 */
const Valideringsregler = () => {
    const intl = useIntl();
    const kolonner: ReadonlyArray<Kolonne<Valideringsregel>> = [
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
            render: (r) => <MeldingSitat tone="warning" tekst={r.feilmelding} />,
        },
    ];

    const alleValideringsregler: readonly ValideringskatalogOmråde[] = [
        lagArbeidOgUttakFørsteSeksUkerOmråde(intl),
        lagSamtidigUttakOmråde(intl),
        lagFarMedmorRundtFødselOmråde(intl),
        lagFarMedmorMaksToUkerRundtFødselOmråde(intl),
    ];

    return (
        <RegelkatalogSide
            tittel="Valideringsregler ved lagring av periode"
            badge="Validering"
            farge="validering"
            kildesti="packages/uttaksplan/src/regler/validering/"
            intro={INTRO}
            områder={alleValideringsregler}
            getRegelId={(r) => r.id}
            kolonner={kolonner}
        />
    );
};

const meta = {
    title: 'Uttaksplan/Valideringsregler (dokumentasjon)',
    component: Valideringsregler,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Valideringsregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleRegler: Story = {};

/**
 * Katalog-projeksjon: storybook-siden bryr seg kun om id, beskrivelse og
 * feilmelding — ikke om kontekst-typen som varierer per regelområde.
 */
type ValideringskatalogOmråde = {
    id: string;
    område: string;
    beskrivelse: string;
    regler: ReadonlyArray<{ id: string; beskrivelse: string; feilmelding: string }>;
};

type Valideringsregel = ValideringskatalogOmråde['regler'][number];

const INTRO =
    'Når brukeren lagrer en ny eller endret periode i uttaksplanen, blir reglene under sjekket i rekkefølge — ' +
    'etter at feltvalideringene allerede har passert. Første regel som er brutt bestemmer hvilken feilmelding ' +
    'brukeren får. Samme regler gjelder både i listen og i kalenderen.';
