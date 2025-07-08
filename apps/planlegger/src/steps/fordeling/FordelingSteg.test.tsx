import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';

import * as stories from './FordelingSteg.stories';

const { FlereForsørgereEttBarn } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useNavigateMock = vi.mocked(useNavigate);

describe('<FordelingSteg>', () => {
    it('skal velge å fordele 9 uker til mor og 7 uker til far', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        const gåTilNesteSide = vi.fn();

        const utils = render(<FlereForsørgereEttBarn gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Fordeling')).toHaveLength(2);

        await userEvent.click(screen.getByText('Neste'));

        expect(
            screen.getByText('Du må svare på hvordan dere vil fordele fellesperioden før dere går videre.'),
        ).toBeInTheDocument();

        await userEvent.selectOptions(
            utils.getByLabelText('Hvordan vil dere fordele 16 uker med fellesperiode?'),
            '45',
        );

        expect(screen.getByText('Klara: 11. des. 2023 – 14. juni 2024')).toBeInTheDocument();
        expect(screen.getByText('Espen: 17. juni 2024 – 15. nov. 2024')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallDagerSøker1: '45',
            },
            key: ContextDataType.FORDELING,
            type: 'update',
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(PlanleggerRoutes.PLANEN_DERES));
    });

    it('Skal velge 16 uker til Mor, test av tekst i infoboks', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        const gåTilNesteSide = vi.fn();

        const utils = render(<FlereForsørgereEttBarn gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText('Fordeling')).toHaveLength(2);

        await userEvent.click(screen.getByText('Neste'));

        expect(
            screen.getByText('Du må svare på hvordan dere vil fordele fellesperioden før dere går videre.'),
        ).toBeInTheDocument();

        await userEvent.selectOptions(
            utils.getByLabelText('Hvordan vil dere fordele 16 uker med fellesperiode?'),
            '80',
        );
        expect(
            screen.getByText(
                'Dette er regnet ut fra at barnet blir født på termin og om dere tar sammenhengende permisjon fra tre uker før termin.',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('Permisjonen kan se sånn ut med fordelingen dere valgte:')).toBeInTheDocument();
        expect(screen.getByText('Klara: 11. des. 2023 – 2. aug. 2024')).toBeInTheDocument();
        expect(screen.getByText('Espen: 5. aug. 2024 – 15. nov. 2024')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                antallDagerSøker1: '80',
            },
            key: ContextDataType.FORDELING,
            type: 'update',
        });

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(PlanleggerRoutes.PLANEN_DERES));
    });
});
