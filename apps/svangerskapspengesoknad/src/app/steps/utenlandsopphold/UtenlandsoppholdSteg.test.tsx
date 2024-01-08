import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './UtenlandsoppholdSteg.stories';
import { render, screen } from '@testing-library/react';
import { ContextDataType } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';

const { Default } = composeStories(stories);

describe('<Utlandsopphold>', () => {
    it('skal gå til inntektsinformasjon når en både har bodd og skal bo i Norge', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Bo i utlandet')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg har bodd i Norge'));

        await userEvent.click(screen.getByText('Jeg skal bo i Norge'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: true,
                iNorgeSiste12Mnd: true,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.ARBEID,
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

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: true,
                iNorgeSiste12Mnd: false,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.HAR_BODD_I_UTLANDET,
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

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                iNorgeNeste12Mnd: false,
                iNorgeSiste12Mnd: true,
            },
            key: ContextDataType.UTENLANDSOPPHOLD,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.SKAL_BO_I_UTLANDET,
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
            data: SøknadRoutes.HAR_BODD_I_UTLANDET,
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
            data: SøknadRoutes.BARNET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
