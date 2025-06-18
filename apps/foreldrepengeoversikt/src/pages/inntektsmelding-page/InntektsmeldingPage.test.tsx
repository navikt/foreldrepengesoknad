import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './InntektsmeldingPage.stories';

const {
    UtenRefusjon,
    DelvisRefusjon,
    MedRefusjon,
    EnBortfaltNaturalytelse,
    FlereBortfalteNaturalytelser,
    Refusjonsperioder,
} = composeStories(stories);

describe('<InntektsmeldingPage>', () => {
    it(
        'Uten Refusjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(UtenRefusjon.parameters.msw);
            render(<UtenRefusjon />);

            expect(await screen.findByText('Din inntekt rapportert av Laksinor')).toBeInTheDocument();
            expect(await screen.findByText('Hvordan utbetales foreldrepengene?')).toBeInTheDocument();
            expect(
                await screen.findByText('Laksinor har opplyst at det utbetales direkte til deg fra Nav.'),
            ).toBeInTheDocument();
        }),
    );

    it(
        'Med Refusjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MedRefusjon.parameters.msw);
            render(<MedRefusjon />);

            expect(await screen.findByText('Hvordan utbetales foreldrepengene?')).toBeInTheDocument();
            expect(
                await screen.findByText('Laksinor har opplyst at de skal utbetale til deg, og ønsker betalt Fra Nav.'),
            ).toBeInTheDocument();
        }),
    );

    it(
        'Delvis Refusjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(DelvisRefusjon.parameters.msw);
            render(<DelvisRefusjon />);

            expect(await screen.findByText('Hvordan utbetales svangerskapspengene?')).toBeInTheDocument();
            expect(
                await screen.findByText('Laksinor har opplyst at det skal utbetales delvis av dem og Nav.'),
            ).toBeInTheDocument();
        }),
    );

    it(
        'Flere refusjonsperioder',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Refusjonsperioder.parameters.msw);
            render(<Refusjonsperioder />);

            expect(await screen.findByText('Hvordan utbetales foreldrepengene?')).toBeInTheDocument();
            expect(
                await screen.findByText('Laksinor har opplyst at det skal utbetales delvis av dem og Nav.'),
            ).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Fra 12.10.2024 - Laksinor har opplyst at det skal utbetales delvis av dem og Nav.',
                ),
            ).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Fra 13.10.2024 - Laksinor har opplyst at det utbetales direkte til deg fra Nav.',
                ),
            ).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Fra 14.10.2024 - Laksinor har opplyst at de skal utbetale til deg, og ønsker betalt Fra Nav.',
                ),
            ).toBeInTheDocument();
        }),
    );

    it(
        'En bortfalt naturalytelse',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(EnBortfaltNaturalytelse.parameters.msw);
            render(<EnBortfaltNaturalytelse />);

            expect(await screen.findByText('Naturalytelser eller “frynsegoder” under permisjonen')).toBeInTheDocument();
            expect(
                await screen.findByText('10.09.2024 får du ikke lenger Fri transport til en verdi av 998 kr.'),
            ).toBeInTheDocument();
        }),
    );

    it(
        'Flere bortfalte naturalytelser',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FlereBortfalteNaturalytelser.parameters.msw);
            render(<FlereBortfalteNaturalytelser />);

            expect(await screen.findByText('Naturalytelser eller “frynsegoder” under permisjonen')).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Mellom 10.09.2024 og 11.10.2024 får du ikke lenger Fri transport til en verdi av 998 kr.',
                ),
            ).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Mellom 12.12.2024 og 24.12.2024 får du ikke lenger Fri transport til en verdi av 998 kr.',
                ),
            ).toBeInTheDocument();
            expect(
                await screen.findByText(
                    '01.01.2025 får du ikke lenger Elektrisk kommunikasjon til en verdi av 200 kr.',
                ),
            ).toBeInTheDocument();
        }),
    );
});
