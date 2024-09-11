import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';

import * as stories from './FpEllerEsForside.stories';

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

describe('<FpEllerEsForside>', () => {
    it('skal vise forside', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<Default />);

        expect(await screen.findAllByText('Foreldrepenger eller engangsstønad?')).toHaveLength(2);

        expect(
            screen.getByText(
                'Denne veiviseren er for deg som ønsker å vite om du har rett til foreldrepenger og/eller engangsstønad.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start'));

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(ContextRoutes.FP_ELLER_ES + FpEllerEsRoutes.SITUASJON);
    });
});
