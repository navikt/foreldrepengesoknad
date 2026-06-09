import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './HøyInntektInfobox.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<HøyInntektInfobox>', () => {
    it('skal vise infoboks', async () => {
        render(<Default />);

        expect(await screen.findByText('Du får dekket opptil 700 000 kr av din inntekt')).toBeInTheDocument();
        expect(
            screen.getByText(messages['HøyInntektInfobox.OppgittHøyereInntekt']),
        ).toBeInTheDocument();
    });
});
