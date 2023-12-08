import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import * as stories from './PeriodeMedForeldrepengerSteg.stories';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType } from 'app/context/FpDataContext';

const { MedDeltUttak } = composeStories(stories);

describe('<PeriodeMedForeldrepengerSteg>', () => {
    it('skal ha født og søke som mor', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <MedDeltUttak gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />,
        );

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
            key: ContextDataType.SØKERSITUASJON,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.OM_BARNET,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
