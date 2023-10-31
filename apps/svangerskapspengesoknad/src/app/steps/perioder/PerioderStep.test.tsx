import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './PerioderStep.stories';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);
const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const FRA_DATO = 'Du skal jobbe fra:';
const TIL_DATO = 'Til:';
const FREM_TIL_DATO = 'Frem til en dato';
const TOM = 'Til og med dato';
const FREM_TIL_TERMIN = 'Frem til tre uker før termin';
const STILLINGSPROSENT = 'Hvilken stillingsprosent skal du jobbe i denne perioden?';
const LEGG_TIL_NY_PERIODE = 'Legg til ny periode';
const SLETT_PERIODEN = 'Slett perioden';
const NESTE_STEG = 'Neste steg';

describe('<Perioder>', () => {
    const user = userEvent.setup();
    it('feilmelding når ingenting er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(FRA_DATO)).toBeInTheDocument();
        expect(await screen.findByText(TIL_DATO)).toBeInTheDocument();
        expect(await screen.findByText(STILLINGSPROSENT)).toBeInTheDocument();

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi fra og med datoen på perioden.')[0]).toBeInTheDocument();
        expect(
            await screen.getAllByText(
                'Du må oppgi om du skal jobbe redusert frem til tre uker før termin eller frem til en annen dato.',
            )[0],
        ).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi stillingsprosenten du skal jobbe.')[0]).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding når alt er utfylt', async () => {
        render(<Default />);
        expect(await screen.findByText(FRA_DATO)).toBeInTheDocument();
        const fradatoInput = screen.getByLabelText(FRA_DATO);
        await user.type(fradatoInput, dayjs('2023-10-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(TIL_DATO)).toBeInTheDocument();
        await user.click(screen.getByText(FREM_TIL_TERMIN));

        expect(await screen.findByText(STILLINGSPROSENT)).toBeInTheDocument();
        const stillingsprosentInput = screen.getByLabelText(STILLINGSPROSENT);
        await user.type(stillingsprosentInput, '20');

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.queryByText('Du må oppgi fra og med datoen på perioden.')).not.toBeInTheDocument();
        expect(
            await screen.queryByText(
                'Du må oppgi om du skal jobbe redusert frem til tre uker før termin eller frem til en annen dato.',
            ),
        ).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må oppgi stillingsprosenten du skal jobbe.')).not.toBeInTheDocument();
    });
    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(FRA_DATO)).toBeInTheDocument();

        const fradatoInput = screen.getByLabelText(FRA_DATO);
        await user.type(fradatoInput, 'bla bla');

        expect(await screen.findByText(TIL_DATO)).toBeInTheDocument();
        await user.click(screen.getByText(FREM_TIL_DATO));

        const tilOgMedDatoInput = screen.getByLabelText(TOM);
        await user.type(tilOgMedDatoInput, 'bla bla');

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Fra og med datoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('frem til-dato skal vises når frem til er valgt', async () => {
        render(<Default />);

        expect(await screen.findByText(TIL_DATO)).toBeInTheDocument();
        await user.click(screen.getByText(FREM_TIL_DATO));
        expect(await screen.findByText(TOM)).toBeInTheDocument();
    });
    it('validering av stillingsprosent på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(TIL_DATO)).toBeInTheDocument();
        expect(await screen.findByText(STILLINGSPROSENT)).toBeInTheDocument();
        const stillingsprosentInput = screen.getByLabelText(STILLINGSPROSENT);
        await user.type(stillingsprosentInput, 'bla bla');
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Stillingsprosent må være et tall.')[0]).toBeInTheDocument();
    });
    it('vis ny periode når legg til ny periode er valgt', async () => {
        render(<Default />);

        // TODO fiks denne?
        expect(await screen.findByText(LEGG_TIL_NY_PERIODE)).toBeInTheDocument();
        await user.click(screen.getByText(LEGG_TIL_NY_PERIODE));

        expect(await screen.findByText(SLETT_PERIODEN)).toBeInTheDocument();
    });
    it('fjern perioden hvis slett perioden er klikket på', async () => {
        render(<Default />);
    });
});
