import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Umyndig.stories';

const { UmyndigForeldrepenger, UmyndigEngangsstonad, UmyndigSvangerskapspenger } = composeStories(stories);

describe('<Umyndig>', () => {
    it('skal vise side for FP', async () => {
        render(<UmyndigForeldrepenger />);
        expect(await screen.findByText('Søknad om foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Fordi du er under 18 år, må du sende papirsøknad')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Fordi du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden din sammen med deg. Derfor må du fylle ut søknaden på papir og sende den i posten til NAV.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Gå til papirsøknaden')).toBeInTheDocument();
    });

    it('skal vise side for ES', async () => {
        render(<UmyndigEngangsstonad />);
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
    });

    it('skal vise side SVP', async () => {
        render(<UmyndigSvangerskapspenger />);
        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
    });
});
