import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './FileUploader.stories';

const { Default, OpplastningTimeout } = composeStories(stories);

describe('FileUploader', () => {
    it(
        'skal laste opp en fil',
        async () => {
            await Default.run();

            expect(await screen.findByText('Last opp fil')).toBeInTheDocument();

            const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

            const fileInput = screen.getByLabelText('Last opp fil');
            await userEvent.upload(fileInput, file);

            expect(await screen.findByText('test-document.pdf')).toBeInTheDocument();
            expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument();
        },
    );

    it(
        'skal få timeout ved opplasting',
        async () => {
            await OpplastningTimeout.run();

            expect(await screen.findByText('Last opp fil')).toBeInTheDocument();

            const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

            const fileInput = screen.getByLabelText('Last opp fil');
            await userEvent.upload(fileInput, file);

            expect(await screen.findByText('test-document.pdf')).toBeInTheDocument();
            expect(
                await screen.findByText('Det tok for lang tid å laste opp dokumentet ditt.', { exact: false }),
            ).toBeInTheDocument();
        },
    );
});
