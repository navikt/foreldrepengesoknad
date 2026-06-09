import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './Umyndig.stories';

import messages from '../intl/messages/nb_NO.json';

const { UmyndigForeldrepenger, UmyndigEngangsstonad, UmyndigSvangerskapspenger } = composeStories(stories);

describe('<Umyndig>', () => {
    it('skal vise side for FP', async () => {
        render(<UmyndigForeldrepenger />);
        expect(await screen.findByText(messages['Umyndig.Pageheading.Foreldrepenger'])).toBeInTheDocument();
        expect(screen.getByText(messages['Umyndig.Tittel'])).toBeInTheDocument();
        expect(
            screen.getByText(
                'Fordi du er under 18 år, må en av foreldrene dine eller en foresatt skrive under på søknaden' +
                    ' din sammen med deg. Derfor må du fylle ut søknaden på papir og sende den i posten til Nav.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(messages['Umyndig.Knapp.Papirsøknad'])).toBeInTheDocument();
    });

    it('skal vise side for ES', async () => {
        render(<UmyndigEngangsstonad />);
        expect(await screen.findByText(messages['Umyndig.Pageheading.Engangsstonad'])).toBeInTheDocument();
    });

    it('skal vise side SVP', async () => {
        render(<UmyndigSvangerskapspenger />);
        expect(await screen.findByText(messages['Umyndig.Pageheading.Svangerskapspenger'])).toBeInTheDocument();
    });
});
