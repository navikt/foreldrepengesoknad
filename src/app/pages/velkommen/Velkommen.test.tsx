import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/Velkommen.stories';
import userEvent from '@testing-library/user-event';
import Api from 'app/api/api';
import { MemoryRouter } from 'react-router-dom';

const { Default, HarOpprettetFPSak, HarFPSakUnderBehandling, HarLøpendeFPSak, HarAvsluttetFPSak, HarFlereSaker } =
    composeStories(stories);
const sakerAvsluttet = [HarLøpendeFPSak, HarAvsluttetFPSak];
const sakerUnderBehandling = [HarOpprettetFPSak, HarFPSakUnderBehandling];

describe('<Velkommen>', () => {
    beforeEach(() => {
        jest.spyOn(Api, 'useGetEksisterendeSak').mockImplementationOnce(() => ({
            eksisterendeSakData: undefined,
            eksisterendeSakError: null,
        }));
    });

    it('skal vise velkommen-side uten sak informasjon', async () => {
        render(<Default />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
        expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
        expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
    });

    it('skal vise velkommen-side med siste opprettede sak hvis har flere saker', async () => {
        render(<HarFlereSaker />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Sist endret: 5', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Under behandling')).toBeInTheDocument();
    });

    it.each(sakerUnderBehandling)(`skal vise velkommen-side med opprettet/under behandling sak status`, async (Sak) => {
        render(<Sak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Sist endret: 6', { exact: false })).toBeInTheDocument();
        expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
        expect(screen.queryByText('Ønsker du å endre på din nåværende foreldrepengeperiode?')).not.toBeInTheDocument();
        expect(screen.queryByText('Ja, jeg vil søke om endring')).not.toBeInTheDocument();
        expect(screen.queryByText('Nei, jeg vil søke for ett nytt barn')).not.toBeInTheDocument();
        expect(
            screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
        ).not.toBeInTheDocument();
    });

    it.each(sakerAvsluttet)('skal vise velkommen-side med avsluttet/løpende behandling sak status', async (Sak) => {
        render(<Sak />, { wrapper: MemoryRouter });
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
        expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).not.toBeInTheDocument();
        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Sist endret: 6', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('Ferdig behandlet')).toBeInTheDocument();
        expect(screen.getByText('Ønsker du å endre på din nåværende foreldrepengeperiode?')).toBeInTheDocument();
        expect(screen.getByText('Ja, jeg vil søke om endring')).toBeInTheDocument();
        expect(screen.getByText('Nei, jeg vil søke for ett nytt barn')).toBeInTheDocument();
        expect(screen.getByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')).toBeInTheDocument();

        await waitFor(() => {
            userEvent.click(screen.getByText('Ja, jeg vil søke om endring'));
        });

        expect(
            screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText(
                'Når du søker om foreldrepenger for et nytt barn, mister du dager du har igjen fra den første foreldrepengeperioden din.'
            )
        ).not.toBeInTheDocument();

        await waitFor(() => {
            userEvent.click(screen.getByText('Nei, jeg vil søke for ett nytt barn'));
        });

        expect(
            screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
        ).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Når du søker om foreldrepenger for et nytt barn, mister du dager du har igjen fra den første foreldrepengeperioden din.'
            )
        ).toBeInTheDocument();
    });
});
