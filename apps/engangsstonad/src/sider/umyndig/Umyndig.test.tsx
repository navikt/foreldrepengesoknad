import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Umyndig.stories';

const { Default } = composeStories(stories);

describe('<Umyndig>', () => {
    it('skal vise side korrekt', async () => {
        render(<Default />);
        expect(await screen.findByText('Hei, henrikke!')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Fordi du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Her kan du laste ned papirsøknaden')).toBeInTheDocument();
        expect(screen.getByText('Søknad om engangsstønad')).toBeInTheDocument();
    });
});
