import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './OmPlanleggerenSteg.stories';

const { Default } = composeStories(stories);

describe('<OmPlanleggerenSteg>', () => {
    it('skal vise info om planleggeren', async () => {
        render(<Default />);
        expect(await screen.findAllByText('Planlegg foreldrepenger')).toHaveLength(2);
    });

    it('skal vise infotekst om at opplysninger ikke lagres', async () => {
        render(<Default />);
        expect(
            await screen.findByText(/Vi lagrer ikke opplysningene dine hos oss/),
        ).toBeInTheDocument();
    });
});
