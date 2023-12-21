import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './PerioderStep.stories';
import dayjs from 'dayjs';

const { Default, FlereStillinger } = composeStories(stories);

describe('<Perioder>', () => {
    const user = userEvent.setup();
    it('feilmelding når ingenting er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Du skal jobbe fra:')).toBeInTheDocument();
        expect(screen.getByText('Til:')).toBeInTheDocument();
        expect(screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi fra og med datoen på perioden.')).toHaveLength(2);
        expect(
            screen.getAllByText('Du må oppgi om perioden varer frem til tre uker før termin eller en annen dato.'),
        ).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi stillingsprosenten du skal jobbe.')).toHaveLength(2);
    });
    it('skal ikke vise feilmelding når alt er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText('Du skal jobbe fra:')).toBeInTheDocument();

        const fradatoInput = screen.getByLabelText('Du skal jobbe fra:');
        await user.type(fradatoInput, dayjs('2023-10-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getByText('Til:')).toBeInTheDocument();
        await user.click(screen.getByText('Frem til tre uker før termin'));

        expect(screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?')).toBeInTheDocument();
        const stillingsprosentInput = screen.getByLabelText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await user.type(stillingsprosentInput, '20');

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await user.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi fra og med datoen på perioden.')).not.toBeInTheDocument();
        expect(
            screen.queryByText(
                'Du må oppgi om du skal jobbe redusert frem til tre uker før termin eller frem til en annen dato.',
            ),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi stillingsprosenten du skal jobbe.')).not.toBeInTheDocument();
    });
    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Du skal jobbe fra:')).toBeInTheDocument();

        const fradatoInput = screen.getByLabelText('Du skal jobbe fra:');
        await user.type(fradatoInput, 'bla bla');

        expect(screen.getByText('Til:')).toBeInTheDocument();
        await user.click(screen.getByText('Frem til en dato'));

        const tilOgMedDatoInput = screen.getByLabelText('Til og med dato');
        await user.type(tilOgMedDatoInput, 'bla bla');

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Fra og med datoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText('Sluttdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('frem til-dato skal vises når frem til er valgt', async () => {
        render(<Default />);

        expect(await screen.findByText('Til:')).toBeInTheDocument();
        await user.click(screen.getByText('Frem til en dato'));
        expect(screen.getByText('Til og med dato')).toBeInTheDocument();
    });
    it('validering av stillingsprosent på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Til:')).toBeInTheDocument();
        expect(screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?')).toBeInTheDocument();
        const stillingsprosentInput = screen.getByLabelText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await user.type(stillingsprosentInput, 'bla bla');
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Stillingsprosent må være et tall.')[0]).toBeInTheDocument();
    });
    it('vis ny periode når legg til ny periode er valgt', async () => {
        render(<Default />);

        expect(await screen.findByText('Legg til ny periode')).toBeInTheDocument();
        await user.click(screen.getByText('Legg til ny periode'));

        expect(screen.getAllByText('Ny periode')[1]).toBeInTheDocument();
    });
    it('fjern perioden hvis slett perioden er klikket på', async () => {
        render(<Default />);

        expect(await screen.findByText('Legg til ny periode')).toBeInTheDocument();
        await user.click(screen.getByText('Legg til ny periode'));

        expect(screen.getAllByText('Du skal jobbe fra:')[1]).toBeInTheDocument();
        const fradatoInput = screen.getAllByText('Du skal jobbe fra:')[1];
        await user.type(fradatoInput, dayjs('2023-10-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getAllByText('Til:')[1]).toBeInTheDocument();
        await user.click(screen.getAllByText('Frem til tre uker før termin')[1]);

        const nyPeriode = '30.10.2023 - 27.01.2024';

        expect(screen.getAllByText('Fjern perioden', { exact: false })[0]).toBeInTheDocument();
        await user.click(screen.getAllByText('Fjern perioden')[0]);

        expect(screen.queryByText(nyPeriode)).not.toBeInTheDocument();
    });
    it('feilmelding ved overlappende perioder', async () => {
        render(<Default />);

        expect(await screen.findByText('Legg til ny periode')).toBeInTheDocument();
        await user.click(screen.getByText('Legg til ny periode'));

        expect(screen.getAllByText('Du skal jobbe fra:')[1]).toBeInTheDocument();
        const andreFradatoInput = screen.getAllByText('Du skal jobbe fra:')[1];
        await user.type(andreFradatoInput, dayjs('2024-01-01').format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getAllByText('Til:')[1]).toBeInTheDocument();
        await user.click(screen.getAllByText('Frem til tre uker før termin')[1]);

        const nyPeriode = '01.01.2024 - 27.01.2024';
        expect(screen.getByText(nyPeriode)).toBeInTheDocument();

        expect(screen.getAllByText('Du skal jobbe fra:')[0]).toBeInTheDocument();
        const førsteFradatoInput = screen.getAllByText('Du skal jobbe fra:')[0];
        await user.type(førsteFradatoInput, dayjs('2023-10-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getAllByText('Frem til en dato')[0]).toBeInTheDocument();
        await user.click(screen.getAllByText('Frem til en dato')[0]);

        expect(screen.getByText('Til og med dato')).toBeInTheDocument();
        const førsteTildatoInput = screen.getByText('Til og med dato');
        await user.type(førsteTildatoInput, dayjs('2024-01-27').format('DD.MM.YYYY'));
        await user.tab();

        const førstePeriode = '30.10.2023 - 27.01.2024';
        expect(screen.getByText(førstePeriode)).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Perioden overlapper med perioden ' + nyPeriode + '.')[0]).toBeInTheDocument();
    });
    it('stillingsprosenten skal valideres mot samlet stillingsprosent (30%) på skjæringstidspunktet', async () => {
        render(<FlereStillinger />);
        expect(await screen.findByText('Du skal jobbe fra:')).toBeInTheDocument();
        const førsteDatoFom = screen.getByText('Du skal jobbe fra:');
        await user.type(førsteDatoFom, dayjs('2023-10-02').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText('Frem til en dato'));
        expect(await screen.findByText('Til og med dato')).toBeInTheDocument();
        const førsteDatoTom = screen.getByText('Til og med dato');
        await user.type(førsteDatoTom, dayjs('2023-10-09').format('DD.MM.YYYY'));
        await user.tab();

        const stillingInput = screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await user.type(stillingInput, '40');
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(
            await screen.getAllByText(
                'Stillingsprosenten kan ikke være større enn din opprinnelig stillingsprosent på 30 %.',
            )[0],
        ).toBeInTheDocument();
    });
    it('stillingsprosenten skal valideres mot samlet stillingsprosent (100%) fordi et av stillingsprosentene på skjæringstidspunktet er på 0%', async () => {
        render(<FlereStillinger />);

        expect(await screen.findByText('Du skal jobbe fra:')).toBeInTheDocument();
        const førsteDatoFom = screen.getByText('Du skal jobbe fra:');
        await user.type(førsteDatoFom, dayjs('2023-11-02').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText('Frem til en dato'));
        expect(await screen.findByText('Til og med dato')).toBeInTheDocument();
        const førsteDatoTom = screen.getByText('Til og med dato');
        await user.type(førsteDatoTom, dayjs('2023-11-09').format('DD.MM.YYYY'));
        await user.tab();

        const stillingInput = screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await user.type(stillingInput, '101');
        await user.tab();
        await user.click(screen.getByText('Neste steg'));
        expect(
            await screen.getAllByText(
                'Stillingsprosenten kan ikke være større enn din opprinnelig stillingsprosent på 100 %.',
            )[0],
        ).toBeInTheDocument();
    });
    it('Det skal ikke være lov å legge til ny periode etter en periode full tilrettelegging', async () => {
        render(<FlereStillinger />);

        expect(await screen.findByText('Du skal jobbe fra:')).toBeInTheDocument();
        const førsteDatoFom = screen.getByText('Du skal jobbe fra:');
        await user.type(førsteDatoFom, dayjs('2023-11-02').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText('Frem til en dato'));
        expect(await screen.findByText('Til og med dato')).toBeInTheDocument();
        const førsteDatoTom = screen.getByText('Til og med dato');
        await user.type(førsteDatoTom, dayjs('2023-11-09').format('DD.MM.YYYY'));
        await user.tab();

        const stillingInput = screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await user.type(stillingInput, '100');
        await user.tab();

        await user.click(screen.getByText('Legg til ny periode'));
        const stillingInput2 = screen.getAllByText('Hvilken stillingsprosent skal du jobbe i denne perioden?')[1];
        await user.type(stillingInput2, '10');

        await user.click(screen.getByText('Neste steg'));
        expect(
            await screen.getAllByText(
                'Du må sende ny søknad hvis du skal jobbe redusert etter perioden som starter 02.11.2023',
                { exact: false },
            )[0],
        ).toBeInTheDocument();
    });
    it('Det skal ikke være lov å gå videre med kun full tilrettelegging', async () => {
        render(<FlereStillinger />);

        expect(await screen.findByText('Du skal jobbe fra:')).toBeInTheDocument();
        const førsteDatoFom = screen.getByText('Du skal jobbe fra:');
        await user.type(førsteDatoFom, dayjs('2023-11-02').format('DD.MM.YYYY'));
        await user.tab();

        await user.click(screen.getByText('Frem til en dato'));
        expect(await screen.findByText('Til og med dato')).toBeInTheDocument();
        const førsteDatoTom = screen.getByText('Til og med dato');
        await user.type(førsteDatoTom, dayjs('2023-11-09').format('DD.MM.YYYY'));
        await user.tab();

        const stillingInput = screen.getByText('Hvilken stillingsprosent skal du jobbe i denne perioden?');
        await user.type(stillingInput, '100');
        await user.tab();

        await user.click(screen.getByText('Neste steg'));
        expect(
            await screen.getAllByText(
                'Du kan ikke kun legge til perioder der du jobber din opprinnelige stillingsprosent på 100 %. Da har du ikke behov for svangerskapspenger.',
                { exact: false },
            )[0],
        ).toBeInTheDocument();
    });
});
