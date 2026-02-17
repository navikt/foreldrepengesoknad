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
    FødselMorOgMedmorKunMedmorHarRett,
    FødselMorOgMedmorKunMorHarRett,
    AdopsjonMorOgFarBeggeHarRett,
    FødselMorOgFarBeggeHarRettTvilling,
} = composeStories(stories);

describe('<HvaErMulig>', () => {
    //Fødsel
    //MorOgFar
    it('skal vise info for mor og far fødsel hvor begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ikke endre:')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når far tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger samtidig')).toBeInTheDocument();
        expect(screen.getByText('2 uker rundt fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Til sammen 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 150 %:')).toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ikke endre:')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();

        expect(screen.queryByText('Dette kan du ikke endre:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();

        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.queryByText(/mor som føder er i aktivitet/)).not.toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText(/Mor må være i/)).toBeInTheDocument();

        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far fødsel hvor begge har rett - tvilling og trilling', async () => {
        render(<FødselMorOgFarBeggeHarRettTvilling />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ikke endre:')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når far tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger samtidig')).toBeInTheDocument();
        expect(screen.getByText('2 uker rundt fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Flerbarnsdager opptil 200 %:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Til sammen 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 150 %:')).toBeInTheDocument();
    });
    //MorOgMedmor
    it('skal vise info for mor og medmor fødsel hvor begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ikke endre:')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når medmor tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger samtidig')).toBeInTheDocument();
        expect(screen.getByText('2 uker rundt fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Til sammen 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 150 %:')).toBeInTheDocument();
    });
    it('skal vise info for mor og medmor fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ikke endre:')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når medmor tar fellesperiode')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og medmor fødsel hvor kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();

        expect(screen.queryByText('Dette kan du ikke endre:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();

        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();

        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText(/mor som føder er i aktivitet/)).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText(/Mor som føder/)).toBeInTheDocument();

        expect(screen.queryByText('Jobbe samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når medmor tar fellesperiode')).not.toBeInTheDocument();
    });
    //FarOgFar
    it('skal vise info for far og far fødsel hvor begge har rett', async () => {
        render(<FødselFarOgFarBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();
        expect(screen.getByText(/Fedre får ofte permisjon dekket/)).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger samtidig')).toBeInTheDocument();
        expect(screen.getByText(/Dere kan ha foreldrepenger/)).toBeInTheDocument();

        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();

        expect(screen.queryByText('Dette kan du ikke endre:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når medmor tar fellesperiode')).not.toBeInTheDocument();
    });
    it('skal vise info for far og far fødsel hvor kun far1 har rett', async () => {
        render(<FødselFarOgFarKunFar1HarRett />);

        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('To uker rundt fødsel')).toBeInTheDocument();
        expect(screen.getByText(/Fedre får ofte permisjon/)).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Foreldrepenger samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('Dette kan du ikke endre:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når medmor tar fellesperiode')).not.toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();
    });
    //Aleneforsørger mor
    it('skal vise info for aleneforsørger mor fødsel', async () => {
        render(<FødselAleneforsørgerMor />);

        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.getByText('Dette kan du ikke endre:')).toBeInTheDocument();
        expect(screen.getByText('Tre uker før termin:')).toBeInTheDocument();
        expect(screen.getByText('Seks uker etter fødsel:')).toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();

        expect(screen.queryByText('Foreldrepenger samtidig')).not.toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Til sammen 100 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Opptil 150 %:')).not.toBeInTheDocument();
        expect(screen.queryByText('Når far tar fellesperiode')).not.toBeInTheDocument();
    });
    // Aleneomsorg far

    //Adopsjon
    //Mor og far
    it('skal vise info for mor og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonMorOgFarBeggeHarRett />);
        expect(await screen.findByText('Hva er mulig når du tilpasser?')).toBeInTheDocument();

        expect(screen.getByText('Det er mye du kan endre på i planen')).toBeInTheDocument();
        expect(screen.queryByText('Dette kan du ikke endre:')).not.toBeInTheDocument();
        expect(screen.queryByText('Tre uker før termin:')).not.toBeInTheDocument();
        expect(screen.queryByText('Seks uker etter fødsel:')).not.toBeInTheDocument();
        expect(screen.getByText('Legge til ferie')).toBeInTheDocument();
        expect(screen.getByText('Når far tar fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Jobbe samtidig')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger samtidig')).toBeInTheDocument();
        expect(screen.queryByText('2 uker rundt fødsel:')).not.toBeInTheDocument();
        expect(screen.getByText('Opptil 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Til sammen 100 %:')).toBeInTheDocument();
        expect(screen.getByText('Opptil 150 %:')).toBeInTheDocument();
    });
});
