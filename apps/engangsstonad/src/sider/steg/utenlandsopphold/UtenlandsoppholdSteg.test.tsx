import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './UtenlandsoppholdSteg.stories';

const { Default } = composeStories(stories);

describe('<UtenlandsoppholdSteg>', () => {
    it('skal vise feilmeldinger når en prøver å gå videre uten å oppgi obligatoriske felter', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();

        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Utenlandsopphold og støtte fra NAV')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();

        expect(screen.getAllByText('Du må oppgi hvor du har bodd de siste 12 månedene')).toHaveLength(2);
        expect(screen.getAllByText('Du må oppgi hvor du skal bo de neste 12 månedene')).toHaveLength(2);
    });

    it('skal oppgi at en har bodd i Norge og skal bo i Norge', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(3));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: false,
                skalBoUtenforNorgeNeste12Mnd: false,
            },
            key: 'UTENLANDSOPPHOLD',
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: 'UTENLANDSOPPHOLD_TIDLIGERE',
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: 'UTENLANDSOPPHOLD_SENERE',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/oppsummering')).toBeInTheDocument();
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i Norge', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(2));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: true,
                skalBoUtenforNorgeNeste12Mnd: false,
            },
            key: 'UTENLANDSOPPHOLD',
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: 'UTENLANDSOPPHOLD_SENERE',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/tidligere-utenlandsopphold')).toBeInTheDocument();
    });

    it('skal oppgi at en har bodd i Norge og skal bo i utlandet', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(2));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: false,
                skalBoUtenforNorgeNeste12Mnd: true,
            },
            key: 'UTENLANDSOPPHOLD',
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: 'UTENLANDSOPPHOLD_TIDLIGERE',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/senere-utenlandsopphold')).toBeInTheDocument();
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i utlandet', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        await waitFor(() => expect(nesteStegFn).toHaveBeenCalledTimes(1));
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: true,
                skalBoUtenforNorgeNeste12Mnd: true,
            },
            key: 'UTENLANDSOPPHOLD',
            type: 'update',
        });

        expect(await screen.findByText('Neste side: /soknad/tidligere-utenlandsopphold')).toBeInTheDocument();
    });
});
