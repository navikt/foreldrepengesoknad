import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OmÅTilpassePlanen.stories';

const {
    FødselMorOgFarBeggeHarRett,
    FødselMorOgFarKunMorHarRett,
    FødselMorOgFarKunFarHarRett,
    FødselFarOgFarKunFar1HarRett,
    FødselFarOgFarBeggeHarRett,
    FødselAleneforsørgerMor,
    FødselAleneforsørgerFar,
    AdopsjonFarOgFarBeggeHarRett,
    AdopsjonFarOgFarKunFar1HarRett,
    AdopsjonFarOgFarKunFar2HarRett,
} = composeStories(stories);

describe('<OmÅTilpassePlanen>', () => {
    //Fødsel
    //MorOgFar
    it('skal vise info for mor og far fødsel hvor begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Før termin')).toBeInTheDocument();
        expect(screen.getByText('De første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();
    });
    it.skip('skal vise info for mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);
    });
    it('skal vise info for mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //MorOgMedmor
    it.skip('skal vise info for mor og medmor fødsel hvor begge har rett', async () => {});
    it.skip('skal vise info for mor og medmor fødsel hvor kun mor har rett', async () => {});
    it.skip('skal vise info for mor og medmor fødsel hvor kun medmor har rett', async () => {});
    //FarOgFar
    it.skip('skal vise info for far og far fødsel hvor begge har rett', async () => {
        render(<FødselFarOgFarBeggeHarRett />);
    });
    it.skip('skal vise info for far og far fødsel hvor kun far1 har rett', async () => {
        render(<FødselFarOgFarKunFar1HarRett />);
    });
    it.skip('skal vise info for far og far fødsel hvor kun far2 har rett', async () => {});
    //Aleneforsørger
    it.skip('skal vise info for aleneforsørger mor fødsel', async () => {
        render(<FødselAleneforsørgerMor />);
    });
    // har denne riktig info?
    it('skal vise info for aleneforsørger far fødsel', async () => {
        render(<FødselAleneforsørgerFar />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('To uker rundt fødsel')).not.toBeInTheDocument();
    });

    //Adopsjon
    //MorOgFar
    it.skip('skal vise info for mor og far adopsjon hvor begge har rett', async () => {});
    it.skip('skal vise info for mor og far adopsjon hvor kun mor har rett', async () => {});
    it.skip('skal vise info for mor og far adopsjon hvor kun far har rett', async () => {});
    //MorOgMedmor
    it.skip('skal vise info for mor og medmor adopsjon hvor begge har rett', async () => {});
    it.skip('skal vise info for mor og medmor adopsjon hvor kun mor har rett', async () => {});
    it.skip('skal vise info for mor og medmor adopsjon hvor kun medmor har rett', async () => {});
    //FarOgFar
    it.skip('skal vise info for far og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonFarOgFarBeggeHarRett />);
        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
    });
    it.skip('skal vise info for far og far adopsjon hvor kun far1 har rett', async () => {
        render(<AdopsjonFarOgFarKunFar1HarRett />);
        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
    });
    it.skip('skal vise info for far og far adopsjon hvor kun far2 har rett', async () => {
        render(<AdopsjonFarOgFarKunFar2HarRett />);
        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
    });

    //Aleneforsørger
    it.skip('skal vise info for mor aleneforsørger adopsjon', async () => {});
    it.skip('skal vise info for far aleneforsørger adopsjon', async () => {});
});
