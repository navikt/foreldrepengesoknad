import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import * as stories from './KvoteOppsummering.stories';

const { BeggeRettMorIngenDagerBrukt } = composeStories(stories);

describe('<KvoteOppsummering >', () => {
    it('skal funke', async () => {
        render(<BeggeRettMorIngenDagerBrukt />);

        expect(screen.getByText('Det er 49 uker igjen som kan legges til i planen')).toBeInTheDocument();
    });
});
