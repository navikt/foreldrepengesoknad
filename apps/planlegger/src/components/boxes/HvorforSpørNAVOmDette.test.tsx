import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './HvorforSpørNAVOmDette.stories';

const { Default } = composeStories(stories);

describe('<HvorforSpørNAVOmDette>', () => {
    it('skal vise panel: Hvorfor spør nav om dette', async () => {
        render(<Default />);

        expect(await screen.findByText('Dette er en tekst')).toBeInTheDocument();
    });
});
