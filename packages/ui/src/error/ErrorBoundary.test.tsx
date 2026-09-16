import { render, screen } from '@testing-library/react';

import { captureException } from '@navikt/fp-observability';

import { ErrorBoundary } from './ErrorBoundary';

vi.mock('@navikt/fp-observability', () => ({
    captureException: vi.fn(),
}));

const TestError = () => {
    throw new Error('Testfeil');
};

describe('<ErrorBoundary>', () => {
    it('rapporterer feil fanget under rendering', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        render(
            <ErrorBoundary appName="foreldrepengesoknad">
                <TestError />
            </ErrorBoundary>,
        );

        expect(captureException).toHaveBeenCalledWith(expect.objectContaining({ message: 'Testfeil' }));
        expect(screen.getByText('Testfeil')).toBeInTheDocument();
    });

    it('viser sida frå getErrorPage når han returnerer eit element', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        render(
            <ErrorBoundary
                appName="foreldrepengesoknad"
                getErrorPage={(error) => <div>Spesialside: {error.message}</div>}
            >
                <TestError />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Spesialside: Testfeil')).toBeInTheDocument();
    });

    it('fell tilbake til customErrorPage når getErrorPage returnerer undefined', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        render(
            <ErrorBoundary
                appName="foreldrepengesoknad"
                getErrorPage={() => undefined}
                customErrorPage={<div>Generisk feilside</div>}
            >
                <TestError />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Generisk feilside')).toBeInTheDocument();
    });

    it('fell tilbake til standard feilvisning når verken getErrorPage eller customErrorPage er sett', () => {
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        render(
            <ErrorBoundary appName="foreldrepengesoknad" getErrorPage={() => undefined}>
                <TestError />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Testfeil')).toBeInTheDocument();
    });
});
