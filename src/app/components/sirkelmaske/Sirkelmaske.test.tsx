import React from 'react';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/Sirkelmaske.stories';

const { InaktivSirkelmaske, AktivSirkelmaske } = composeStories(stories);

describe('<Sirkelmaske>', () => {
    it('skal vise inaktiv sirkelmaske', () => {
        const { container } = render(<InaktivSirkelmaske />);
        expect(container.getElementsByClassName('sirkelmaske sirkelmaske--inaktiv').length).toBe(1);
    });

    it('skal vise aktiv sirkelmaske', () => {
        const { container } = render(<AktivSirkelmaske />);
        expect(container.getElementsByClassName('sirkelmaske sirkelmaske--inaktiv').length).toBe(0);
    });
});
