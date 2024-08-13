import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './HarIkkeRettTilFpInfobox.stories';

const { Default } = composeStories(stories);

describe('<HarIkkeRettTilFpInfobox>', () => {
    it('skal vise infoboks', async () => {
        render(<Default />);

        expect(
            await screen.findByText('Med årslønn under 100 000 kr har du ikke rett til foreldrepenger'),
        ).toBeInTheDocument();
        expect(screen.getByText(/årslønn på 500 000 kr i året/)).toBeInTheDocument();
        expect(screen.getByText(/100 000 kr i året/)).toBeInTheDocument();
    });
});
