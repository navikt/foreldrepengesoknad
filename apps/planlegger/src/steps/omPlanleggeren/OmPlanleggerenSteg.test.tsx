import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OmPlanleggerenSteg.stories';

const { Default } = composeStories(stories);

describe('<OmPlanleggerenSteg>', () => {
    it('skal vise info om planleggeren', async () => {
        render(<Default />);
        expect(await screen.findAllByText('Planlegg foreldrepenger')).toHaveLength(2);
    });
});
