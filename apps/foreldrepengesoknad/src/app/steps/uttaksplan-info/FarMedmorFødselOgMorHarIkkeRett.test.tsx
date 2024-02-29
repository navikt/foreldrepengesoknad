import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './FarMedmorFodselOgMorHarIkkeRett.stories';

const {
    BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB,
    BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB,
    BareFarHarRettOgMorErUførEtterWLB,
} = composeStories(stories);

describe('<UttaksplanInfo_MorFarAdopsjon>', () => {
    it('skal fylle ut dekningsgrad med 80 prosent', async () => {
        render(<BareFarHarRettMorIkkeUførDekningsgrad80EtterWLB />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('50 uker til deg')).toBeInTheDocument();
        const startDagInput = screen.getByLabelText('Når ønsker du å starte perioden?');
        await userEvent.type(startDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal fylle ut dekningsgrad med 100 prosent', async () => {
        render(<BareFarHarRettMorIkkeUførDekningsgrad100EtterWLB />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Fordeling av foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('40 uker til deg')).toBeInTheDocument();
        const startDagInput = screen.getByLabelText('Når ønsker du å starte perioden?');
        await userEvent.type(startDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
    it('Hvis mor ufør, skal kunne sette ønsket dato for start', async () => {
        render(<BareFarHarRettOgMorErUførEtterWLB />);

        expect(await screen.findByText('Fordeling av foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('40 uker til deg')).toBeInTheDocument();

        const startDagInput = screen.getByLabelText('Når ønsker du å starte perioden?');
        await userEvent.type(startDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
