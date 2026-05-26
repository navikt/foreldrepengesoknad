import { Meta, StoryObj } from '@storybook/react-vite';
import { useIntl } from 'react-intl';

import { BodyShort, Tag, VStack } from '@navikt/ds-react';

import { Kolonne, MeldingSitat, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import { INFORMASJONS_ALERT_OMRÅDE } from './alert/informasjonsAlerts';
import { BLOKKERENDE_ALERT_OMRÅDE, KONTEKSTUELL_ALERT_OMRÅDE } from './alert/skjemaAlerts';
import { Alertområde, VISNINGSSTED_LABELS } from './alert/types';

const ALLE_ALERTREGLER: readonly Alertområde[] = [
    BLOKKERENDE_ALERT_OMRÅDE,
    KONTEKSTUELL_ALERT_OMRÅDE,
    INFORMASJONS_ALERT_OMRÅDE,
];

type Alertregel = Alertområde['regler'][number];

const INTRO =
    'I tillegg til felt- og valideringsreglene har uttaksplanen en rekke informasjonsmeldinger som dukker opp ' +
    'i bestemte situasjoner. Noen blokkerer skjemaet (brukeren kan ikke gå videre), mens andre er kontekstuelle ' +
    'hint som vises i listen, kalenderen eller redigeringspanelene. Kolonnen «Vises» forteller hvor i ' +
    'applikasjonen hver regel slår inn.';

/**
 * Selvdokumenterende Storybook-side: viser alertreglene i hele
 * uttaksplan-pakken — informasjonsmeldinger (Alert/InlineMessage) som
 * dukker opp ulike steder: i skjemaet for å legge til/endre periode,
 * i listevisningen, i kalendervisningen, i redigeringspaneler osv.
 */
const Alertregler = () => {
    const intl = useIntl();
    const kolonner: ReadonlyArray<Kolonne<Alertregel>> = [
        {
            overskrift: 'Regel-id',
            bredde: '20%',
            render: (r) => <RegelIdBadge id={r.id} />,
        },
        {
            overskrift: 'Type',
            bredde: '10%',
            render: (r) => (
                <Tag variant={r.type === 'blokkerende' ? 'warning' : 'info'} size="small">
                    {r.type}
                </Tag>
            ),
        },
        {
            overskrift: 'Vises',
            bredde: '20%',
            render: (r) => (
                <VStack gap="space-4">
                    {r.visningssteder.map((sted) => (
                        <Tag key={sted} variant="neutral" size="xsmall">
                            {VISNINGSSTED_LABELS[sted]}
                        </Tag>
                    ))}
                </VStack>
            ),
        },
        {
            overskrift: 'Hva regelen sier',
            render: (r) => <BodyShort size="small">{r.beskrivelse}</BodyShort>,
        },
        {
            overskrift: 'Melding(er) til brukeren',
            bredde: '25%',
            render: (r) => (
                <VStack gap="space-4">
                    {r.meldingIder.map((id) => (
                        <MeldingSitat key={id} tekst={intl.formatMessage({ id })} />
                    ))}
                </VStack>
            ),
        },
    ];

    return (
        <RegelkatalogSide
            tittel="Alertregler i uttaksplanen"
            badge="Alerts"
            farge="alert"
            kildesti="packages/uttaksplan/src/regler/alert/"
            intro={INTRO}
            områder={ALLE_ALERTREGLER}
            getRegelId={(r) => r.id}
            kolonner={kolonner}
        />
    );
};

const meta = {
    title: 'Uttaksplan/Alertregler (dokumentasjon)',
    component: Alertregler,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Alertregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleAlertregler: Story = {};
