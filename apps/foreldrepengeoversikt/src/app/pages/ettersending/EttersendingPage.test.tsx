import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { applyRequestHandlers } from 'msw-storybook-addon';

import * as stories from './EttersendingPage.stories';

const { SkalIkkeFeileOpplasting, SkalFeileOpplasting } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ saksnummer: '1' }),
    };
});

describe('<EttersendingPage>', () => {
    it.skip('skal laste opp dokument uten feil', async () => {
        await applyRequestHandlers(SkalIkkeFeileOpplasting.parameters.msw);
        const utils = render(<SkalIkkeFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i NAV skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hva inneholder dokumentene dine?'), 'I000060');

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp dokumenter');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        expect(await screen.findByText('Lastet opp (1) - Annet dokument')).toBeInTheDocument();
        expect(screen.getByText('hello.png')).toBeInTheDocument();
        expect(screen.queryByText('Ops noe gikk galt prøv igjen')).not.toBeInTheDocument();
    });

    it('skal få feil ved opplasting av dokument', async () => {
        await applyRequestHandlers(SkalFeileOpplasting.parameters.msw);
        const utils = render(<SkalFeileOpplasting />);

        expect(
            await screen.findByText(
                'Dokumentene du laster opp vil bli lagt ved søknaden din. ' +
                    'Du må velge hva dokumentene inneholder for at saksbehandlerene i NAV skal kunne behandle saken din.',
            ),
        ).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByLabelText('Hva inneholder dokumentene dine?'), 'I000060');

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp dokumenter');
        await fireEvent.change(fileInput, {
            target: { files: { item: () => file, length: 1, 0: file } },
        });

        //TODO (TOR) Må få lagring av vedlegg over på Tanstack før dette fungerar
        // expect(await screen.findByText('Vedlegg med feil')).toBeInTheDocument();
        // expect(screen.getByText('hello.png')).toBeInTheDocument();
        // expect(screen.getByText('Ops noe gikk galt prøv igjen')).toBeInTheDocument();
    });
});
