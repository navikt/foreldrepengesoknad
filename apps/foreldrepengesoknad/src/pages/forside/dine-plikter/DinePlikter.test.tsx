import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './DinePlikter.stories';

import messages from '../../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<DinePlikter>', () => {
    it('skal returnere spinner når data blir hentet', () => {
        render(<Default />);

        expect(
            screen.queryByText(messages['velkommen.dinePlikter.listeElement.2'],
            ),
        ).toBeInTheDocument();
    });
});
