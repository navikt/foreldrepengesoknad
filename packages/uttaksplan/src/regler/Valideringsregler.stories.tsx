import { Meta, StoryObj } from '@storybook/react-vite';
import { IntlProvider, useIntl } from 'react-intl';

import messages from '../intl/messages/nb_NO.json';
import { ALLE_VALIDERINGSREGLER } from './index';

/**
 * Sjølv-dokumenterande Storybook-side: viser heile valideringsregelkatalogen
 * for periodar i uttaksplanen. Sida er meint å lesast av designarar,
 * produkteigarar og saksbehandlarar — ikkje berre utviklarar.
 *
 * Innhaldet blir generert direkte frå reglane i `src/regler/`, så sida er
 * alltid i synk med koden.
 */
const Valideringsregler = () => {
    const intl = useIntl();
    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 980, padding: 24 }}>
            <h1>Valideringsreglar for periodar i uttaksplanen</h1>
            <p>
                Når brukaren legg til eller endrar ein periode i uttaksplanen, blir reglane under sjekka i
                rekkjefølgje. Første regel som er brote bestemmer kva feilmelding brukaren får. Same reglar
                gjeld både i lista og i kalenderen.
            </p>
            <p>
                Sida er autogenerert frå regelkatalogen i koden (
                <code>packages/uttaksplan/src/regler/</code>). Endrar du regelteksten der, endrar denne sida
                seg òg.
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
                                <th style={cellStyle}>Kva regelen seier</th>
                                <th style={cellStyle}>Feilmelding til brukaren</th>
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
