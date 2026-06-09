import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FpEllerEsRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';

import * as stories from './FpEllerEsForside.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useNavigateMock = vi.mocked(useNavigate);

describe('<FpEllerEsForside>', () => {
    it('skal vise forside', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<Default />);

        expect(await screen.findAllByText(messages['FpEllerEsForside.Title'])).toHaveLength(2);

        expect(
            screen.getByText(messages['FpEllerEsForside.Innhold'],
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start'));

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(FpEllerEsRoutes.SITUASJON);
    });
});
