import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';

import * as stories from './SøkersituasjonSteg.stories';

import messages from '../../intl/nb_NO.json';

const { Mor, Far } = composeStories(stories);

describe('<SøkersituasjonSteg>', () => {
    it('skal ha født og søke som mor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Mor gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText(messages['søkersituasjon.text.situasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.fødsel']));

        expect(screen.getByText(messages['søkersituasjon.text.rolle'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.mor']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
                rolle: 'mor',
            },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OM_BARNET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ha født og søke som medmor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Mor gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText(messages['søkersituasjon.text.situasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.fødsel']));

        expect(screen.getByText(messages['søkersituasjon.text.rolle'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.medmor']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'fødsel',
                rolle: 'medmor',
            },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });
    });

    it('skal adoptere og søke som mor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Mor gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText(messages['søkersituasjon.text.situasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.adopsjon']));

        expect(screen.getByText(messages['søkersituasjon.text.rolle'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.mor']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'adopsjon',
                rolle: 'mor',
            },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });
    });

    it('skal adoptere som far', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(<Far gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText(messages['søkersituasjon.text.situasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['søkersituasjon.radioButton.adopsjon']));

        expect(screen.queryByText(messages['søkersituasjon.text.rolle'])).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                situasjon: 'adopsjon',
                rolle: 'far',
            },
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });
    });
});
