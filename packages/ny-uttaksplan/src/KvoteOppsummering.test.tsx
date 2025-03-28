import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import * as stories from './KvoteOppsummering.stories';

const {
    EnRettFarAlleDagerBrukt,
    BeggeRettMorAlleDagerBrukt,
    BeggeRettMorLedigeDager,
    BeggeRettMorogMedmorLedigeDager,
    AleneomsorgMorLedigeDager,
    EnRettFarLedigeDager,
    AleneomsorgFarForMangeDager,
    BeggeRettMorForMangeDagerBrukt,
} = composeStories(stories);

describe('<KvoteOppsummering >', () => {
    it('<BeggeRettMorLedigeDager >', async () => {
        render(<BeggeRettMorLedigeDager />);

        expect(screen.getByText('Det er 12 uker og 3 dager igjen som kan legges til i planen')).toBeInTheDocument();
        expect(
            screen.getByText(
                '5 uker og 2 dager av fellesperioden, 5 uker og 1 dag til mor og 2 uker til far ligger ikke i planen.',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en endringssøknad.',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Annen forelder må sende søknad selv for å bruke sine uker med foreldrepenger.', {
                exact: false,
            }),
        ).toBeInTheDocument();
    });

    it('<BeggeRettMorogMedmorLedigeDager >', async () => {
        render(<BeggeRettMorogMedmorLedigeDager />);
        expect(
            await screen.findByText(
                '16 uker av fellesperioden, 18 uker til mor og 15 uker til medmor ligger ikke i planen.',
                { exact: false },
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                'Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en endringssøknad.',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText('Annen forelder må sende søknad selv for å bruke sine uker med foreldrepenger.', {
                exact: false,
            }),
        ).toBeInTheDocument();
    });

    it('<AleneomsorgMorLedigeDager >', async () => {
        render(<AleneomsorgMorLedigeDager />);

        expect(
            screen.queryByText('Annen forelder må sende søknad selv for å bruke sine uker med foreldrepenger.'),
        ).not.toBeInTheDocument();
        expect(
            screen.getByText(
                'Hvis du ønsker å bruke mer foreldrepenger enn det som ligger i planen nå, kan du sende en endringssøknad.',
            ),
        ).toBeInTheDocument();
    });

    it('<BeggeRettMorAlleDagerBrukt >', async () => {
        render(<BeggeRettMorAlleDagerBrukt />);

        expect(screen.getByText('All tid er i planen')).toBeInTheDocument();
        expect(
            screen.getByText('16 uker av fellesperioden, 18 uker til mor og 15 uker til far er lagt til i planen.'),
        ).toBeInTheDocument();
    });
    it('<EnRettFarAlleDagerBrukt >', async () => {
        render(<EnRettFarAlleDagerBrukt />);

        expect(screen.getByText('All tid er i planen')).toBeInTheDocument();
        expect(screen.getByText('Du har lagt til 40 uker i planen.')).toBeInTheDocument();
    });
    it('<EnRettFarLedigeDager >', async () => {
        render(<EnRettFarLedigeDager />);

        expect(screen.getByText('2 uker ligger ikke i planen.')).toBeInTheDocument();
    });
    it('<AleneomsorgFarForMangeDager >', async () => {
        render(<AleneomsorgFarForMangeDager />);

        expect(screen.getByText('Det er lagt til 4 uker og 4 dager for mye')).toBeInTheDocument();
        expect(screen.getByText('Du har lagt til 4 uker og 4 dager for mye i planen.')).toBeInTheDocument();
    });

    it('<BeggeRettMorForMangeDagerBrukt >', async () => {
        render(<BeggeRettMorForMangeDagerBrukt />);

        expect(screen.getByText('Det er lagt til 2 uker og 3 dager for mye')).toBeInTheDocument();
    });
});
