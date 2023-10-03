import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './AppContainer.stories';

const { VisApp } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<VisApp />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));
        await userEvent.click(screen.getByText('Start søknaden'));

        expect(await screen.findByText('Din situasjon')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 5')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Fødsel'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Steg 2 av 5')).toBeInTheDocument();

        //TODO Skriv ferdig når logikk er ferdig (Gå gjennom resten av stega)
    });
});
