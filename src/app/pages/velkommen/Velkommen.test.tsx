import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/Velkommen.stories';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';

const {
    Default,
    HarOpprettetFPSakFødselMedBarnetIPDL,
    HarFPSakUnderBehandlingTermin,
    HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL,
    HarAvsluttetFPSak,
    HarFlereSaker,
    HarSakFødselUtenBarnIPDL,
    HarSakAdopsjonUtenBarnIPDL,
    HarSakFødselTvillinger,
    HarSakFødselTrillinger,
    HarIngenSakerOgEttBarn,
    HarIngenSakerOgTvillinger,
    HarIngenSakerOgEtDødfødtBarn,
    HarIngenSakerOgEttDødtBarn,
    HarIngenSakerOgToDødeTvillinger,
    HarIngenSakerMedEnLevendeOgEnDødfødtTvilling,
    HarIngenSakerMedEnLevendeOgEnDødTvilling,
    HarSakerMedEnLevendeOgEnDødfødtTvilling,
    // HarSakMedEttDødtfødtBarn,
    // HarSakMedDødeTvillinger,
    // HarSakMedEtDødfødtBarn,
    // HarSakMedEnLevendeOgEnDødfødtTvilling,
    // HarSakMedEnLevendeOgEnDødTvilling,
} = composeStories(stories);

const BEGYNN_MED_SØKNAD = 'Begynn med søknad';
const ENDRE_SØKNAD = 'Endre søknad';
const SØKNADEN_MIN_GJELDER_ET_ANNET_BARN = 'Søknaden min gjelder et annet barn';

describe('<Velkommen>', () => {
    it('skal vise velkommen-side uten sak informasjon', async () => {
        render(<Default />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        expect(screen.getByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
        expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
        expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
    });

    //Har saker, og alle barna lever.
    it('skal vise velkommen-side med sak på fødsel som kan endres', async () => {
        render(<HarOpprettetFPSakFødselMedBarnetIPDL />);
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
        render(<HarOpprettetFPSakFødselMedBarnetIPDL />);
        expect(await screen.findByText('Evig Lykkelig Vår')).toBeInTheDocument();
        expect(screen.queryByText('Du må bekrefte at du har lest og forstått dine plikter.')).not.toBeInTheDocument();
        await userEvent.click(screen.getByText('Evig Lykkelig Vår'));
        await userEvent.click(screen.getByText(ENDRE_SØKNAD));
        expect(await screen.findByText('Du må bekrefte at du har lest og forstått dine plikter.')).toBeInTheDocument();
    });
    it('skal måtte velge et barn for å fortsette', async () => {
        render(<HarOpprettetFPSakFødselMedBarnetIPDL />);
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
        render(<HarOpprettetFPSakFødselMedBarnetIPDL />);
        expect(await screen.findByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        await userEvent.click(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN));
        expect(screen.queryByText(ENDRE_SØKNAD)).not.toBeInTheDocument();
        expect(await screen.findByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
    });

    it('skal vise velkommen-side med løpende behandling sak status og mulighet for endring', async () => {
        render(<HarFPSakUnderBehandlingTermin />);
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
        render(<HarEndringssøknadUnderBehandlingAdopsjonBarnIPDL />);
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
    it('skal ikke vise avsluttet sak eller barn fra avsluttet sak', async () => {
        render(<HarAvsluttetFPSak />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.queryByText('Evig Lykkelig Vår')).not.toBeInTheDocument();
        expect(screen.queryByText('Omsorgsovertagelse', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText('Saksnummer: 123456')).not.toBeInTheDocument();
        expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        expect(screen.getByText(BEGYNN_MED_SØKNAD)).toBeInTheDocument();
        expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
        expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
    });
    it('skal vise flere saker', async () => {
        render(<HarFlereSaker />);
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
    it('skal greie å vise sak på fødsel uten å ha mottat barn fra pdl"', async () => {
        render(<HarSakFødselUtenBarnIPDL />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak på adopsjon uten å ha mottat barn fra pdl"', async () => {
        render(<HarSakAdopsjonUtenBarnIPDL />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn adoptert', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });

    it('skal greie å vise sak med tvillinger med navn og skal ikke vise barna dobbelt når de også kommer inn fra PDL', async () => {
        render(<HarSakFødselTvillinger />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig og Grønn Vår')).toBeInTheDocument();
        expect(screen.getAllByText('Evig Lykkelig og Grønn Vår').length).toEqual(1);
        expect(await screen.findByText('Født: ', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Under behandling')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal greie å vise sak med trillinger med navn', async () => {
        render(<HarSakFødselTrillinger />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Evig Lykkelig, Grønn og Sommerlig Vår')).toBeInTheDocument();
        expect(await screen.findByText('Født: ', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });

    //Ingen saker, og noen av barna er døde.
    it('skal vise ett barn fra PDL når ingen saker', async () => {
        render(<HarIngenSakerOgEttBarn />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Oriental Bokhylle')).toBeInTheDocument();
        expect(await screen.findByText('Født:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal vise tvillinger fra PDL når ingen saker', async () => {
        render(<HarIngenSakerOgTvillinger />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Oriental og Vakker Bokhylle')).toBeInTheDocument();
        expect(await screen.findByText('Født:', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
    });
    it('skal vise ett barn fra PDL uten navn når barnet er dødfødt for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2022-10-25'));
        render(<HarIngenSakerOgEtDødfødtBarn />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        MockDate.reset();
    });
    it('skal ikke vise ett barn fra PDL når barnet er dødfødt for mer enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-08'));
        render(<HarIngenSakerOgEtDødfødtBarn />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.queryByText('Barn med fødselsdato', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).not.toBeInTheDocument();
        MockDate.reset();
    });
    it('skal vise ett barn fra PDL uten navn når barnet døde for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-06'));
        render(<HarIngenSakerOgEttDødtBarn />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Barn med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        MockDate.reset();
    });

    it('skal vise tvillinger fra PDL uten navn når begge barna døde for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-06'));
        render(<HarIngenSakerOgToDødeTvillinger />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Tvillinger med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        MockDate.reset();
    });
    it('skal ikke vise tvillinger fra PDL når begge barna døde for mer enn 3 mnd siden', async () => {
        MockDate.set(new Date('2023-03-08'));
        render(<HarIngenSakerOgToDødeTvillinger />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.queryByText('Tvillinger med fødselsdato', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).not.toBeInTheDocument();
        MockDate.reset();
    });

    it('skal vise tvillinger fra PDL uten navn når et av barna døde under fødsel for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2022-10-25'));
        console.log('Date:', new Date());
        render(<HarIngenSakerMedEnLevendeOgEnDødfødtTvilling />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Tvillinger med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        MockDate.reset();
    });
    it('skal ikke vise noen av tvillinger fra PDL hvis den ene døde under fødsel for mer enn 3 mnd siden og det finnes ingen sak på barna', async () => {
        MockDate.set(new Date('2023-03-25'));
        render(<HarIngenSakerMedEnLevendeOgEnDødfødtTvilling />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.queryByText('Oriental Bokhylle')).not.toBeInTheDocument();
        expect(screen.queryByText('Tvillinger med fødselsdato', { exact: false })).not.toBeInTheDocument();
        expect(screen.queryByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).not.toBeInTheDocument();
        MockDate.reset();
    });
    it('skal vise tvillinger fra PDL uten navn når et av barna døde for mindre enn 3 mnd siden', async () => {
        MockDate.set(new Date('2022-02-25'));
        render(<HarIngenSakerMedEnLevendeOgEnDødTvilling />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(await screen.findByText('Tvillinger med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        MockDate.reset();
    });

    //Har saker der noen av barna er døde.
    it('skal vise velkommen-side med sak på fødsel tvilinger der den ene er død. Navn skal ikke vises', async () => {
        render(<HarSakerMedEnLevendeOgEnDødfødtTvilling />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(
            await screen.findByText('Velg barnet eller barna du ønsker å sende inn søknad for.', { exact: false })
        ).toBeInTheDocument();
        expect(await screen.findByText('Tvillinger med fødselsdato', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('Saksnummer: 123456')).toBeInTheDocument();
        expect(await screen.findByText('Under behandling')).toBeInTheDocument();
        expect(screen.getByText(SØKNADEN_MIN_GJELDER_ET_ANNET_BARN)).toBeInTheDocument();
        expect(screen.queryByText(ENDRE_SØKNAD)).not.toBeInTheDocument();
    });
});

//TODO: Hvis leser inn sak og finner to like barn fra PDL (samme fnr), vis kun et barn.
//TODO: Saker med døde og dødfødte barn, ett, to , tre, mindre enn 3 mnd, mer enn 3 mnd med sak.
//TODO: Sak med barn på termin
//TODO: Sak med barn adopsjon fra PDL.
