import { fireEvent, render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import * as stories from './SkjemaSteg.stories';

const { SkalIkkeFeileOpplasting, MedVedlegg, MedToTilrettelegginger, ErTypeFrilans, KanMaxHaToVedlegg } =
    composeStories(stories);

describe('<SkjemaSteg>', () => {
    it('skal vise feilmelding når en ikke har lastet opp minst ett vedlegg', async () => {
        render(<SkalIkkeFeileOpplasting />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Last opp skjema')).toBeInTheDocument();
        expect(screen.getByText('Last opp skjema for risiko og tilrettelegging i svangerskapet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må laste opp minst ett dokument')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må laste opp minst ett dokument')).not.toBeInTheDocument();
    });

    it('skal vise opplaster vedlegg', async () => {
        render(<MedVedlegg />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('vedlegg – Kopi (7).png')).toBeInTheDocument();
    });

    it('skal vise skjema når en har minst to tilrettelegginger', async () => {
        render(<MedToTilrettelegginger />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Last opp skjema for Omsorgspartner Vestfold AS')).toBeInTheDocument();
        expect(screen.getByText('Om ditt arbeidsforhold i')).toBeInTheDocument();
        expect(screen.getByText('Omsorgspartner Vestfold AS')).toBeInTheDocument();
    });

    it('skal vise skjema for type frilans', async () => {
        render(<ErTypeFrilans />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Last opp bekreftelse for krav til svangerskapspenger til frilans'),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Her skal du laste opp bekreftelsen som er skrevet av din lege eller jordmor.'),
        ).toBeInTheDocument();
    });

    it('skal vise kunne laste opp maks 2 (40 i prod) vedlegg', async () => {
        render(<KanMaxHaToVedlegg />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        const file1 = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file1, length: 1, 0: file1 } },
        });

        const file2 = new File(['hello1'], 'hello1.png', { type: 'image/png' });
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file2, length: 1, 0: file2 } },
        });

        await userEvent.click(screen.getByText('Neste steg'));
        expect(
            screen.getByText('Du kan laste opp maksimalt 40 vedlegg i din søknad. Slett 1 vedlegg for å gå videre.'),
        ).toBeInTheDocument();
    });
});
