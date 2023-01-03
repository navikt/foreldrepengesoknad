import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/Velkommen.stories';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const {
    Default,
    HarOpprettetFPSakFødsel,
    HarFPSakUnderBehandlingTermin,
    HarEndringssøknadUnderBehandlingAdopsjon,
    HarAvsluttetFPSak,
    HarFlereSaker,
    HarSakFødselUtenBarnSendtFraSak,
    HarSakTerminUtenBarnSendtFraSak,
    HarSakAdopsjonUtenBarnSendtFraSak,
    HarSakFødselTvillinger,
    HarSakFødselTrillinger,
    HarSakFødselTvillingerUtenBarnSendtFraSak,
    HarSakTerminTrillingerUtenBarnSendtFraSak,
} = composeStories(stories);

const BEGYNN_MED_SØKNAD = 'Begynn med søknad';
const ENDRE_SØKNAD = 'Endre søknad';
const SØKNADEN_MIN_GJELDER_ET_ANNET_BARN = 'Søknaden min gjelder et annet barn';

describe('<Velkommen>', () => {
    it('skal vise velkommen-side uten sak informasjon', async () => {
        render(<Default />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        expect(screen.getByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
        expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
        expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
    });

    it('skal vise velkommen-side med sak på fødsel som kan endres', async () => {
        render(<HarOpprettetFPSakFødsel />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(
            await screen.findByText('Velg barnet eller barna du ønsker å sende inn søknad for.', { exact: false })
        ).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig Vår')).toBeInTheDocument();
        expect(await screen.findByText('Født:', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        expect(screen.queryByText(ENDRE_SØKNAD)).not.toBeInTheDocument();
        expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Evig Lykkelig Vår'));
        expect(await screen.findByText(ENDRE_SØKNAD)).toBeInTheDocument();
        expect(await screen.findByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Evig Lykkelig Vår'));
    });

    it('skal måtte bekrefte at de har lest og forstått', async () => {
        render(<HarOpprettetFPSakFødsel />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Evig Lykkelig Vår')).toBeInTheDocument();
        expect(screen.queryByText('Du må bekrefte at du har lest og forstått dine plikter.')).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Evig Lykkelig Vår'));
        await userEvent.click(screen.getByText(ENDRE_SØKNAD));
        expect(await screen.findByText('Du må bekrefte at du har lest og forstått dine plikter.')).toBeInTheDocument();
    });
    it('skal måtte velge et barn for å fortsette', async () => {
        render(<HarOpprettetFPSakFødsel />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Evig Lykkelig Vår')).toBeInTheDocument();
        expect(
            screen.queryByText('For å komme videre, må du velge et av alternativene ovenfor.')
        ).not.toBeInTheDocument();
        await userEvent.click(screen.getByText(BEGYNN_MED_SØKNAD));
        expect(
            await screen.findByText('For å komme videre, må du velge et av alternativene ovenfor.')
        ).toBeInTheDocument();
    });

    it('skal kunne søke på nytt barn', async () => {
        render(<HarOpprettetFPSakFødsel />, { wrapper: MemoryRouter });
        expect(await screen.findByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        await userEvent.click(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN));
        expect(screen.queryByText(ENDRE_SØKNAD)).not.toBeInTheDocument();
        expect(await screen.findByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
    });

    it('skal vise velkommen-side med løpende behandling sak status og mulighet for endring', async () => {
        render(<HarFPSakUnderBehandlingTermin />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).not.toBeInTheDocument();
        expect(await screen.findByText('Barn med termindato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Under behandling')).toBeInTheDocument();
        expect(await screen.findByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        expect(await screen.findByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
    });
    it('skal vise velkommen-side med løpende behandling sak status og mulighet for endring', async () => {
        render(<HarEndringssøknadUnderBehandlingAdopsjon />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig Vår')).toBeInTheDocument();
        expect(await screen.findByText('Omsorgsovertagelse', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Under behandling')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        await userEvent.click(screen.getByText('Evig Lykkelig Vår'));
        expect(await screen.findByText(ENDRE_SØKNAD)).toBeInTheDocument();
    });
    it('skal ikke vise avsluttet sak', async () => {
        render(<HarAvsluttetFPSak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        expect(screen.getByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
        expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
        expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
    });
    it('skal vise flere saker', async () => {
        render(<HarFlereSaker />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig Vår')).toBeInTheDocument();
        expect(await screen.findByText('Født:', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(await screen.findByText('Barn med termindato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 555555')).toBeInTheDocument();
        expect(await screen.findByText('Under behandling')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak på fødsel uten å ha mottat barn fra fpsak"', async () => {
        render(<HarSakFødselUtenBarnSendtFraSak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak på adopsjon uten å ha mottat barn fra fpsak"', async () => {
        render(<HarSakAdopsjonUtenBarnSendtFraSak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn adoptert', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak på termin uten å ha mottat barn fra fpsak"', async () => {
        render(<HarSakTerminUtenBarnSendtFraSak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn med termindato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak med tvillinger med navn', async () => {
        render(<HarSakFødselTvillinger />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig og Grønn Vår')).toBeInTheDocument();
        expect(await screen.findByText('Født: ', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak med trillinger med navn', async () => {
        render(<HarSakFødselTrillinger />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig, Grønn og Sommerlig Vår')).toBeInTheDocument();
        expect(await screen.findByText('Født: ', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak med tvillinger uten å ha mottat barn fra fpsak', async () => {
        render(<HarSakFødselTvillingerUtenBarnSendtFraSak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak med trillinger uten å ha mottat barn fra fpsak', async () => {
        render(<HarSakTerminTrillingerUtenBarnSendtFraSak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Flerlinger med termindato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
});

//TODO: Døde barn når det er avklart.
