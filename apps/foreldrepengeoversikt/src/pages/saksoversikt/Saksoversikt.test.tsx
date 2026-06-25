import { composeStories, composeStory } from '@storybook/react-vite';
import { screen } from '@testing-library/react';

import * as stories from './Saksoversikt.stories';

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
    it('skal vise hvor mye engangsstønad en har rett på', async () => {
        await Engangsstønad.run();

        expect(await screen.findByText('Dette har du søkt om')).toBeInTheDocument();

        expect(screen.getByText('Engangsstønad på 92 648 kr')).toBeInTheDocument();
        expect(screen.getByText('Utbetales til kontonummer 23232323 hvis søknaden innvilges')).toBeInTheDocument();
        expect(screen.getByText('Endre kontonummer')).toBeInTheDocument();
    });

    it('skal kun vise Endre plan lenke for foreldrepenger', async () => {
        await Foreldrepenger.run();
        expect(await screen.findByText('Endre planen din')).toBeInTheDocument();
    });

    it('skal IKKE vise Endre plan lenke for svangerskapspenger', async () => {
        await Svangerskapspenger.run();

        // Sjekk at tittel er på plass sånn at vi vet siden har lastet ...
        expect(await screen.findByText('Din sak')).toBeInTheDocument();
        expect((await screen.findAllByText('Svangerskapspenger')).length).toBeGreaterThan(0);

        // ... når vi senere skal sjekke for at noe ikke eksisterer.
        expect(screen.queryByText('Endre planen din')).not.toBeInTheDocument();
    });

    it('skal IKKE vise Endre plan lenke for engangsstønad', async () => {
        await Engangsstønad.run();

        // Sjekk at tittel er på plass sånn at vi vet siden har lastet ...
        expect(await screen.findByText('Din sak')).toBeInTheDocument();
        expect((await screen.findAllByText('Engangsstønad')).length).toBeGreaterThan(0);

        // ... når vi senere skal sjekke for at noe ikke eksisterer.
        expect(screen.queryByText('Endre planen din')).not.toBeInTheDocument();
    });

    describe('Skyra-undersøkelse', () => {
        it('skal vise undersøkelsen for førstegangssøker innen 5 minutter på bokmål', async () => {
            await ForeldrepengerTestAvSkyraNyligInnsending.run();

            expect(await screen.findByText('Frivillig spørreundersøkelse')).toBeInTheDocument();
        });

        it('skal IKKE vise undersøkelsen for førstegangssøknad eldre enn 5 minutter', async () => {
            await ForeldrepengerTestAvSkyraGammelInnsending.run();

            expect(await screen.findByText('Din sak')).toBeInTheDocument();
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
        });

        it('skal vise undersøkelsen for førstegangssøker innen 5 minutter på nynorsk', async () => {
            await ForeldrepengerSkyraNN.run();

            expect(await screen.findByText('Frivillig spørjeundersøking')).toBeInTheDocument();
        });

        it('skal IKKE vise undersøkelsen på engelsk', async () => {
            await ForeldrepengerSkyraEN.run();

            expect(await screen.findByText('Your case')).toBeInTheDocument();
            expect(screen.queryByText('Optional survey')).not.toBeInTheDocument();
        });

        it('skal IKKE vise undersøkelsen for endringssøknad selv om den er nylig', async () => {
            await ForeldrepengerEndringssøknad.run();

            expect(await screen.findByText('Din sak')).toBeInTheDocument();
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
        });

        it('skal IKKE vise undersøkelsen for engangsstønad selv om den er nylig', async () => {
            await EngangsstønadTestAvSkyraNyligInnsending.run();

            expect(await screen.findByText('Din sak')).toBeInTheDocument();
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
        });

        it('skal IKKE vise undersøkelsen for svangerskapspenger selv om den er nylig!', async () => {
            await SvangerskapspengerTestAvSkyraNyligInnsending.run();

            expect(await screen.findByText('Din sak')).toBeInTheDocument();
            expect(screen.queryByText('Frivillig spørreundersøkelse')).not.toBeInTheDocument();
        });
    });
});
