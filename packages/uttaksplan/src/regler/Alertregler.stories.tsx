import { Meta, StoryObj } from '@storybook/react-vite';

import { BodyShort, Tag, VStack } from '@navikt/ds-react';

import { Kolonne, MeldingSitat, RegelIdBadge, RegelkatalogSide } from './RegelkatalogSide';
import {
    ADOPSJON_PERIODE_FØR_FAMHEND,
    IKKE_REDIGERBAR_EØS,
    IKKE_REDIGERBAR_PLEIEPENGER,
    KAN_MISTE_DAGER,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MANGLER_MORS_AKTIVITET_LISTE,
    MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGER_FØR_FAMHEND,
    VALGTE_DAGER_FØR_SEKS_UKER,
} from './alert/informasjonsAlerts';
import { BLOKKERENDE_ALERTS, KONTEKSTUELLE_ALERTS } from './alert/skjemaAlerts';
import { Alertområde, AlertregelDoc, VISNINGSSTED_LABELS } from './alert/types';

/**
 * Selvdokumenterende Storybook-side: viser alertreglene i hele
 * uttaksplan-pakken — informasjonsmeldinger (Alert/InlineMessage) som
 * dukker opp ulike steder: i skjemaet for å legge til/endre periode,
 * i listevisningen, i kalendervisningen, i redigeringspaneler osv.
 */
const renderVisningssteder = (regel: Alertregel) => (
    <VStack gap="space-4">
        {regel.visningssteder.map((sted) => (
            <Tag key={sted} variant="neutral" size="xsmall">
                {VISNINGSSTED_LABELS[sted]}
            </Tag>
        ))}
    </VStack>
);

const renderMeldinger = (regel: Alertregel) => (
    <VStack gap="space-4">
        {regel.meldinger.map((melding, i) => (
            <MeldingSitat key={`${regel.id}-${i}`}>{melding}</MeldingSitat>
        ))}
    </VStack>
);

const Alertregler = () => {
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
            render: renderVisningssteder,
        },
        {
            overskrift: 'Hva regelen sier',
            render: (r) => <BodyShort size="small">{r.beskrivelse}</BodyShort>,
        },
        {
            overskrift: 'Melding(er) til brukeren',
            bredde: '25%',
            render: renderMeldinger,
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

const BLOKKERENDE_ALERT_OMRÅDE: Alertområde = {
    id: 'blokkerendeAlerts',
    område: 'Blokkerende meldinger',
    beskrivelse:
        'Disse meldingene erstatter hele skjemaet (early return). De hindrer brukeren fra å ' +
        'gjøre endringer som ikke er lovlige, og forklarer hvorfor skjemaet ikke er tilgjengelig.',
    regler: BLOKKERENDE_ALERTS,
};

const KONTEKSTUELL_ALERT_OMRÅDE: Alertområde = {
    id: 'kontekstuelleAlerts',
    område: 'Kontekstuelle meldinger',
    beskrivelse:
        'Disse meldingene dukker opp inne i skjemaet som tilleggsinformasjon — typisk når ' +
        'brukeren har gjort et valg som har konsekvenser det er viktig å vite om.',
    regler: KONTEKSTUELLE_ALERTS,
};

/**
 * Informasjonsalert-reglane lever som `Alertregel<TKontekst>` for runtime, men har eit
 * konsistent supersett (`AlertregelDoc`) — så vi kan liste dei direkte utan cast.
 */
const ALLE_INFORMASJONS_ALERTS: readonly AlertregelDoc[] = [
    MANGLER_MORS_AKTIVITET_LISTE,
    MANGLER_MORS_AKTIVITET_KALENDER,
    MORS_AKTIVITET_IKKE_OPPGITT_REDIGERING,
    MORS_AKTIVITET_IKKE_VALGT_EKSISTERENDE,
    KAN_MISTE_DAGER,
    ADOPSJON_PERIODE_FØR_FAMHEND,
    IKKE_REDIGERBAR_EØS,
    IKKE_REDIGERBAR_PLEIEPENGER,
    SENERE_PERIODER_READONLY,
    VALGTE_DAGER_FØR_SEKS_UKER,
    VALGTE_DAGER_FØR_FAMHEND,
];

const INFORMASJONS_ALERT_OMRÅDE: Alertområde = {
    id: 'informasjonsAlerts',
    område: 'Informasjonsmeldinger i uttaksplanen',
    beskrivelse:
        'Disse meldingene dukker opp ulike steder i uttaksplan-visningen (liste, kalender, ' +
        'redigeringspaneler) for å informere brukeren om konsekvenser av valg, manglende ' +
        'utfyllinger eller låste perioder. De stopper ikke brukeren — men gir kontekst ' +
        'eller varsler om noe som krever oppmerksomhet.',
    regler: ALLE_INFORMASJONS_ALERTS,
};

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
