import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './FileUploader.stories';

const { Default, OpplastningTimeout } = composeStories(stories);

describe('FileUploader', () => {
    it.todo(
        'skal laste opp en fil',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Default.parameters.msw);

            render(<Default />);

            expect(await screen.findByText('Last opp fil')).toBeInTheDocument();

            const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

            const fileInput = screen.getByLabelText('Last opp fil');
            await userEvent.upload(fileInput, file);

            expect(await screen.findByText('test-document.pdf')).toBeInTheDocument();
            screen.logTestingPlaygroundURL();
            expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument();
        }),
    );

    // Denne funker fint lokalt. Men er flaky i CI
    it.todo(
        'skal få timeout ved opplasting',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(OpplastningTimeout.parameters.msw);

            render(<OpplastningTimeout />);

            expect(await screen.findByText('Last opp fil')).toBeInTheDocument();

            const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

            const fileInput = screen.getByLabelText('Last opp fil');
            await userEvent.upload(fileInput, file);

            expect(await screen.findByText('test-document.pdf')).toBeInTheDocument();
            expect(
                await screen.findByText('Det tok for lang tid å laste opp dokumentet ditt.', { exact: false }),
            ).toBeInTheDocument();
        }),
    );
});
