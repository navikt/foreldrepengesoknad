import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/InfoOmSøknaden.stories';

const { Default } = composeStories(stories);

describe('<InfoOmSøknaden>', () => {
    it('skal innhold uten infoboks og illustrasjoner', () => {
        render(<Default />);
        console.log(screen.debug());
    });
});
