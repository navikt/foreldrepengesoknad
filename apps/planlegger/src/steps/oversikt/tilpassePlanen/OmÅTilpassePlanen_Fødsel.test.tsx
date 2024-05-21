import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OmÅTilpassePlanen_Fødsel.stories';

const {
    FødselMorOgFarBeggeHarRett,
    FødselMorOgMedmorBeggeHarRett,
    FødselMorOgFarKunMorHarRett,
    FødselMorOgFarKunFarHarRett,
    FødselFarOgFarKunFar1HarRett,
    FødselFarOgFarBeggeHarRett,
    FødselAleneforsørgerMor,
    FødselAleneforsørgerFar,
    FødselMorOgMedmorKunMedmorHarRett,
    FødselMorOgMedmorKunMorHarRett,
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
    it('skal vise info for mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);
        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Før termin')).toBeInTheDocument();
        expect(screen.getByText('De første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //MorOgMedmor
    it('skal vise info for mor og medmor fødsel hvor begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Før termin')).toBeInTheDocument();
        expect(screen.getByText('De første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();
    });
    it('skal vise info for mor og medmor fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);
        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Før termin')).toBeInTheDocument();
        expect(screen.getByText('De første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og medmor fødsel hvor kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);

        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //FarOgFar
    it.skip('skal vise info for far og far fødsel hvor begge har rett', async () => {
        render(<FødselFarOgFarBeggeHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('De første ukene etter termin')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('To uker rundt fødsel')).not.toBeInTheDocument();
    });
    it.skip('skal vise info for far og far fødsel hvor kun far1 har rett', async () => {
        render(<FødselFarOgFarKunFar1HarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('De første ukene etter termin')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('To uker rundt fødsel')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it.skip('skal vise info for far og far fødsel hvor kun far2 har rett', async () => {});
    //Aleneforsørger
    it('skal vise info for aleneforsørger mor fødsel', async () => {
        render(<FødselAleneforsørgerMor />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Før termin')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    // har denne riktig info?
    it('skal vise info for aleneforsørger far fødsel', async () => {
        render(<FødselAleneforsørgerFar />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('To uker rundt fødsel')).not.toBeInTheDocument();
    });
});
