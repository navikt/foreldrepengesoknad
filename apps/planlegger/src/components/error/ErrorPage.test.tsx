import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './ErrorPage.stories';

const { Default } = composeStories(stories);

describe('<ErrorPage>', () => {
    it('skal vise feilside', async () => {
        render(<Default />);
        expect(
            await screen.getByText('Beklager, det ser ut som at noe har gått galt grunn av en teknisk feil hos NAV'),
        ).toBeInTheDocument();
    });
});
