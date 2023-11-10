import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './MorFodsel.stories';

const {
    UttaksplanMedAleneomsorg,
    UttaksplanMedPrematurFødsel,
    UttaksplanMedDeltUttak,
    UttaksplanMedFlerbarnsukerTvillinger,
} = composeStories(stories);

describe('<UttaksplanInfo_MorFødsel>', () => {
    it('skal fylle ut dekningsgrad før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 56 uker')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.queryByText('Hvor mange uker skal du ha av fellesperioden?')).not.toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om at stønadsperioden er forlenget når en har prematur fødsel', async () => {
        render(<UttaksplanMedPrematurFødsel />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Stønadsperioden din er forlenget med 8 uker og 3 dager siden du har født før svangerskapsuke 33.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('67.6 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 64.6 uker')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.queryByText('Hvor mange uker skal du ha av fellesperioden?')).not.toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om delt uttak ved valg av 100 prosent foreldrepenger', async () => {
        render(<UttaksplanMedDeltUttak />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();
        expect(screen.queryByText('TALENTFULL MYGGs del')).not.toBeInTheDocument();
        expect(screen.queryByText('Når ønsker du å starte perioden?')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvor mange uker skal du ha av fellesperioden?')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.getByText('8 av 16 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise veileder info om mor velger å ikke ta foreldrepenger før fødsel', async () => {
        render(<UttaksplanMedDeltUttak />);
        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg tok ikke ut foreldrepenger før termin'));
        expect(
            await screen.findByText(
                'Når du ikke starter foreldrepengeperioden 3 uker før termindato mister du rett til foreldrepenger disse dagene.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise info om delt uttak ved valg av 80 prosent foreldrepenger', async () => {
        render(<UttaksplanMedDeltUttak />);
        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om tvillingsfødsel ved valg av 100 prosent foreldrepenger', async () => {
        render(<UttaksplanMedFlerbarnsukerTvillinger />);
        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        expect(screen.queryByText('TALENTFULL MYGGs del')).not.toBeInTheDocument();
        expect(screen.queryByText('Når ønsker du å starte perioden?')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvor mange uker skal du ha av fellesperioden?')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('66 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('33 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(
            screen.getByText('Dere har 17 uker med flerbarnsuker som dere kan dele', { exact: false }),
        ).toBeInTheDocument();
        expect(screen.getByText('17 av 33 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om tvillingsfødsel ved valg av 80 prosent foreldrepenger', async () => {
        render(<UttaksplanMedFlerbarnsukerTvillinger />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();
        expect(screen.queryByText('TALENTFULL MYGGs del')).not.toBeInTheDocument();
        expect(screen.queryByText('Når ønsker du å starte perioden?')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvor mange uker skal du ha av fellesperioden?')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('80 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('TALENTFULL MYGGs del')).toBeInTheDocument();

        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('39 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(
            screen.getByText('Dere har 21 uker med flerbarnsuker som dere kan dele', { exact: false }),
        ).toBeInTheDocument();
        expect(screen.getByText('20 av 39 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
