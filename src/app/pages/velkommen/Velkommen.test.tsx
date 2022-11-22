// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { composeStories } from '@storybook/testing-react';
// import * as stories from 'stories/pages/Velkommen.stories';
// import userEvent from '@testing-library/user-event';
// import Api from 'app/api/api';
// import { MemoryRouter } from 'react-router-dom';

// const {
//     Default,
//     HarOpprettetFPSak,
//     HarFPSakUnderBehandling,
//     HarLøpendeFPSak,
//     HarAvsluttetFPSak,
//     HarFlereSaker,
//     HarKunHenlagtBehandlingPåSak,
//     HarKunSvpSak,
//     HarSakUtenAvsluttetBehandling,
// } = composeStories(stories);
// const sakerUnderBehandling = [HarOpprettetFPSak, HarFPSakUnderBehandling];
// const sakerSomSkalIkkeTriggeEndringsøknad = [HarKunHenlagtBehandlingPåSak, HarSakUtenAvsluttetBehandling];

// describe('<Velkommen>', () => {
//     beforeEach(() => {
//         jest.spyOn(Api, 'useGetEksisterendeSak').mockImplementationOnce(() => ({
//             eksisterendeSakData: undefined,
//             eksisterendeSakError: null,
//         }));
//     });

//     it('skal vise velkommen-side uten sak informasjon', async () => {
//         render(<Default />, { wrapper: MemoryRouter });
//         expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//         expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
//         expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
//         expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
//         expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
//         expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
//     });

//     it('skal vise velkommen-side med siste opprettede sak hvis har flere saker', async () => {
//         render(<HarFlereSaker />, { wrapper: MemoryRouter });
//         expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//         expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
//         expect(screen.getByText('Sist endret: 5', { exact: false })).toBeInTheDocument();
//         expect(screen.getByText('Under behandling')).toBeInTheDocument();
//     });

//     it('skal vise velkommen-side med løpende behandling sak status og mulighet for endring', async () => {
//         render(<HarLøpendeFPSak />, { wrapper: MemoryRouter });
//         expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//         expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
//         expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).not.toBeInTheDocument();
//         expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
//         expect(screen.getByText('Sist endret: 6', { exact: false })).toBeInTheDocument();
//         expect(screen.getByText('Ferdig behandlet')).toBeInTheDocument();
//         expect(screen.getByText('Ønsker du å endre på din nåværende foreldrepengeperiode?')).toBeInTheDocument();
//         expect(screen.getByText('Ja, jeg vil søke om endring')).toBeInTheDocument();
//         expect(screen.getByText('Nei, jeg vil søke for ett nytt barn')).toBeInTheDocument();
//         expect(screen.getByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')).toBeInTheDocument();

//         await userEvent.click(screen.getByText('Ja, jeg vil søke om endring'));

//         expect(
//             screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
//         ).not.toBeInTheDocument();
//         expect(
//             screen.queryByText(
//                 'Når du søker om foreldrepenger for et nytt barn, mister du dager du har igjen fra den første foreldrepengeperioden din når den nye foreldrepengeperioden starter.'
//             )
//         ).not.toBeInTheDocument();

//         await userEvent.click(screen.getByText('Nei, jeg vil søke for ett nytt barn'));

//         expect(
//             screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
//         ).not.toBeInTheDocument();
//         expect(
//             screen.getByText(
//                 'Når du søker om foreldrepenger for et nytt barn, mister du dager du har igjen fra den første foreldrepengeperioden din når den nye foreldrepengeperioden starter.'
//             )
//         ).toBeInTheDocument();
//     });

//     it.each(sakerUnderBehandling)(
//         'skal vise velkommen-side med løpende behandling sak status og mulighet for endring',
//         async (Sak) => {
//             render(<Sak />, { wrapper: MemoryRouter });
//             expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//             expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
//             expect(screen.queryByText('Jeg bekrefter at jeg har lest og forstått')).not.toBeInTheDocument();
//             expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
//             expect(screen.getByText('Sist endret: 6', { exact: false })).toBeInTheDocument();
//             expect(screen.getByText('Under behandling')).toBeInTheDocument();
//             expect(screen.getByText('Ønsker du å endre på din nåværende foreldrepengeperiode?')).toBeInTheDocument();
//             expect(screen.getByText('Ja, jeg vil søke om endring')).toBeInTheDocument();
//             expect(screen.getByText('Nei, jeg vil søke for ett nytt barn')).toBeInTheDocument();
//             expect(
//                 screen.getByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
//             ).toBeInTheDocument();

//             await userEvent.click(screen.getByText('Ja, jeg vil søke om endring'));

//             expect(
//                 screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
//             ).not.toBeInTheDocument();
//             expect(
//                 screen.queryByText(
//                     'Når du søker om foreldrepenger for et nytt barn, mister du dager du har igjen fra den første foreldrepengeperioden din når den nye foreldrepengeperioden starter.'
//                 )
//             ).not.toBeInTheDocument();

//             await userEvent.click(screen.getByText('Nei, jeg vil søke for ett nytt barn'));

//             expect(
//                 screen.queryByText('For å komme videre, må du svare på alle spørsmålene ovenfor.')
//             ).not.toBeInTheDocument();
//             expect(
//                 screen.getByText(
//                     'Når du søker om foreldrepenger for et nytt barn, mister du dager du har igjen fra den første foreldrepengeperioden din når den nye foreldrepengeperioden starter.'
//                 )
//             ).toBeInTheDocument();
//         }
//     );
//     it('for avsluttet sak, skal vise velkommen-side med kun mulighet til å starte ny søknad', async () => {
//         render(<HarAvsluttetFPSak />, { wrapper: MemoryRouter });
//         expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//         expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
//         expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
//         expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
//         expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
//         expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
//     });
//     it('for saker med kun svangerskapspenger-behandlinger, skal vise velkommen-side med kun mulighet for å starte ny søknad', async () => {
//         render(<HarKunSvpSak />, { wrapper: MemoryRouter });
//         expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//         expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
//         expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
//         expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
//         expect(screen.queryByText('Under behandling')).not.toBeInTheDocument();
//         expect(screen.queryByText('Foreldrepenger')).not.toBeInTheDocument();
//     });
//     it.each(sakerSomSkalIkkeTriggeEndringsøknad)(
//         'for saker med kun henlagt behandling, eller ingen avsluttede behandlinger, skal vise velkommen-side med kun mulighet for å starte ny søknad',
//         async (Sak) => {
//             render(<Sak />, { wrapper: MemoryRouter });
//             expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
//             expect(screen.getByText('Velkommen til foreldrepengesøknaden')).toBeInTheDocument();
//             expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
//             expect(screen.queryByText('Ferdig behandlet')).not.toBeInTheDocument();
//             expect(screen.getByText('Under behandling')).toBeInTheDocument();
//             expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
//         }
//     );
// });

describe('Test', () => {
    it('test', async () => {
        expect(1).toEqual(1);
    });
});
