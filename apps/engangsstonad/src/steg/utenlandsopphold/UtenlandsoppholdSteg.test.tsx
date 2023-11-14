import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './UtenlandsoppholdSteg.stories';

const { Default } = composeStories(stories);

describe('<UtenlandsoppholdSteg>', () => {
    it('skal oppgi at en har bodd i Norge og skal bo i Norge', async () => {
        const nesteStegFn = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(nesteStegFn).toHaveBeenCalledTimes(3);
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

        expect(nesteStegFn).toHaveBeenCalledTimes(2);
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

        expect(nesteStegFn).toHaveBeenCalledTimes(2);
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

        expect(nesteStegFn).toHaveBeenCalledTimes(1);
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
