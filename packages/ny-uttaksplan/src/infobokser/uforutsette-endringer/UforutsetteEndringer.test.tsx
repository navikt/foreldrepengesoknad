import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './UforutsetteEndringer.stories';

const {
    AdopsjonMorOgFarBeggeHarRett,
    AdopsjonMorOgFarKunMorHarRett,
    FødselMorOgFarKunFarHarRett,
    FødselFarAleneomsorg,
    FødselFarOgFarBeggeHarRett,
    FødselFarOgFarKunFarHarRett,
    FødselFarOgFarKunMedfarHarRett,
    FødselMorAleneomsorg,
    FødselMorOgFarBeggeHarRett,
    FødselMorOgFarKunMorHarRett,
    FødselMorOgMedmorBeggeHarRett,
    FødselMorOgMedmorKunMedmorHarRett,
    FødselMorOgMedmorKunMorHarRett,
} = composeStories(stories);

describe('<UforutsetteEndringer>', () => {
    //MorOgFar
    it('skal vise info for mor og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/Den andre forelderen kan ta over/)).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();

        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
    });
    it('skal vise info for mor og far adopsjon hvor kun mor har rett', async () => {
        render(<AdopsjonMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/Hvis du er for syk/)).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();

        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
    });
    it('mor og far fødsel hvor begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt etter de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehuset i de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt etter de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehuset i de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    // Mor og medmor
    it('mor og medmor fødsel hvor begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt etter de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehuset i de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('mor og medmor fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt etter de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehuset i de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('mor og medmor fødsel hvor kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    // Far og far
    it('far og far fødsel hvor begge har rett', async () => {
        render(<FødselFarOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('far og far fødsel hvor kun far har rett', async () => {
        render(<FødselFarOgFarKunFarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis du blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('far og far fødsel hvor kun medfar har rett', async () => {
        render(<FødselFarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    // Aleneomsorg
    it('alenemor fødsel', async () => {
        render(<FødselMorAleneomsorg />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt etter de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehuset i de første seks ukene')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
    it('alenefar fødsel', async () => {
        render(<FødselFarAleneomsorg />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i perioden din med foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis du blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er sykt eller innlagt på sykehuset')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
});
