import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { HvemPlanleggerType } from 'types/HvemPlanlegger';
import nbMessages from '../../../intl/messages/nb_NO.json';

import * as stories from './UforutsetteEndringer.stories';
import { UforutsetteEndringer } from './UforutsetteEndringer';

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
    });

    it('mor og far fødsel hvor begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i din periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og far fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og far fødsel hvor kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og medmor fødsel hvor begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk i din periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og medmor fødsel hvor kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('mor og medmor fødsel hvor kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis mor blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Hvis barnet er innlagt på sykehuset i de første seks ukene'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

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
        expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('alenemor fødsel', async () => {
        render(<FødselMorAleneomsorg />);

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();

        expect(screen.getByText('Hvis du blir syk når du har foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvis du blir syk i de første seks ukene med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er sykt eller innlagt på sykehuset')).not.toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er sykt etter de første seks ukene')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
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
        expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
    });

    it('viser prematur-innleggelse når barnet er født før uke 33', async () => {
        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <UforutsetteEndringer
                    hvemPlanlegger={{
                        type: HvemPlanleggerType.MOR_OG_FAR,
                        navnPåMor: 'Mor',
                        navnPåFar: 'Far',
                    }}
                    arbeidssituasjon={{ status: Arbeidsstatus.JOBBER, jobberAnnenPart: true }}
                    barnet={{
                        antallBarn: '1',
                        termindato: '2022-03-01',
                        fødselsdato: '2022-01-01',
                        erFødsel: true,
                        erBarnetFødt: true,
                    }}
                />
            </IntlProvider>,
        );

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.queryByText('Hvis barnet er innlagt på sykehus')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis et barn er innlagt på sykehus før termindato')).toBeInTheDocument();
        expect(screen.getByText('Hvis et barn er innlagt på sykehus etter termindato')).toBeInTheDocument();
        expect(screen.queryByText('Barnet blir født før 33. svangerskapsuke')).not.toBeInTheDocument();
    });

    it('viser prematur-info før barnet er født', async () => {
        render(
            <IntlProvider locale="nb" messages={nbMessages}>
                <UforutsetteEndringer
                    hvemPlanlegger={{
                        type: HvemPlanleggerType.MOR_OG_FAR,
                        navnPåMor: 'Mor',
                        navnPåFar: 'Far',
                    }}
                    arbeidssituasjon={{ status: Arbeidsstatus.JOBBER, jobberAnnenPart: true }}
                    barnet={{
                        antallBarn: '1',
                        termindato: '2024-07-01',
                        erFødsel: true,
                        erBarnetFødt: false,
                    }}
                />
            </IntlProvider>,
        );

        expect(await screen.findByText('Uforutsette endringer')).toBeInTheDocument();
        expect(screen.getByText('Barnet blir født før 33. svangerskapsuke')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Perioden med foreldrepenger blir utvidet fra fødselsdatoen og frem til dagen før termindatoen. Med denne forlengelsen får dere foreldrepenger like lenge som om barnet ble født på termindato. Pleiepenger før termindato vil trekkes fra dagene med utvidet rett på foreldrepenger, og kan ikke brukes senere.',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Hvis et barn er innlagt på sykehus før termindato')).not.toBeInTheDocument();
        expect(screen.getByText('Hvis barnet er innlagt på sykehus')).toBeInTheDocument();
    });
});
