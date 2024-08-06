import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';

import * as stories from './HvorMyeForside.stories';

const { Default } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        // @ts-ignore
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useNavigateMock = vi.mocked(useNavigate);

describe('<HvorMyeForside>', () => {
    it('skal vise forside ', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<Default />);

        expect(await screen.findAllByText('Hvor mye kan jeg få i foreldrepenger?')).toHaveLength(2);

        expect(
            screen.getByText(
                'Denne veiviseren er for deg som ønsker å vite omtrent hvor mye foreldrepenger du kan få fra NAV.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start'));

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(ContextRoutes.HVOR_MYE + HvorMyeRoutes.ARBEIDSSITUASJON);
    });
});
