import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './SimpleErrorPage.stories';

const { Default } = composeStories(stories);

describe('<SimpleErrorPage>', () => {
    it('skal vise feilside', async () => {
        render(<Default />);
        expect(
            await screen.getByText('Beklager, det ser ut som at noe har gått galt på grunn av en teknisk feil hos NAV'),
        ).toBeInTheDocument();
    });
});
