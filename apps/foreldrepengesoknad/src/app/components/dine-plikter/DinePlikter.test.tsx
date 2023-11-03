import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './DinePlikter.stories';

const { Default } = composeStories(stories);

describe('<DinePlikter>', () => {
    it('skal returnere spinner når data blir hentet', () => {
        render(<Default />);

        expect(
            screen.queryByText(
                'Jeg forstår at hvis jeg gir uriktige eller holder tilbake opplysninger kan det få konsekvenser for retten min til foreldrepenger.',
            ),
        ).toBeInTheDocument();
    });
});
