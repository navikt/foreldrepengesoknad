import { Meta, StoryObj } from '@storybook/react-vite';
import { IntlProvider } from 'react-intl';

import messages from '../intl/messages/nb_NO.json';
import { ALLE_SYNLIGHETSREGLER } from './synlighet';

/**
 * Selvdokumenterende Storybook-side: viser synlighetsreglene for skjemaet
 * for å legge til/endre en periode i uttaksplanen — altså reglene som
 * bestemmer hvilke felter, radioknapper og infobokser brukeren ser
 * avhengig av valgene som er gjort så langt.
 *
 * Siden er ment å leses av designere, produkteiere og saksbehandlere —
 * ikke bare utviklere. Innholdet blir generert direkte fra reglene i
 * `src/regler/synlighet/`, så siden er alltid i synk med koden.
 */
const Synlighetsregler = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 1040, padding: 24 }}>
            <h1>Synlighetsregler i uttaksplan-skjemaet</h1>
            <p>
                Skjemaet for å legge til eller endre en periode er progressivt — felter, radioknapper og
                infobokser dukker opp etter hvert som brukeren gjør valg. Reglene under bestemmer hvilke
                deler av skjemaet som vises i hvilke situasjoner.
            </p>
            <p>
                Siden er autogenerert fra synlighetskatalogen i koden (
                <code>packages/uttaksplan/src/regler/synlighet/</code>). Endrer du regelteksten der, endrer
                denne siden seg også.
            </p>
            {ALLE_SYNLIGHETSREGLER.map((kapittel, kapittelIdx) => (
                <section key={kapittel.id} style={{ marginTop: 32 }}>
                    <h2>
                        {kapittelIdx + 1}. {kapittel.område}
                    </h2>
                    <p style={{ fontStyle: 'italic', color: '#444' }}>{kapittel.beskrivelse}</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                        <thead>
                            <tr style={{ background: '#f0f4f8', textAlign: 'left' }}>
                                <th style={cellStyle}>#</th>
                                <th style={cellStyle}>Regel-id</th>
                                <th style={cellStyle}>Hva regelen sier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kapittel.regler.map((regel, idx) => (
                                <tr key={regel.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={cellStyle}>{idx + 1}</td>
                                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 12 }}>
                                        {regel.id}
                                    </td>
                                    <td style={cellStyle}>{regel.beskrivelse}</td>
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
    title: 'Uttaksplan/Synlighetsregler (dokumentasjon)',
    component: Synlighetsregler,
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
} satisfies Meta<typeof Synlighetsregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleSynlighetsregler: Story = {};
