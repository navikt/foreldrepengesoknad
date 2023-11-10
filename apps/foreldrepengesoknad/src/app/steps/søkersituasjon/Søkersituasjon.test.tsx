import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import * as stories from './Søkersituasjon.stories';

const { Default } = composeStories(stories);

describe('<Søkersituasjon>', () => {
    it('skal ha født og søke som mor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal ha født og søke som medmor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Medmor'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal adoptere og søke som mor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal adoptere og søke som medmor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Medmor'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
