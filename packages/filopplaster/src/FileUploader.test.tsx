import { composeStories } from '@storybook/react-vite';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import * as stories from './FileUploader.stories';

const { Default, OpplastningTimeout } = composeStories(stories);

describe('FileUploader', () => {
    it('skal laste opp en fil', async () => {
        await Default.run();

        expect(await screen.findByText('Last opp fil')).toBeInTheDocument();

        const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, file);

        expect(await screen.findByText('test-document.pdf')).toBeInTheDocument();
        expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument();
    });

    it('skal varsle parent om pending og ferdig opplastet vedlegg', async () => {
        const updateAttachments = vi.fn();

        await Default.run({ args: { ...Default.args, updateAttachments } });

        const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, file);

        await waitFor(() => expect(updateAttachments).toHaveBeenCalledWith([], true));
        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                [
                    expect.objectContaining({
                        filename: 'test-document.pdf',
                        pending: false,
                        uploaded: true,
                        uuid: 'uuid-test',
                    }),
                ],
                false,
            ),
        );
    });

    it('skal ikkje overskrive eksisterende vedlegg med samme filnavn for et annet skjemanummer', async () => {
        const existingFile = new File(['existing'], 'samme-filnavn.pdf', { type: 'application/pdf' });
        const updateAttachments = vi.fn();

        await Default.run({
            args: {
                ...Default.args,
                updateAttachments,
                existingAttachments: [
                    {
                        id: 'existing-id',
                        filename: existingFile.name,
                        filesize: existingFile.size,
                        file: existingFile,
                        pending: false,
                        uploaded: true,
                        type: AttachmentType.TERMINBEKREFTELSE,
                        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                        innsendingsType: 'LASTET_OPP',
                    },
                ],
            },
        });

        const newFile = new File(['new'], 'samme-filnavn.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, newFile);

        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        filename: 'samme-filnavn.pdf',
                        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                    }),
                    expect.objectContaining({
                        filename: 'samme-filnavn.pdf',
                        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                        uuid: 'uuid-test',
                    }),
                ]),
                false,
            ),
        );
        expect(updateAttachments.mock.lastCall?.[0]).toHaveLength(2);
    });

    it('skal få timeout ved opplasting', async () => {
        await OpplastningTimeout.run();

        expect(await screen.findByText('Last opp fil')).toBeInTheDocument();

        const file = new File(['hello'], 'test-document.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, file);

        expect(await screen.findByText('test-document.pdf')).toBeInTheDocument();
        expect(
            await screen.findByText('Det tok for lang tid å laste opp dokumentet ditt.', { exact: false }),
        ).toBeInTheDocument();
    });
});
