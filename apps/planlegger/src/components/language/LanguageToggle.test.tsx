import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './LanguageToggle.stories';

const { Default } = composeStories(stories);

describe('<LanguageToggle>', () => {
    it('skal endre språk', async () => {
        const changeLocale = vi.fn();
        const utils = render(<Default changeLocale={changeLocale} />);

        expect(await screen.findByText('Norwegian')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByRole('combobox'), 'en');

        expect(changeLocale).toHaveBeenCalledOnce();
        expect(changeLocale).toHaveBeenNthCalledWith(1, 'en');
    });
});
