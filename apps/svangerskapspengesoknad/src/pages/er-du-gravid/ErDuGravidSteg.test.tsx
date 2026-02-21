import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './ErDuGravidSteg.stories';

const { Default } = composeStories(stories);

describe('<ErDuGravidSteg>', () => {
    it('skal vise spørsmålet om graviditet eller nylig fødsel', async () => {
        const onBekreft = vi.fn();

        render(<Default onBekreft={onBekreft} />);

        expect(await screen.findByText('Er du gravid eller har du nylig vært gravid?')).toBeInTheDocument();
        expect(screen.getByText('For å søke om svangerskapspenger må du være gravid eller ha nylig vært gravid.')).toBeInTheDocument();
        expect(screen.getByText('Ja')).toBeInTheDocument();
        expect(screen.getByText('Nei')).toBeInTheDocument();
        expect(screen.getByText('Fortsett')).toBeInTheDocument();
    });

    it('skal ikke kunne gå videre uten å ha valgt svar', async () => {
        const onBekreft = vi.fn();

        render(<Default onBekreft={onBekreft} />);

        expect(await screen.findByText('Er du gravid eller har du nylig vært gravid?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Fortsett'));

        expect(screen.getByText('Du må svare på om du er gravid eller har nylig vært gravid')).toBeInTheDocument();
        expect(onBekreft).not.toHaveBeenCalled();
    });

    it('skal kalle onBekreft med true når bruker velger Ja', async () => {
        const onBekreft = vi.fn();

        render(<Default onBekreft={onBekreft} />);

        expect(await screen.findByText('Er du gravid eller har du nylig vært gravid?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Fortsett'));

        expect(onBekreft).toHaveBeenCalledWith(true);
        expect(screen.queryByText('Du må svare på om du er gravid eller har nylig vært gravid')).not.toBeInTheDocument();
    });

    it('skal kalle onBekreft med false når bruker velger Nei', async () => {
        const onBekreft = vi.fn();

        render(<Default onBekreft={onBekreft} />);

        expect(await screen.findByText('Er du gravid eller har du nylig vært gravid?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));
        await userEvent.click(screen.getByText('Fortsett'));

        expect(onBekreft).toHaveBeenCalledWith(false);
        expect(screen.queryByText('Du må svare på om du er gravid eller har nylig vært gravid')).not.toBeInTheDocument();
    });
});

