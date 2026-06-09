import { composeStories, composeStory } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './Saksoversikt.stories';

import messages from '../../intl/messages/nb_NO.json';

const {
    Engangsstønad,
    Foreldrepenger,
    Svangerskapspenger,
    ForeldrepengerTestAvSkyraGammelInnsending,
    ForeldrepengerTestAvSkyraNyligInnsending,
    ForeldrepengerEndringssøknad,
    EngangsstønadTestAvSkyraNyligInnsending,
    SvangerskapspengerTestAvSkyraNyligInnsending,
} = composeStories(stories);

const ForeldrepengerSkyraNN = composeStory(
    { ...stories.ForeldrepengerTestAvSkyraNyligInnsending, globals: { locale: 'nn' } },
    stories.default,
);
const ForeldrepengerSkyraEN = composeStory(
    { ...stories.ForeldrepengerTestAvSkyraNyligInnsending, globals: { locale: 'en' } },
    stories.default,
);

describe('<Saksoversikt>', () => {
    it(
        'skal vise hvor mye engangsstønad en har rett på',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Engangsstønad.parameters.msw);
            render(<Engangsstønad />);

            expect(await screen.findByText(messages['saksoversikt.dinPlan.søktOm'])).toBeInTheDocument();

            expect(screen.getByText('Engangsstønad på 92 648 kr')).toBeInTheDocument();
            expect(screen.getByText('Utbetales til kontonummer 23232323 hvis søknaden innvilges')).toBeInTheDocument();
            expect(screen.getByText(messages['saksoversikt.endre.kontonr'])).toBeInTheDocument();
        }),
    );

    it(
        'skal kun vise Endre plan lenke for foreldrepenger',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Foreldrepenger.parameters.msw);
            render(<Foreldrepenger />);
            expect(await screen.findByText(messages['saksoversikt.endrePlanenDin'])).toBeInTheDocument();
        }),
    );

    it(
        'skal IKKE vise Endre plan lenke for svangerskapspenger',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Svangerskapspenger.parameters.msw);
            render(<Svangerskapspenger />);

            // Sjekk at tittel er på plass sånn at vi vet siden har lastet ...
            expect(await screen.findByText(messages['header.dinSak'])).toBeInTheDocument();
            expect((await screen.findAllByText('Svangerskapspenger')).length).toBeGreaterThan(0);

            // ... når vi senere skal sjekke for at noe ikke eksisterer.
            expect(screen.queryByText(messages['saksoversikt.endrePlanenDin'])).not.toBeInTheDocument();
        }),
    );

    it(
        'skal IKKE vise Endre plan lenke for engangsstønad',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(Engangsstønad.parameters.msw);
            render(<Engangsstønad />);

            // Sjekk at tittel er på plass sånn at vi vet siden har lastet ...
            expect(await screen.findByText(messages['header.dinSak'])).toBeInTheDocument();
            expect((await screen.findAllByText('Engangsstønad')).length).toBeGreaterThan(0);

            // ... når vi senere skal sjekke for at noe ikke eksisterer.
            expect(screen.queryByText(messages['saksoversikt.endrePlanenDin'])).not.toBeInTheDocument();
        }),
    );

    describe('Skyra-undersøkelse', () => {
        it(
            'skal vise undersøkelsen for førstegangssøker innen 5 minutter på bokmål',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(ForeldrepengerTestAvSkyraNyligInnsending.parameters.msw);
                render(<ForeldrepengerTestAvSkyraNyligInnsending />);

                expect(await screen.findByText('Frivillig spørreundersøkelse')).toBeInTheDocument();
            }),
        );

        it(
            'skal IKKE vise undersøkelsen for førstegangssøknad eldre enn 5 minutter',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(ForeldrepengerTestAvSkyraGammelInnsending.parameters.msw);
                render(<ForeldrepengerTestAvSkyraGammelInnsending />);

                expect(await screen.findByText(messages['header.dinSak'])).toBeInTheDocument();
                expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            }),
        );

        it(
            'skal vise undersøkelsen for førstegangssøker innen 5 minutter på nynorsk',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(ForeldrepengerSkyraNN.parameters.msw);
                render(<ForeldrepengerSkyraNN />);

                expect(await screen.findByText('Frivillig spørjeundersøking')).toBeInTheDocument();
            }),
        );

        it(
            'skal IKKE vise undersøkelsen på engelsk',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(ForeldrepengerSkyraEN.parameters.msw);
                render(<ForeldrepengerSkyraEN />);

                expect(await screen.findByText('Your case')).toBeInTheDocument();
                expect(screen.queryByText('Optional survey')).not.toBeInTheDocument();
            }),
        );

        it(
            'skal IKKE vise undersøkelsen for endringssøknad selv om den er nylig',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(ForeldrepengerEndringssøknad.parameters.msw);
                render(<ForeldrepengerEndringssøknad />);

                expect(await screen.findByText(messages['header.dinSak'])).toBeInTheDocument();
                expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            }),
        );

        it(
            'skal IKKE vise undersøkelsen for engangsstønad selv om den er nylig',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(EngangsstønadTestAvSkyraNyligInnsending.parameters.msw);
                render(<EngangsstønadTestAvSkyraNyligInnsending />);

                expect(await screen.findByText(messages['header.dinSak'])).toBeInTheDocument();
                expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            }),
        );

        it(
            'skal IKKE vise undersøkelsen for svangerskapspenger selv om den er nylig!',
            mswWrapper(async ({ setHandlers }) => {
                setHandlers(SvangerskapspengerTestAvSkyraNyligInnsending.parameters.msw);
                render(<SvangerskapspengerTestAvSkyraNyligInnsending />);

                expect(await screen.findByText(messages['header.dinSak'])).toBeInTheDocument();
                expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
            }),
        );
    });
});
