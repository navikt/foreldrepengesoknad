import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './HarIkkeSaker.stories';

import messages from '../../intl/messages/nb_NO.json';

const { HarOppdatertSak, Default } = composeStories(stories);

describe('<HarIkkeSaker>', () => {
    it('skal vise infotekst og lenker', async () => {
        render(<HarOppdatertSak />);

        expect(
            await screen.findByText(messages['HarIkkeSaker.IngenSoknader']),
        ).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.HarRett'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokFp'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokSvp'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokEs'])).toBeInTheDocument();
    });

    it('skal kun vise lenker', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['SøkelenkerPanel.HarRett'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokFp'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokSvp'])).toBeInTheDocument();
        expect(screen.getByText(messages['SøkelenkerPanel.SokEs'])).toBeInTheDocument();
        expect(
            screen.queryByText(messages['HarIkkeSaker.IngenSoknader']),
        ).not.toBeInTheDocument();
    });
});
