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
});
