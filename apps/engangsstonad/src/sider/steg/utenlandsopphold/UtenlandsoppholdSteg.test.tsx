import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './UtenlandsoppholdSteg.stories';

const { Default } = composeStories(stories);

describe('<UtenlandsoppholdSteg>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatorisk felt', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();

        expect(screen.getByText('Har du kun bodd i Norge de forrige 12 og neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Utenlandsopphold og støtte fra NAV')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText('Du må oppgi hvor du har bodd de forrige 12 og neste 12 månedene')).toHaveLength(2);
    });

    it('skal svare at en kun har bodd i Norge og så gå videre', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(2));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harKunBoddINorge: true,
            },
            key: 'UTENLANDSOPPHOLD',
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: 'UTENLANDSOPPHOLD_PERIODER',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/oppsummering')).toBeInTheDocument();
    });

    it('skal svare at en har bodd i utlandet og så gå videre', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei, jeg har bodd eller skal bo i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(1));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harKunBoddINorge: false,
            },
            key: 'UTENLANDSOPPHOLD',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/utenlandsopphold-perioder')).toBeInTheDocument();
    });
});
