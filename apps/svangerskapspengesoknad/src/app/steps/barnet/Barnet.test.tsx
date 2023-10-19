import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Barnet.stories';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);
const ER_BARNET_FØDT = 'Er barnet født?';
const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const JA = 'Ja';
const NEI = 'Nei';
const FØDSELSDATO = 'Fødselsdato';
const TERMINDATO = 'Termindato';
const NESTE_STEG = 'Neste steg';
describe('<Barnet>', () => {
    const user = userEvent.setup();
    it('skal ikke måtte oppgi fødselsdato om barnet ikke er født', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.queryByText(FØDSELSDATO)).not.toBeInTheDocument();
        expect(await screen.findByText(TERMINDATO)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.queryByText('Du må oppgi fødselsdato.')).not.toBeInTheDocument();
    });
    it('skal måtte oppgi fødselsdato om barnet er født', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();

        await user.click(screen.getByText(JA));

        expect(await screen.findByText(FØDSELSDATO)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi fødselsdato.')[0]).toBeInTheDocument();
    });
    it('validering av for tidlig termindato (lengre enn 1 måned siden)', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.queryByText(FØDSELSDATO)).not.toBeInTheDocument();
        expect(await screen.findByText(TERMINDATO)).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText(TERMINDATO);
        await user.type(termindatoInput, dayjs().subtract(1, 'month').subtract(1, 'day').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText(
                'Termindato er mer enn 1 måned siden. Vennligst oppgi barnets/barnas fødselsdato.',
            )[0],
        ).toBeInTheDocument();
    });
    it('validering av for tidlig termindato og manglende fødselsdato', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();

        await user.click(screen.getByText(JA));

        expect(await screen.findByText(FØDSELSDATO)).toBeInTheDocument();
        expect(await screen.findByText(TERMINDATO)).toBeInTheDocument();

        const termindatoInput = screen.getByLabelText(TERMINDATO);
        await user.type(termindatoInput, dayjs().subtract(1, 'month').subtract(1, 'day').toString());
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi fødselsdato.')[0]).toBeInTheDocument();
    });
    it('validering av manglende termindato', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();

        await user.click(screen.getByText(NEI));

        expect(await screen.queryByText(FØDSELSDATO)).not.toBeInTheDocument();
        expect(await screen.findByText(TERMINDATO)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi termindato.')[0]).toBeInTheDocument();
    });
    it('validering av for sen termindato', async () => {
        render(<Default />);

        await user.click(screen.getByText(NEI));

        const termindatoInput = screen.getByLabelText(TERMINDATO);
        await user.type(termindatoInput, dayjs().add(9, 'months').add(1, 'days').format('DD.MM.YYYY'));
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du kan ikke søke så langt frem i tid.')[0]).toBeInTheDocument();
    });
    it('validering av termindato på feil format', async () => {
        render(<Default />);

        await user.click(screen.getByText(NEI));

        const termindatoInput = screen.getByLabelText(TERMINDATO);
        await user.type(termindatoInput, 'bla bla');
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Termindato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('validering av for tidlig fødselsdato', async () => {
        render(<Default />);

        await user.click(screen.getByText(JA));

        const fødselsdatoInput = screen.getByLabelText(FØDSELSDATO);
        const termindatoInput = screen.getByLabelText(TERMINDATO);
        await user.type(fødselsdatoInput, '2024-05-19');
        await user.type(termindatoInput, '2023-10-18');
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Termindatoen kan ikke være tidligere enn 1 måned før fødselsdatoen')[0],
        ).toBeInTheDocument();
        vi.useRealTimers();
    });
    it('validering av for sen fødselsdato', async () => {
        render(<Default />);

        await user.click(screen.getByText(JA));

        const fødselsdatoInput = screen.getByLabelText(FØDSELSDATO);
        const termindatoInput = screen.getByLabelText(TERMINDATO);
        await user.type(fødselsdatoInput, '2023-10-18');
        await user.type(termindatoInput, '2024-05-19');
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Termindatoen kan ikke være senere enn 6 måneder etter fødselsdatoen')[0],
        ).toBeInTheDocument();
        vi.useRealTimers();
    });
    it('validering av manglende fødselsdato', async () => {
        render(<Default />);

        await user.click(screen.getByText(JA));

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi fødselsdato.')[0]).toBeInTheDocument();
    });
    it('validering av fødselsdato på feil format', async () => {
        render(<Default />);

        await user.click(screen.getByText(JA));

        const fødselsdatoInput = screen.getByLabelText(FØDSELSDATO);
        await user.type(fødselsdatoInput, 'bla bla');
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Fødselsdato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
});
