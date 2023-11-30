import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './UtenlandsoppholdSteg.stories';
import { EsDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';

const { Default } = composeStories(stories);

describe('<UtenlandsoppholdSteg>', () => {
    it('skal oppgi at en har bodd i Norge og skal bo i Norge', async () => {
        const nesteStegFn = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} mellomlagreOgNaviger={mellomlagreOgNaviger} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Steg 3 av 4')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(nesteStegFn).toHaveBeenCalledTimes(4);
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: false,
                skalBoUtenforNorgeNeste12Mnd: false,
            },
            key: EsDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: EsDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: EsDataType.UTENLANDSOPPHOLD_SENERE,
            type: 'update',
        });

        expect(nesteStegFn).toHaveBeenNthCalledWith(4, {
            data: Path.OPPSUMMERING,
            key: EsDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i Norge', async () => {
        const nesteStegFn = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} mellomlagreOgNaviger={mellomlagreOgNaviger} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(nesteStegFn).toHaveBeenCalledTimes(3);
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: true,
                skalBoUtenforNorgeNeste12Mnd: false,
            },
            key: EsDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: EsDataType.UTENLANDSOPPHOLD_SENERE,
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(3, {
            data: Path.TIDLIGERE_UTENLANDSOPPHOLD,
            key: EsDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal oppgi at en har bodd i Norge og skal bo i utlandet', async () => {
        const nesteStegFn = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} mellomlagreOgNaviger={mellomlagreOgNaviger} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(nesteStegFn).toHaveBeenCalledTimes(3);
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: false,
                skalBoUtenforNorgeNeste12Mnd: true,
            },
            key: EsDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: EsDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            type: 'update',
        });

        expect(nesteStegFn).toHaveBeenNthCalledWith(3, {
            data: Path.SENERE_UTENLANDSOPPHOLD,
            key: EsDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal oppgi at en har bodd i utlandet og skal bo i utlandet', async () => {
        const nesteStegFn = vi.fn();
        const mellomlagreOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={nesteStegFn} mellomlagreOgNaviger={mellomlagreOgNaviger} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));
        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(nesteStegFn).toHaveBeenCalledTimes(2);
        expect(nesteStegFn).toHaveBeenNthCalledWith(1, {
            data: {
                harBoddUtenforNorgeSiste12Mnd: true,
                skalBoUtenforNorgeNeste12Mnd: true,
            },
            key: EsDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });

        expect(nesteStegFn).toHaveBeenNthCalledWith(2, {
            data: Path.TIDLIGERE_UTENLANDSOPPHOLD,
            key: EsDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });
});
