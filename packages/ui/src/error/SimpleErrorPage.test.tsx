import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './SimpleErrorPage.stories';

import messages from '../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<SimpleErrorPage>', () => {
    it('skal vise feilside', () => {
        render(<Default />);
        expect(
            screen.getByText(messages['SimpleErrorPage.ErrorHeader']),
        ).toBeInTheDocument();
    });
});
