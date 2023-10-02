import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './FeilsideInfo.stories';

const { Default } = composeStories(stories);

describe('<FeilsideInfo>', () => {
    it('skal vise feilside', async () => {
        await render(<Default />);
        expect(
            await screen.findByText(
                'Noe gikk dessverre galt. Vennligst prøv igjen senere. Dersom det fremdeles oppstår feil kontakt brukerstøtte.',
            ),
        ).toBeInTheDocument();
    });
});
