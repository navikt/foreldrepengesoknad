import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './UforutsetteEndringer.stories';

const { AdopsjonMorOgFarBeggeHarRett, FødselMorOgFarKunFarHarRett } = composeStories(stories);

describe('<UforutsetteEndringer>', () => {
    //MorOgFar
    it('skal vise info for mor og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis man blir syk i sin periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis man får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis man blir syk når man har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis man får et nytt barn før det har gått tre år')).toBeInTheDocument();

        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
    });
});
