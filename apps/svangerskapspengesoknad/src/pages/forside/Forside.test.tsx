import { composeStories } from '@storybook/react-vite';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';

import * as stories from './Forside.stories';

const { Default, MedEksisterendeSøknad } = composeStories(stories);

describe('<Forside>', () => {
    it('skal ikke kunne gå videre uten å ha godkjent vilkår', async () => {
        const setHarGodkjentVilkår = vi.fn();
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        await Default.run({
            args: { ...Default.args, setHarGodkjentVilkår, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

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

    it('skal vise avrundet minimumOpptjening uten desimaler', async () => {
        await Default.run();

        const punkt = await screen.findByText(/Du må ha tjent minst/);
        expect(punkt).toBeInTheDocument();
        expect(punkt.textContent).not.toMatch(/,\d\d/);
    });

    it('skal vise info om åpenbehandling', async () => {
        const setHarGodkjentVilkår = vi.fn();
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        await MedEksisterendeSøknad.run({
            args: { ...MedEksisterendeSøknad.args, setHarGodkjentVilkår, gåTilNesteSide, mellomlagreSøknadOgNaviger },
        });

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(await screen.findByText(/Du har en søknad til behandling/)).toBeInTheDocument();
    });
});
