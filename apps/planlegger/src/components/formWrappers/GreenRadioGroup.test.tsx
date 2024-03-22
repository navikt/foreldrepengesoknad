import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './GreenRadioGroup.stories';

const { Default } = composeStories(stories);

describe('<GreenRadioGroup>', () => {
    it('skal vise grøn radioknapp', async () => {
        render(<Default />);

        expect(
            await screen.findByText('Dette er en radioknapp som blir lysere når du trykker på den'),
        ).toBeInTheDocument();
    });
});
