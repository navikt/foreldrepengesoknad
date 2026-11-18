import { composeStories } from '@storybook/react-vite';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as stories from '../Uttaksplankalender.stories';
import { genererKalenderPdf } from './genererKalenderPdf';

vi.mock('./genererKalenderPdf', () => ({
    genererKalenderPdf: vi.fn(),
}));

const { MorSøkerMedFlereUtsettelser } = composeStories(stories);

const genererKalenderPdfMock = vi.mocked(genererKalenderPdf);

describe('KalenderPdf', () => {
    afterEach(() => {
        genererKalenderPdfMock.mockReset();
    });

    it('skal vise feilmelding når PDF-generering feiler og fjerne den ved nytt vellykket forsøk', async () => {
        genererKalenderPdfMock.mockRejectedValueOnce(new Error('feil')).mockResolvedValueOnce(undefined);
        render(<MorSøkerMedFlereUtsettelser />);

        await userEvent.click(screen.getByRole('button', { name: 'Last ned kalender som PDF' }));
        await userEvent.click(await screen.findByRole('button', { name: 'Last ned' }));

        expect(await screen.findByRole('alert')).toHaveTextContent('Vi klarte ikke å lage PDF-en. Prøv igjen.');

        await userEvent.click(screen.getByRole('button', { name: 'Last ned' }));

        expect(genererKalenderPdfMock).toHaveBeenCalledTimes(2);
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('skal avbryte forsøket ved lukking og ikke la det påvirke et nytt forsøk', async () => {
        const avvisninger: Array<(error: Error) => void> = [];
        const fullføringer: Array<() => void> = [];
        genererKalenderPdfMock.mockImplementation(
            () =>
                new Promise<void>((resolve, reject) => {
                    fullføringer.push(resolve);
                    avvisninger.push(reject);
                }),
        );
        render(<MorSøkerMedFlereUtsettelser />);

        await userEvent.click(screen.getByRole('button', { name: 'Last ned kalender som PDF' }));
        await userEvent.click(await screen.findByRole('button', { name: 'Last ned' }));
        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }));

        expect(genererKalenderPdfMock.mock.calls[0]?.[0].signal?.aborted).toBe(true);

        await userEvent.click(screen.getByRole('button', { name: 'Last ned kalender som PDF' }));
        const lastNedKnapp = await screen.findByRole('button', { name: 'Last ned' });
        await userEvent.click(lastNedKnapp);

        expect(lastNedKnapp).toBeDisabled();

        await act(() => Promise.resolve().then(() => avvisninger[0]?.(new Error('feil'))));

        expect(lastNedKnapp).toBeDisabled();
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();

        fullføringer[1]?.();

        await waitFor(() => expect(lastNedKnapp).toBeEnabled());
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('skal avbryte pågående forsøk når komponenten avmonteres', async () => {
        genererKalenderPdfMock.mockImplementation(() => new Promise<void>(() => undefined));
        const { unmount } = render(<MorSøkerMedFlereUtsettelser />);

        await userEvent.click(screen.getByRole('button', { name: 'Last ned kalender som PDF' }));
        await userEvent.click(await screen.findByRole('button', { name: 'Last ned' }));

        const signal = genererKalenderPdfMock.mock.calls[0]?.[0].signal;
        expect(signal?.aborted).toBe(false);

        unmount();

        expect(signal?.aborted).toBe(true);
    });
});
