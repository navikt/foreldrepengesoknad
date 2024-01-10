import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './AppContainer.stories';

const { VisAppKvinneMedArbeid } = composeStories(stories);

describe('<AppContainer>', () => {
    it('skal returnere spinner når data blir hentet', () => {
        render(
            <div id="app">
                <VisAppKvinneMedArbeid doLogging={false} />
            </div>,
        );

        expect(screen.getByText('venter...')).toBeInTheDocument();
    });
});
