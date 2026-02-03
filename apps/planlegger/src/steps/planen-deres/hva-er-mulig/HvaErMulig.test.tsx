import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './HvaErMulig.stories';

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

describe('<HvaErMulig>', () => {
    //Fødsel
    //MorOgFar
    it('skal vise info for mor og far fødsel hvor begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Dette kan ikke endres')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når far tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Dette kan ikke endres')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Dette kan ikke endres')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //MorOgMedmor
    it('skal vise info for mor og medmor fødsel hvor begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Dette kan ikke endres')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når medmor tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();
    });
    it('skal vise info for mor og medmor fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Dette kan ikke endres')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når medmor tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og medmor fødsel hvor kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.queryByText('Dette kan ikke endres')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //FarOgFar
    it('skal vise info for far og far fødsel hvor begge har rett', async () => {
        render(<FødselFarOgFarBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når far tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Permisjon samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Dette kan ikke endres')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
    });
    it('skal vise info for far og far fødsel hvor kun far1 har rett', async () => {
        render(<FødselFarOgFarKunFar1HarRett />);

        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();
        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Dette kan ikke endres')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    //Aleneforsørger
    it('skal vise info for aleneforsørger mor fødsel', async () => {
        render(<FødselAleneforsørgerMor />);

        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Dette kan ikke endres')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når medmor tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
    // har denne riktig info?
    it('skal vise info for aleneforsørger far fødsel', async () => {
        render(<FødselAleneforsørgerFar />);
        expect(await screen.findByText('Hva er mulig når man tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye man kan endre på i planen.')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('Permisjon samtidig')).not.toBeInTheDocument();
    });
});
