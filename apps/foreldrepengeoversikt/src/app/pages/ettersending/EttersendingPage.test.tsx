import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './EttersendingPage.stories';

const { SkalIkkeFeileOpplasting } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ saksnummer: '1' }),
    };
});

describe('<EttersendingPage>', () => {
    it('skal rendre side', async () => {
        const utils = render(<SkalIkkeFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i NAV skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hva inneholder dokumentene dine?'), 'I000060');

        expect(screen.getByText('Last opp fil')).toBeInTheDocument();
    });
});
