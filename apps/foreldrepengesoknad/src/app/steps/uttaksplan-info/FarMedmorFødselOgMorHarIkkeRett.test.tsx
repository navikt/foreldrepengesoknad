import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import dayjs from 'dayjs';
import * as stories from './FarMedmorFodselOgMorHarIkkeRett.stories';

const { UttaksplanDerMorIkkeHarRettPåForeldrepenger, UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør } =
    composeStories(stories);

describe('<UttaksplanInfo_MorFarAdopsjon>', () => {
    it('skal fylle ut dekningsgrad med 80 prosent', async () => {
        render(<UttaksplanDerMorIkkeHarRettPåForeldrepenger />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('50 uker med 80 prosent foreldrepenger'));

        expect(screen.getAllByText('Periode med foreldrepenger')[0]).toBeInTheDocument();
        expect(screen.getByText('50 uker')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal fylle ut dekningsgrad med 100 prosent', async () => {
        render(<UttaksplanDerMorIkkeHarRettPåForeldrepenger />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('40 uker med 100 prosent foreldrepenger'));

        expect(screen.getAllByText('Periode med foreldrepenger')[0]).toBeInTheDocument();
        expect(screen.getByText('40 uker')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
    it('Hvis mor ufør, skal kunne sette ønsket dato for start', async () => {
        render(<UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('40 uker med 100 prosent foreldrepenger'));
        const startDagInput = screen.getByLabelText('Når ønsker du å starte perioden?');
        await userEvent.type(startDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
