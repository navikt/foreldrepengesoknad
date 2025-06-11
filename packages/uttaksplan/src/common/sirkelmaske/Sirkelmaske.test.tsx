import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';

import * as stories from './Sirkelmaske.stories';

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
