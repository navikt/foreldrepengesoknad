import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './Forside.stories';

import messages from '../../intl/nb_NO.json';

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

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['Forside.begynnMedSøknad']));

        expect(screen.getByText(messages['Forside.valideringsfeil.harForståttRettigheterOgPlikter'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['Forside.samtykke']));

        expect(screen.queryByText(messages['Forside.valideringsfeil.harForståttRettigheterOgPlikter'])).not.toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['Forside.begynnMedSøknad']));

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

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(await screen.findByText(/Du har en søknad til behandling/)).toBeInTheDocument();
    });
});
