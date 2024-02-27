import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

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

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.queryByText('Hvor mange uker skal du ha av fellesperioden?')).not.toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om at stønadsperioden er forlenget når en har prematur fødsel', async () => {
        render(<MorDeltUttakPrematurFødselDekningsgrad100 />);
        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('15 + 3 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('25 uker og 2 dager kan deles, fellesperiode')).toBeInTheDocument();
        expect(
            screen.getByText('er lagt til i fellesperioden fordi barnet ble født før svangerskapsuke 33.', {
                exact: false,
            }),
        ).toBeInTheDocument();
        expect(screen.getByText('15 uker til Espen')).toBeInTheDocument();
        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        const datoInput = screen.getByLabelText('Når ønsker du å starte perioden?');
        await userEvent.type(datoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal vise info om delt uttak ved valg av 100 prosent foreldrepenger', async () => {
        render(<MorDeltUttakDekningsgrad100EtterWLB />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Espens del')).toBeInTheDocument();
        expect(screen.getByText('15 + 3 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('16 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('15 uker til Espen')).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')).toHaveLength(2);

        expect(screen.getByText('8 av 16 uker med fellesperiode')).toBeInTheDocument();

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
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Espens del')).toBeInTheDocument();
        expect(screen.getByText('15 + 3 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('33 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('15 uker til Espen')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere kan velge om dere vil ha foreldrepenger samtidig i opp til 17 uker fordi dere har fått tvillinger',
                { exact: false },
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')).toHaveLength(2);
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        expect(screen.getByText('17 av 33 uker med fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Når ønsker du å starte perioden?')).toBeInTheDocument();
        expect(screen.getAllByText('Hvor mange uker skal du ha av fellesperioden?')[0]).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
