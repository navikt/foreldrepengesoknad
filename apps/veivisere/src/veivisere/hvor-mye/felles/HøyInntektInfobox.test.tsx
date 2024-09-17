import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './HøyInntektInfobox.stories';

const { Default } = composeStories(stories);

describe('<HøyInntektInfobox>', () => {
    it('skal vise infoboks', async () => {
        render(<Default />);

        expect(await screen.findByText('Du får dekket opptil 700 000 kr av din inntekt')).toBeInTheDocument();
        expect(
            screen.getByText('Du har oppgitt en inntekt høyere enn dette, men dette dekkes ikke av NAV.'),
        ).toBeInTheDocument();
    });
});
