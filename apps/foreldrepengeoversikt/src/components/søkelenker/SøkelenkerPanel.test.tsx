import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './SøkelenkerPanel.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<SøkelenkerPanel>', () => {
    it('skal vise lenker', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['SøkelenkerPanel.HarRett'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokFp'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokSvp'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokEs'])).toBeInTheDocument();
    });
});
