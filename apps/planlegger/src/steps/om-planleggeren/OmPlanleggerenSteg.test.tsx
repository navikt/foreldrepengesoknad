import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './OmPlanleggerenSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<OmPlanleggerenSteg>', () => {
    it('skal vise info om planleggeren', async () => {
        render(<Default />);
        expect(await screen.findAllByText(messages['PlanleggerForside.Tittel'])).toHaveLength(2);
    });
});
