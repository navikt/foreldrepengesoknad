import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './DinPlan.stories';

const { Default, FarSøker } = composeStories(stories);

describe('<Default>', () => {
    it('Skal vise liste med fire perioder', async () => {
        await applyRequestHandlers(Default.parameters.msw);
        render(<Default />);

        expect(await screen.findByText('Liste')).toBeInTheDocument();
        expect(screen.getByText('Endre planen')).toBeInTheDocument();
        expect(screen.getByText('Kalender')).toBeInTheDocument();

        const allButtons = screen.getAllByRole('button');

        expect(within(allButtons[1]).getByText('10. juni - 30. juni')).toBeInTheDocument();
        expect(within(allButtons[1]).getByText('3 uker')).toBeInTheDocument();
        expect(within(allButtons[1]).getAllByText('Du i permisjon')).toHaveLength(2);

        expect(within(allButtons[2]).getByText('01. juli')).toBeInTheDocument();
        expect(within(allButtons[2]).getAllByText('Fødsel')).toHaveLength(2);

        expect(within(allButtons[3]).getByText('01. juli - 13. okt.')).toBeInTheDocument();
        expect(within(allButtons[3]).getByText('15 uker')).toBeInTheDocument();
        expect(within(allButtons[3]).getAllByText('Du i permisjon')).toHaveLength(2);

        expect(within(allButtons[4]).getByText('14. okt. - 21. des.')).toBeInTheDocument();
        expect(within(allButtons[4]).getByText('9 uker og 4 dager')).toBeInTheDocument();
        expect(within(allButtons[4]).getAllByText('Du og Espen i permisjon')).toHaveLength(2);
    });

    it('Skal bytte til kalender', async () => {
        await applyRequestHandlers(Default.parameters.msw);
        render(<Default />);

        expect(await screen.findByText('Liste')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kalender'));

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Du og Helga har permisjon samtidig')).toBeInTheDocument();
        expect(screen.getByText('Helg (er ikke dager med foreldrepenger)')).toBeInTheDocument();
    });

    it('Skal sjekke at fars kalender er korrekt', async () => {
        await applyRequestHandlers(FarSøker.parameters.msw);
        render(<FarSøker />);

        expect(await screen.findByText('Liste')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Kalender'));

        expect(screen.getByText('Espens periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Du og Espen har permisjon samtidig')).toBeInTheDocument();
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Du kombinerer jobb og foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Helg (er ikke dager med foreldrepenger)')).toBeInTheDocument();

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:10;dayColor:LIGHTBLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:LIGHTBLUE', { exact: false })).toHaveLength(15);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:2;dayColor:LIGHTBLUEGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(
            within(oktober).getByTestId('day:14;dayColor:LIGHTBLUEGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:15;dayColor:LIGHTBLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:31;dayColor:LIGHTBLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getAllByTestId('dayColor:LIGHTBLUEGREEN', { exact: false })).toHaveLength(9);
        expect(within(oktober).getAllByTestId('dayColor:LIGHTBLUE;', { exact: false })).toHaveLength(13);

        const november = screen.getByTestId('year:2024;month:10');
        expect(within(november).getAllByTestId('dayColor:LIGHTBLUE', { exact: false })).toHaveLength(21);

        const desember = screen.getByTestId('year:2024;month:11');
        expect(within(desember).getAllByTestId('dayColor:LIGHTBLUE', { exact: false })).toHaveLength(22);

        const januar2025 = screen.getByTestId('year:2025;month:0');
        expect(within(januar2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(23);

        const februar2025 = screen.getByTestId('year:2025;month:1');
        expect(within(februar2025).getByTestId('day:3;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(februar2025).getByTestId('day:4;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(februar2025).getByTestId('day:5;dayColor:GREENSTRIPED;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(februar2025).getByTestId('day:28;dayColor:GREENSTRIPED;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(februar2025).getAllByTestId('dayColor:GREENSTRIPED', { exact: false })).toHaveLength(18);

        const mars2025 = screen.getByTestId('year:2025;month:2');
        expect(within(mars2025).getByTestId('day:3;dayColor:GREENSTRIPED;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars2025).getByTestId('day:11;dayColor:GREENSTRIPED;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mars2025).getByTestId('day:19;dayColor:LIGHTBLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(
            within(mars2025).getByTestId('day:31;dayColor:LIGHTBLUE;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(mars2025).getAllByTestId('dayColor:GREENSTRIPED', { exact: false })).toHaveLength(7);
        expect(within(mars2025).getAllByTestId('dayColor:LIGHTBLUE', { exact: false })).toHaveLength(9);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(within(april2025).getByTestId('day:1;dayColor:LIGHTBLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(april2025).getByTestId('day:22;dayColor:LIGHTBLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTBLUE', { exact: false })).toHaveLength(16);
    });
});
