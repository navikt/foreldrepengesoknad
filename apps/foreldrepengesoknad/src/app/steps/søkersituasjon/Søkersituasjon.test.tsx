import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from 'stories/steps/søkersituasjon/Søkersituasjon.stories';

const { Default } = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Gå videre';

describe('<Søkersituasjon>', () => {
    it('skal ha født og søke som mor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));

        expect(await screen.findByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ha født og søke som medmor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));

        expect(await screen.findByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Medmor'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal adoptere og søke som mor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));

        expect(await screen.findByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal adoptere og søke som medmor', async () => {
        render(<Default />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));

        expect(await screen.findByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Medmor'));

        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });
});
