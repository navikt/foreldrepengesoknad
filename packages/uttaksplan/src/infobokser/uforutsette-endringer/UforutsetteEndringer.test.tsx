import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './UforutsetteEndringer.stories';

const {
    AdopsjonMorOgFarBeggeHarRett,
    AdopsjonMorOgFarKunMorHarRett,
    FødselMorOgFarKunFarHarRett,
    FødselMorOgFarPrematur,
    FødselMorOgFarKunFarHarRettPrematur,
    FødselFarAleneomsorg,
    FødselFarOgFarBeggeHarRett,
    FødselFarOgFarKunFarHarRett,
    FødselFarOgFarKunMedfarHarRett,
    FødselMorAleneomsorg,
    FødselMorOgFarBeggeHarRett,
    FødselMorOgFarKunMorHarRett,
    FødselMorOgMedmorBeggeHarRett,
    FødselMorOgMedmorKunMedmorHarRett,
    FødselMorOgMedmorKunMedmorHarRettPrematur,
    FødselMorOgMedmorKunMorHarRett,
} = composeStories(stories);

describe('<UforutsetteEndringer>', () => {
    //MorOgFar
    it('skal vise info for mor og far adopsjon hvor begge har rett', async () => {
        render(<AdopsjonMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i din periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/Den andre forelderen kan ta over/)).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();

        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
    });

    it('skal vise info for mor og far adopsjon hvor kun mor har rett', async () => {
        render(<AdopsjonMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText(/Hvis du er for syk/)).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();

        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
    });

    it('mor og far fødsel hvor begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i din periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();

        const prematurInfo = screen.getByText('Barnet blir født før 33. svangerskapsuke');
        const innleggelseInfo = screen.getByText('Hvis barnet er innlagt på sykehus');
        const morSykInfo = screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger');
        const sykInfo = screen.getByText('Hvis du blir syk i din periode med foreldrepenger');
        const nyttBarnInfo = screen.getByText('Hvis dere får et nytt barn før det har gått tre år');
        expect(prematurInfo.compareDocumentPosition(innleggelseInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(innleggelseInfo.compareDocumentPosition(morSykInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(morSykInfo.compareDocumentPosition(sykInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(sykInfo.compareDocumentPosition(nyttBarnInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('mor og far fødsel hvor barnet er født prematurt', async () => {
        render(<FødselMorOgFarPrematur />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis et barn er innlagt på sykehus før termindato')).toBeInTheDocument();
        expect(screen.getByText('Hvis et barn er innlagt på sykehus etter termindato')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er innlagt på sykehus')).not.toBeInTheDocument();
        expect(screen.getByText(/Har dere pleiepenger i stedet for foreldrepenger/)).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();

        const prematurInfo = screen.getByText('Barnet blir født før 33. svangerskapsuke');
        const innleggelseFørTermin = screen.getByText('Hvis et barn er innlagt på sykehus før termindato');
        const innleggelseEtterTermin = screen.getByText('Hvis et barn er innlagt på sykehus etter termindato');
        const morSykInfo = screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger');
        const sykInfo = screen.getByText('Hvis du blir syk i din periode med foreldrepenger');
        const nyttBarnInfo = screen.getByText('Hvis dere får et nytt barn før det har gått tre år');
        expect(prematurInfo.compareDocumentPosition(innleggelseFørTermin)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(innleggelseFørTermin.compareDocumentPosition(innleggelseEtterTermin)).toBe(
            Node.DOCUMENT_POSITION_FOLLOWING,
        );
        expect(innleggelseEtterTermin.compareDocumentPosition(morSykInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(morSykInfo.compareDocumentPosition(sykInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(sykInfo.compareDocumentPosition(nyttBarnInfo)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it('mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er innlagt på sykehus')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og far fødsel hvor kun far har rett og barnet er født prematurt', async () => {
        render(<FødselMorOgFarKunFarHarRettPrematur />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er innlagt på sykehus')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er innlagt på sykehus før termindato')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er innlagt på sykehus etter termindato')).not.toBeInTheDocument();
    });

    // Mor og medmor
    it('mor og medmor fødsel hvor begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i din periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og medmor fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og medmor fødsel hvor kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er innlagt på sykehus')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og medmor fødsel hvor kun medmor har rett og barnet er født prematurt', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRettPrematur />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er innlagt på sykehus')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er innlagt på sykehus før termindato')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er innlagt på sykehus etter termindato')).not.toBeInTheDocument();
    });

    // Far og far
    it('far og far fødsel hvor begge har rett', async () => {
        render(<FødselFarOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i din periode med foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('far og far fødsel hvor kun far har rett', async () => {
        render(<FødselFarOgFarKunFarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis du blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('far og far fødsel hvor kun medfar har rett', async () => {
        render(<FødselFarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis mor blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
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

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('alenefar fødsel', async () => {
        render(<FødselFarAleneomsorg />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(
            screen.queryByText('Hvis du blir syk i de første seks ukene med foreldrepenger'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });
});
