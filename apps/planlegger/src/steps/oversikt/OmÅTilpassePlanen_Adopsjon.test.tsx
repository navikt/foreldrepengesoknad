import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OmÅTilpassePlanen_Adopsjon.stories';

const {
    AdopsjonFarOgFarBeggeHarRett,
    AdopsjonFarOgFarKunFar1HarRett,
    AdopsjonFarOgFarKunFar2HarRett,
    AdopsjonAleneforsørgerMor,
    AdopsjonAleneforsørgerFar,
    AdopsjonMorOgMedmorKunMedmorHarRett,
    AdopsjonMorOgFarBeggeHarRett,
    AdopsjonMorOgMedmorBeggeHarRett,
    AdopsjonMorOgMedmorKunMorHarRett,
    AdopsjonMorOgFarKunMorHarRett,
    AdopsjonMorOgFarKunFarHarRett,
} = composeStories(stories);

describe('<OmÅTilpassePlanen>', () => {
    //MorOgFar
    it('skal vise info for mor og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far adopsjon hvor kun mor har rett', async () => {
        render(<AdopsjonMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far adopsjon hvor kun far har rett', async () => {
        render(<AdopsjonMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //MorOgMedmor
    it('skal vise info for mor og medmor adopsjon hvor begge har rett', async () => {
        render(<AdopsjonMorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og medmor adopsjon hvor kun mor har rett', async () => {
        render(<AdopsjonMorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og medmor adopsjon hvor kun medmor har rett', async () => {
        render(<AdopsjonMorOgMedmorKunMedmorHarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //FarOgFar
    it('skal vise info for far og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonFarOgFarBeggeHarRett />);
        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
    });
    it('skal vise info for far og far adopsjon hvor kun far1 har rett', async () => {
        render(<AdopsjonFarOgFarKunFar1HarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for far og far adopsjon hvor kun far2 har rett', async () => {
        render(<AdopsjonFarOgFarKunFar2HarRett />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });

    //Aleneforsørger
    it('skal vise info for mor aleneforsørger adopsjon', async () => {
        render(<AdopsjonAleneforsørgerMor />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for far aleneforsørger adopsjon', async () => {
        render(<AdopsjonAleneforsørgerFar />);

        expect(await screen.findByText('Om å tilpasse planen')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Før termin')).not.toBeInTheDocument();
        expect(screen.queryByText('De første seks ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
});
