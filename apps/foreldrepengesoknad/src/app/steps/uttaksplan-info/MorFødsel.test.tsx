import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './MorFodsel.stories';

const {
    MorAleneomsorgDekningsgrad100Før1Okt2021,
    MorDeltUttakPrematurFødselDekningsgrad100,
    MorDeltUttakDekningsgrad100EtterWLB,
    MorDeltUttakTvillingerDekningsgrad100FørWLB,
} = composeStories(stories);

describe('<UttaksplanInfo_MorFødsel>', () => {
    it('skal fylle ut dekningsgrad før en kan gå videre når en har aleneomsorg', async () => {
        render(<MorAleneomsorgDekningsgrad100Før1Okt2021 />);

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('3 + 56 uker')).toBeInTheDocument();

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
        render(<MorDeltUttakPrematurFødselDekningsgrad100 />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Stønadsperioden din er forlenget med 8 uker og 3 dager siden du har født før svangerskapsuke 33.',
            ),
        ).toBeInTheDocument();

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
        render(<MorDeltUttakDekningsgrad100EtterWLB />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('TALENTFULL MYGGs del')).toBeInTheDocument();
        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')).toHaveLength(2);

        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('18 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(screen.getByText('9 av 18 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
    });

    it('skal vise veileder info om mor velger å ikke ta foreldrepenger før fødsel', async () => {
        render(<MorDeltUttakDekningsgrad100EtterWLB />);
        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg tok ikke ut foreldrepenger før termin'));
        expect(
            await screen.findByText(
                'Når du ikke starter foreldrepengeperioden 3 uker før termindato mister du rett til foreldrepenger disse dagene.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise info om delt uttak ved valg av 100 prosent foreldrepenger', async () => {
        render(<MorDeltUttakDekningsgrad100EtterWLB />);
        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om tvillingsfødsel ved valg av 100 prosent foreldrepenger', async () => {
        render(<MorDeltUttakTvillingerDekningsgrad100FørWLB />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('TALENTFULL MYGGs del')).toBeInTheDocument();
        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')).toHaveLength(2);
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('39 uker')).toBeInTheDocument();
        expect(screen.getByText('Espen Utviklers del')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(
            screen.getByText('Dere har 17 uker med flerbarnsuker som dere kan dele', { exact: false }),
        ).toBeInTheDocument();
        expect(screen.getByText('20 av 39 uker med fellesperiode')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
