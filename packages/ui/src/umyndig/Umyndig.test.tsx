import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Umyndig.stories';

const { UmyndigForeldrepenger } = composeStories(stories);

describe('<Umyndig>', () => {
    it('skal vise side korrekt', async () => {
        render(<UmyndigForeldrepenger />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Fordi du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden sammen med deg. Du må derfor fylle ut søknaden på papir og sende den i posten.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Her kan du laste ned papirsøknaden')).toBeInTheDocument();
    });
});
