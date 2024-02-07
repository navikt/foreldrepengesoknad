import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import * as stories from './UtenlandsoppholdSteg.stories';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType } from 'app/context/FpDataContext';

const { Default } = composeStories(stories);

describe('<UtenlandsoppholdSteg>', () => {
    it('skal gå til inntektsinformasjon når en både har bodd og skal bo i Norge', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));

        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(4);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: true,
                iNorgeSiste12Mnd: true,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: undefined,
            key: ContextDataType.UTENLANDSOPPHOLD_SENERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
            data: SøknadRoutes.INNTEKTSINFORMASJON,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til tidligere utenlandsopphold når en har bodd i utlandet', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(3);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: true,
                iNorgeSiste12Mnd: false,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.UTENLANDSOPPHOLD_SENERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til senere utenlandsopphold når en skal bo i utlandet', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));

        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(3);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: false,
                iNorgeSiste12Mnd: true,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: undefined,
            key: ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
            data: SøknadRoutes.SENERE_UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal gå til tidligere utenlandsopphold når en har bodd i utlandet og skal bo i utlandet', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Jeg skal bo helt eller delvis i utlandet'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: false,
                iNorgeSiste12Mnd: false,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal lagre route når en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.UTTAKSPLAN,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
