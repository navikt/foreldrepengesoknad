import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import * as stories from './SøkersituasjonSteg.stories';
import SøknadRoutes from 'app/routes/routes';
import { FpDataType } from 'app/context/FpDataContext';

const { Mor, Far } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal ha født og søke som mor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Mor gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
                rolle: 'mor',
            },
            key: FpDataType.SØKERSITUASJON,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OM_BARNET,
            key: FpDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ha født og søke som medmor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Mor gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Fødsel'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Medmor'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
                rolle: 'medmor',
            },
            key: FpDataType.SØKERSITUASJON,
            type: 'update',
        });
    });

    it('skal adoptere og søke som mor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Mor gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));

        expect(screen.getByText('Hva søker du som?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'adopsjon',
                rolle: 'mor',
            },
            key: FpDataType.SØKERSITUASJON,
            type: 'update',
        });
    });

    it('skal adoptere som far', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Far gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('Velg det som gjelder for deg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Adopsjon'));

        expect(screen.queryByText('Hva søker du som?')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'adopsjon',
                rolle: 'far',
            },
            key: FpDataType.SØKERSITUASJON,
            type: 'update',
        });
    });
});
