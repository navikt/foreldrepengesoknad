import { Meta, StoryObj } from '@storybook/react-vite';
import { IntlProvider, useIntl } from 'react-intl';

import messages from '../intl/messages/nb_NO.json';
import { ALLE_VALIDERINGSREGLER } from './index';

/**
 * Selvdokumenterende Storybook-side: viser hele valideringsregelkatalogen
 * for perioder i uttaksplanen. Siden er ment å leses av designere,
 * produkteiere og saksbehandlere — ikke bare utviklere.
 *
 * Innholdet blir generert direkte fra reglene i `src/regler/`, så siden er
 * alltid i synk med koden.
 */
const Valideringsregler = () => {
    const intl = useIntl();
    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 980, padding: 24 }}>
            <h1>Valideringsregler for perioder i uttaksplanen</h1>
            <p>
                Når brukeren legger til eller endrer en periode i uttaksplanen, blir reglene under sjekket i
                rekkefølge. Første regel som er brutt bestemmer hvilken feilmelding brukeren får. Samme regler
                gjelder både i listen og i kalenderen.
            </p>
            <p>
                Siden er autogenerert fra regelkatalogen i koden (
                <code>packages/uttaksplan/src/regler/</code>). Endrer du regelteksten der, endrer denne siden
                seg også.
            </p>
            {ALLE_VALIDERINGSREGLER.map((gruppe, gruppeIdx) => (
                <section key={gruppe.id} style={{ marginTop: 32 }}>
                    <h2>
                        {gruppeIdx + 1}. {gruppe.id}
                    </h2>
                    <p style={{ fontStyle: 'italic', color: '#444' }}>{gruppe.beskrivelse}</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                        <thead>
                            <tr style={{ background: '#f0f4f8', textAlign: 'left' }}>
                                <th style={cellStyle}>#</th>
                                <th style={cellStyle}>Regel-id</th>
                                <th style={cellStyle}>Hva regelen sier</th>
                                <th style={cellStyle}>Feilmelding til brukeren</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gruppe.regler.map((regel, idx) => (
                                <tr key={regel.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={cellStyle}>{idx + 1}</td>
                                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 12 }}>
                                        {regel.id}
                                    </td>
                                    <td style={cellStyle}>{regel.beskrivelse}</td>
                                    <td style={{ ...cellStyle, color: '#9a3412' }}>
                                        «{intl.formatMessage({ id: regel.feilmeldingId })}»
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ))}
        </div>
    );
};

const cellStyle: React.CSSProperties = {
    padding: '10px 12px',
    verticalAlign: 'top',
    fontSize: 14,
    lineHeight: 1.45,
};

const meta = {
    title: 'Uttaksplan/Valideringsregler (dokumentasjon)',
    component: Valideringsregler,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <IntlProvider locale="nb" messages={messages}>
                <Story />
            </IntlProvider>
        ),
    ],
} satisfies Meta<typeof Valideringsregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleReglar: Story = {};
