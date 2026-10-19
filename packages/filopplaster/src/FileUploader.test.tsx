import { composeStories } from '@storybook/react-vite';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import * as stories from './FileUploader.stories';

const { Default, OpplastningTimeout, OpplastningNettverksfeilForFørsteFil } = composeStories(stories);

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

    it('skal vise feilmelding ved nettverksfeil og likevel laste opp resten av filene', async () => {
        const updateAttachments = vi.fn();

        await OpplastningNettverksfeilForFørsteFil.run({
            args: { ...OpplastningNettverksfeilForFørsteFil.args, updateAttachments },
        });

        const fil1 = new File(['hello'], 'fil-1.pdf', { type: 'application/pdf' });
        const fil2 = new File(['world'], 'fil-2.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, [fil1, fil2]);

        expect(await screen.findByText('Ops noe gikk galt prøv igjen', { exact: false })).toBeInTheDocument();
        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                [expect.objectContaining({ filename: 'fil-2.pdf', pending: false, uploaded: true })],
                false,
            ),
        );
        expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument();
    });

    it('skal beholde begge vedleggene når to filer med samme navn lastes opp samtidig', async () => {
        const updateAttachments = vi.fn();

        await Default.run({ args: { ...Default.args, updateAttachments } });

        const liten = new File(['a'], 'samme-navn.pdf', { type: 'application/pdf' });
        const stor = new File(['abcdef'], 'samme-navn.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, [liten, stor]);

        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ filesize: liten.size, uploaded: true, pending: false }),
                    expect.objectContaining({ filesize: stor.size, uploaded: true, pending: false }),
                ]),
                false,
            ),
        );
        const vedlegg = updateAttachments.mock.lastCall?.[0];
        expect(vedlegg).toHaveLength(2);
        expect(vedlegg[0].id).not.toBe(vedlegg[1].id);
    });

    it('skal beholde begge vedleggene når to ulike filer med samme navn velges etter hverandre', async () => {
        const updateAttachments = vi.fn();

        await Default.run({ args: { ...Default.args, updateAttachments } });

        const første = new File(['a'], 'scan.pdf', { type: 'application/pdf' });
        const andre = new File(['abcdef'], 'scan.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, første);
        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                [expect.objectContaining({ filesize: første.size, uploaded: true })],
                false,
            ),
        );

        await userEvent.upload(fileInput, andre);

        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                [
                    expect.objectContaining({ filesize: første.size, uploaded: true, pending: false }),
                    expect.objectContaining({ filesize: andre.size, uploaded: true, pending: false }),
                ],
                false,
            ),
        );
        const vedlegg = updateAttachments.mock.lastCall?.[0];
        expect(vedlegg[0].id).not.toBe(vedlegg[1].id);
    });

    it('skal erstatte vedlegget når samme fil velges på nytt', async () => {
        const updateAttachments = vi.fn();

        await Default.run({ args: { ...Default.args, updateAttachments } });

        const fil = new File(['hello'], 'scan.pdf', { type: 'application/pdf' });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, fil);
        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith([expect.objectContaining({ uploaded: true })], false),
        );
        const førsteId = updateAttachments.mock.lastCall?.[0][0].id;

        await userEvent.upload(fileInput, fil);

        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                [expect.objectContaining({ filename: 'scan.pdf', uploaded: true, pending: false })],
                false,
            ),
        );
        expect(updateAttachments.mock.lastCall?.[0][0].id).not.toBe(førsteId);
    });

    it('skal erstatte eksisterende vedlegg når samme fil velges på nytt', async () => {
        const fil = new File(['hello'], 'scan.pdf', { type: 'application/pdf' });
        const updateAttachments = vi.fn();

        await Default.run({
            args: {
                ...Default.args,
                updateAttachments,
                existingAttachments: [
                    {
                        id: 'existing-id',
                        filename: fil.name,
                        filesize: fil.size,
                        file: fil,
                        pending: false,
                        uploaded: true,
                        type: AttachmentType.OMSORGSOVERTAKELSE,
                        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                        innsendingsType: 'LASTET_OPP',
                    },
                ],
            },
        });

        const fileInput = screen.getByLabelText('Last opp fil');
        await userEvent.upload(fileInput, fil);

        await waitFor(() =>
            expect(updateAttachments).toHaveBeenLastCalledWith(
                [expect.objectContaining({ filename: 'scan.pdf', uuid: 'uuid-test', pending: false })],
                false,
            ),
        );
        expect(updateAttachments.mock.lastCall?.[0][0].id).not.toBe('existing-id');
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
