import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './Forside.stories';

const { Default, MedEksisterendeSøknad } = composeStories(stories);

describe('<Forside>', () => {
    it('skal ikke kunne gå videre uten å ha godkjent vilkår', async () => {
        const setHarGodkjentVilkår = vi.fn();
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <Default
                setHarGodkjentVilkår={setHarGodkjentVilkår}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(screen.getByText('Du må bekrefte at du har lest og forstått dine plikter.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));

        expect(screen.queryByText('Du må bekrefte at du har lest og forstått dine plikter.')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(setHarGodkjentVilkår).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoute.BARNET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal vise info om åpenbehandling', async () => {
        const setHarGodkjentVilkår = vi.fn();
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        applyRequestHandlers(MedEksisterendeSøknad.parameters.msw);

        render(
            <MedEksisterendeSøknad
                setHarGodkjentVilkår={setHarGodkjentVilkår}
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        screen.logTestingPlaygroundURL();
        await waitFor(() => {
            expect(screen.getByText('Du har en søknad til behandling')).toBeInTheDocument();
        });
    });
});
