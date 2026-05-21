import { Meta, StoryObj } from '@storybook/react-vite';
import { IntlProvider, useIntl } from 'react-intl';

import messages from '../intl/messages/nb_NO.json';
import { ALLE_FELTREGLER } from './felt';

/**
 * Selvdokumenterende Storybook-side: viser feltreglene som kjøres direkte
 * på input-feltene i skjemaet for å legge til/endre en periode i uttaksplanen.
 *
 * I motsetning til `Valideringsregler.stories.tsx`, som beskriver reglene som
 * kjøres når brukeren lagrer hele perioden, viser denne siden reglene som
 * gir feedback mens brukeren fyller ut feltene.
 *
 * Siden er ment å leses av designere, produkteiere og saksbehandlere — ikke
 * bare utviklere. Innholdet blir generert direkte fra reglene i
 * `src/regler/felt/`, så siden er alltid i synk med koden.
 */
const Feltregler = () => {
    const intl = useIntl();
    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 980, padding: 24 }}>
            <h1>Feltregler i uttaksplanen</h1>
            <p>
                Når brukeren fyller ut skjemaet for å legge til eller endre en periode, kjører hvert felt sine
                egne regler. Disse reglene gir tilbakemelding på det enkelte feltet (f.eks. «Stillingsprosent må
                være mindre enn 100 %»), i tillegg til de overordnede valideringsreglene som kjøres ved
                lagring.
            </p>
            <p>
                Siden er autogenerert fra regelkatalogen i koden (
                <code>packages/uttaksplan/src/regler/felt/</code>
                ). Endrer du regelteksten der, endrer denne siden seg også.
            </p>
            {ALLE_FELTREGLER.map((kapittel, kapittelIdx) => (
                <section key={kapittel.id} style={{ marginTop: 32 }}>
                    <h2>
                        {kapittelIdx + 1}. {kapittel.feltnavn}
                    </h2>
                    <p style={{ fontStyle: 'italic', color: '#444' }}>{kapittel.beskrivelse}</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                        <thead>
                            <tr style={{ background: '#f0f4f8', textAlign: 'left' }}>
                                <th className={cellClass}>#</th>
                                <th className={cellClass}>Regel-id</th>
                                <th className={cellClass}>Hva regelen sier</th>
                                <th className={cellClass}>Feilmelding til brukeren</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kapittel.regler.map((regel, idx) => (
                                <tr key={regel.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td className={cellClass}>{idx + 1}</td>
                                    <td className={`${cellClass} font-mono text-xs`}>
                                        {regel.id}
                                    </td>
                                    <td className={cellClass}>{regel.beskrivelse}</td>
                                    <td className={cellClass}>{intl.formatMessage({ id: regel.feilmeldingId })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ))}
        </div>
    );
};

const cellClass = 'py-2.5 px-3 align-top text-sm leading-[1.45]';

const meta = {
    title: 'Uttaksplan/Feltregler (dokumentasjon)',
    component: Feltregler,
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
} satisfies Meta<typeof Feltregler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlleFeltregler: Story = {};
